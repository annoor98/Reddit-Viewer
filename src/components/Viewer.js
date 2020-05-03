import React, {Component} from 'react';
import Post from './Post';

class Viewer extends Component{

	render(){
		return(
			this.props.posts.map((item) =>(
				<Post key={item.data.name} post={item}/>
				))
		)
	}
}

export default Viewer;