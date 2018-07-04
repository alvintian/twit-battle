import React, { Component } from 'react';
import $ from 'jquery';
// import Message from "./Message.jsx";

class CurrentBattle extends Component {
	constructor(props) {
		super(props);
		this.state = {
		teamNames: []
		};
	}

		getData = () => {
		$.get('/api/CurBattle', data => {
			this.setState({
				teamNames: data,
			});
		});
	};

	componentDidMount() {}
	render() {
		console.log(this.state);
		return (
	<div>
		<h3>CurrentBattle are displayed here</h3>
	</div>);
	}
}
export default CurrentBattle;