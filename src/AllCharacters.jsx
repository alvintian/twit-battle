import React, { Component } from 'react';
import './App.css';

// import Message from "./Message.jsx";
class AllCharacters extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: this.props.ListMessage,
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
	// 	onItemClick = (event) => {
	// if(event.currentTarget.style.backgroundColor === '#ccc'){
	//     event.currentTarget.style.backgroundColor = 'coral';
	//  }else{
	//  	event.currentTarget.style.backgroundColor = '#ccc';
	//  }
	//         console.log(event.target);
	// }

	render() {
		let message = this.props.ListMessage;
		let profile = (
			<div
				className="border"
				title="profile"
				onClick={() => {
					this.props.onClick(message);
				}}>
				<h4>{message.name}</h4>
				<li>HP: {message.hp}</li>
				<li>ATT: {message.attack}</li>
				<li>id: {this.state.counter}</li>
			</div>
		);
		// let profileAttr=document.getElementsByClassName("border");
		// profileAttr.style.height = "250px";
		// nodes[i].style.height = "250px";
		return profile;
	}
}

export default AllCharacters;
