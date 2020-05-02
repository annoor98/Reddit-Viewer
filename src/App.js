import React, {Component} from 'react';
import Viewer from './components/Viewer';
import axios from 'axios';

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
  }

  //Initial Loading of the subreddit content
  loadSubs(){
    axios.get('https://www.reddit.com/r/' + this.state.subreddit + '/.json')
      .then(response => this.setState({imageList: response.data.data.children, after: response.data.data.after}));
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
    When roughly 75% of the screen height is reached, mroe content will get loaded.
  */
  didScroll = (e) =>{

    console.log(document.getElementById("View").offsetHeight * 0.75 + "      " + document.documentElement.scrollTop);

    if(document.getElementById("View").offsetHeight * 0.75 <= document.documentElement.scrollTop && this.state.isAtBottom === false){

      console.log("BOTROGTAG");
      this.setState({isAtBottom: true});

      axios.get('https://www.reddit.com/r/' + this.state.subreddit + '/.json?after=' + this.state.after)
      .then(response => this.setState({
            imageList: this.state.imageList.concat(response.data.data.children),
            after: response.data.data.after
          }));
    }

    if(document.getElementById("View").offsetHeight * 0.75 > document.documentElement.scrollTop && this.state.isAtBottom === true){
      this.setState({isAtBottom: false});
    }
  };

  render(){
    return(
      <div className="App" id="View">
        <div id="search">
          <label>Subreddit: </label>
          <input type="text" id="subName" defaultValue="cute"/>
          <button onClick={this.changeSub}>View Images</button>
        </div>
        <Viewer posts={this.state.imageList}/>
      </div>
    )
  }
}

export default App;
