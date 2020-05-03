import React, {Component} from 'react';

class Post extends Component{

	imageMissing(e){
		e.target.style.display = "none";
	}

	render(){
		return(
			<div>
				<img 
					src={this.props.post.data.url}
					style={{marginLeft: "auto",
						marginRight: "auto", 
						display:"block",
						border:"20px solid white",
						borderRadius:"20px"
						}}

					onError={this.imageMissing} 
					alt={this.props.post.data.name} 
					width="60%" 
					height="auto"
				/>
				<br/>
			</div>
		)
	}
}

export default Post;