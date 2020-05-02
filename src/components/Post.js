import React, {Component} from 'react';

class Post extends Component{

	imageMissing(e){
		e.target.style.display = "none";
	}

	render(){
		return(
			<img 
				src={this.props.post.data.url}
				style={{marginLeft: "auto", marginRight: "auto", display:"block", paddingBottom:"10px"}}
				onError={this.imageMissing} 
				alt={this.props.post.data.name} 
				width="60%" 
				height="auto"
			/>
		)
	}
}

export default Post;