import React, {Component} from 'react';

class Post extends Component{

	test(e){
		e.target.style.display = "none";
	}

	render(){
		return(
			<img src={this.props.post.data.thumbnail} onError={this.test} alt={this.props.post.data.name} width="512" height="512"/>
		)
	}
}

export default Post;