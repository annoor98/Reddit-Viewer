import React, {Component} from 'react';
import Viewer from './components/Viewer';
import axios from 'axios';

class App extends Component{

  state = {
    imageList: [

    ],

    after: "id",
    isAtBottom: false
  }

  constructor(props){
    super(props);
    this.didScroll = this.didScroll.bind(this);
  }

  componentDidMount(){
    axios.get('https://www.reddit.com/r/cute/.json')
      .then(response => this.setState({imageList: response.data.data.children, after: response.data.data.after}));

    window.addEventListener('scroll', this.didScroll);
  };

  componentWillUnmount(){
    window.removeEventListener('scroll', this.didScroll);
  };

  didScroll = (e) =>{

    console.log(this.state.isAtBottom);
    console.log(document.getElementById("View").offsetHeight /2 + "      " + document.documentElement.scrollTop);

    if(document.getElementById("View").offsetHeight /2 <= document.documentElement.scrollTop && this.state.isAtBottom === false){
      console.log("BOT");

      this.setState({isAtBottom: true});

      axios.get('https://www.reddit.com/r/cute/.json?after=' + this.state.after)
      .then(response => this.setState({
            imageList: this.state.imageList.concat(response.data.data.children),
            after: response.data.data.after
          }));
    }

    if(document.getElementById("View").offsetHeight/2 > document.documentElement.scrollTop && this.state.isAtBottom === true){
      this.setState({isAtBottom: false});
    }
  };

  render(){
    return(
      <div className="App" id="View">
        <Viewer posts={this.state.imageList}/>
      </div>
    )
  }
}

export default App;
