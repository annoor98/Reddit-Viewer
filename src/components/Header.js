import React, {Component} from 'react';

class Header extends Component{

	render(){
		return(
			<div style={{
				textAlign: "center", 
				backgroundColor: "white",
				border: "1px white solid",
				borderTopLeftRadius: "30px",
				borderTopRightRadius: "30px"
			}}>
				<h1>Reddit Viewer</h1>
			</div>
		)
	}
}

export default Header;