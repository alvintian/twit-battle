import React, { Component } from 'react';
import './App.css';

// import Message from "./Message.jsx";
class AllCharacters extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: this.props.ListMessage,
			active: false,
			//			id: this.props.key,
			counter: 0,
		};
	}

	// onItemClick = (event) => {
	// 	event.preventDefault();
	// 	console.log('clicked');
	// 	//  event.stopPropagation();
	// 	this.setState((prevState,props) => {
	// 		return {counter: prevState.counter + 1}
	// 	})
	// }
	onItemClick = event => {
		// if(event.currentTarget.style.backgroundColor === '#ccc'){
		//     event.currentTarget.style.backgroundColor = 'coral';
		//  }else{
		//  	event.currentTarget.style.backgroundColor = '#ccc';
		//  }
	};

	render() {
		const { message } = this.props;
		const style = this.state.active
			? {
					backgroundColor: '#1D43E1',
			  }
			: {
					backgroundColor: '#57609E',
			  };
		let profile = (
			<div
				className="border"
				onClick={() => {
					this.props.onClick(message);
					this.setState(prevState => {
						return { active: !prevState.active };
					});
				}}
				style={style}>
				<h1 style={{ color: 'white' }}>{message.name}</h1>
				<h2>HP: {message.hp}</h2>
				<h2>ATT: {message.attack}</h2>
			</div>
		);
		// let profileAttr=document.getElementsByClassName("border");
		// profileAttr.style.height = "250px";
		// nodes[i].style.height = "250px";
		return profile;
	}
}

export default AllCharacters;
