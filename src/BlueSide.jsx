import React, { Component } from 'react';
import './battle.css';

class BlueSide extends Component {
	render() {
		// console.log(this.state.blueplayer,"who is blue??")
		// return (<div className="bluePlayer">BLUE:{this.props.blueP.blue_name}</div>)

		return (
			<div
				className="border"
				style={{ backgroundColor: '#0074D9', padding: '1em', height: '400px' }}>
				<h1 style={{ color: 'white' }}>{this.props.blueP.blue_name}</h1>
				<h2>HP: {this.props.blueP.hp}</h2>
				<h2>ATT: {this.props.blueP.attack}</h2>

				<img
					src={this.props.blueP.picture}
					alt=""
					width={'200px'}
					height={'200px'}
				/>
			</div>
		);
	}
}

export default BlueSide;
