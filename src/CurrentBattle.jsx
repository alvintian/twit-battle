import React, { Component } from 'react';
import $ from 'jquery';
// import Message from "./Message.jsx";

class CurrentBattle extends Component {
	constructor(props) {
		super(props);
		this.state = {
		redSide: {},
		blueSide: {}
		};
	}

		getData = () => {
		$.get('/api/CurBattle', data => {
			this.setState({
				redSide: data[0],
				blueSide: data[1]
			});
		});
	};

	componentDidMount() {
		// fetch('/api/message')
		//   .then(response => response.json())
		//   .then(json => this.setState({ message: json[0].name }));
		this.getData();
	}
	render() {
		console.log(this.state.blueSide);
		return (
	<div>
		<h3>CurrentBattle are displayed here</h3>
		{this.state.redSide.name} VS {this.state.blueSide.name}
		<button type="button" onClick={this.handleBattleStart}>Battle End</button>
	</div>);
	}
}
export default CurrentBattle;