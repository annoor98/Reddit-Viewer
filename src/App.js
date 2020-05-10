import React, {Component} from 'react';
import Viewer from './components/Viewer';
import Header from './components/Header';
import axios from 'axios';
import arrow from './assets/arrow.png';

class App extends Component{

  /*Right now r/cute is the default subreddit
    The after variable holds the id for the next set of content to load
  */
  state = {
    subreddit: "cute",
    imageList: [

    ],

    after: "id",
    isAtBottom: false
  }

  constructor(props){
    super(props);
    this.didScroll = this.didScroll.bind(this);
    this.changeSub = this.changeSub.bind(this);
    this.loadSubs = this.loadSubs.bind(this);
    this.filterList = this.filterList.bind(this);
    this.toTheTop = this.toTheTop.bind(this);

    this.listLength = 0;
  }

  //Initial Loading of the subreddit content
  loadSubs(){
    axios.get('https://www.reddit.com/r/' + this.state.subreddit + '/.json')
      .then(response => {
                          this.setState({
                            imageList: response.data.data.children, 
                            after: response.data.data.after
                          });
                          this.listLength = response.data.data.children.length;
                         document.getElementById("errorMessage").innerHTML = "";
                          this.filterList();})
      .catch((error) => {document.getElementById("errorMessage").innerHTML = "Error retrieving data!"});
  }

  filterList(){

    this.setState({
      imageList: this.state.imageList.filter(function (e){
        const regex = RegExp('([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))$', 'i');
        return regex.test(e.data.url);
      })
    });

    if(this.state.imageList.length === 0){
      document.getElementById("errorMessage").innerHTML = "The specified subreddit does not contain valid images!"
    }

  }

  componentDidMount(){
    this.loadSubs();
    window.addEventListener('scroll', this.didScroll);
  };

  componentWillUnmount(){
    window.removeEventListener('scroll', this.didScroll);
  };

  changeSub(){
    var subName = document.getElementById("subName").value
    this.setState({
      subreddit: subName,
      imageList: []
    },
    this.loadSubs
    );
  }

  /*Event that checks how far the user scrolled through the page.
    When roughly 75% of the screen height is reached, more content will get loaded.
  */
  didScroll = (e) =>{

    if(document.getElementById("View").offsetHeight * 0.75 <= document.documentElement.scrollTop && this.state.isAtBottom === false){
      
      this.setState({isAtBottom: true});

      //A new list lenght of less than 24 implies that there are no more new posts after this
      if(this.listLength > 24){

        axios.get('https://www.reddit.com/r/' + this.state.subreddit + '/.json?after=' + this.state.after)
        .then(response => {this.setState({
              imageList: this.state.imageList.concat(response.data.data.children),
              after: response.data.data.after,
              listLength: this.state.imageList.length
              });
              this.listLength = response.data.data.children.length;
              this.filterList();
          });
      }
    }

    //sets the state to being at the bottom of the page when you have reached 75% of the content
    if(document.getElementById("View").offsetHeight * 0.75 > document.documentElement.scrollTop && this.state.isAtBottom === true){
      this.setState({isAtBottom: false});
    }
  };

  toTheTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  render(){
    return(
      <div className="App" id="View">
        <Header />
        <div id="search" style={{
        textAlign: "center", 
        backgroundColor: "white",
        borderBottomLeftRadius: "30px",
        borderBottomRightRadius: "30px",
        paddingBottom: "10px",
        marginBottom: "20px",
        fontSize: "30px"
        }}>
          <label>Subreddit: </label>
          <input type="text" id="subName" defaultValue="cute"/>
          <p id="errorMessage"></p>
          <button onClick={this.changeSub}>View Images</button>
        </div>
        <Viewer posts={this.state.imageList}/>
        <div id="toTop" style={{position: 'fixed', bottom: '5%', left: '5%'}}>
          <a href="#" onClick={this.toTheTop}>
            <img src={arrow} alt="top" width="64" height="64"/>
          </a>
        </div>
      </div>
    )
  }
}

export default App;