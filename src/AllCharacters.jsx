import React, { Component } from 'react';
import './App.css';

// import Message from "./Message.jsx";
class AllCharacters extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: this.props.ListMessage,
			i:0
		};
//    this.handleClick = this.handleClick.bind(this);
	}
onItemClick= function (event) {
	  event.preventDefault();
	//  event.stopPropagation();
//this.setState({ i: 2 });
if(event.currentTarget.style.backgroundColor === '#ccc'){
    event.currentTarget.style.backgroundColor = 'coral';
 }else{
 	event.currentTarget.style.backgroundColor = '#ccc';
 }
        console.log(event.target);
}
	componentDidMount() {}
	render() {
		let message = this.props.ListMessage;
		let profile = (
			<div className="border" title="profile" onClick={this.onItemClick}>
				<h4>{message.name}</h4>
				<li>HP: {message.hp}</li>
				<li>ATT: {message.attack}</li>
			</div>
		);
		// let profileAttr=document.getElementsByClassName("border");
		// profileAttr.style.height = "250px";
		// nodes[i].style.height = "250px";
		return profile;
	}
}

export default AllCharacters;
