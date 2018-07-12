import React, { Component } from 'react';
import './battle.css';

class RedSide extends Component {
	// constructor(props) {
	//   super(props);

	//   // console.log(this.props,"who is red prop in States?")
	// }
	componentWillMount() {
		// console.log(this.props,"who is red prop in component will mount?")
	}
	componentDidMount() {
		// this.setState({
		// redplayer: {red_name: this.props.redP.red_name,
		//    			hp: this.props.redP.hp,
		//    		attack: this.props.redP.attack}
		//  })
		// 	console.log(this.props,"who is red prop in componentDidMount???")
	}
	render() {
		// console.log(this.props,"who is red prop inside render??")
		// let redplayer=this.state.redplayer;
//		console.log(this.props.redP.red_name, 'who is red??');
		// return (<div className="redPlayer">RED:{this.props.redP.red_name}</div>)
		return (
			<div className="border" style={{ backgroundColor: '#FF4136' }}>
				<h1 style={{ color: 'white' }}>{this.props.redP.red_name}</h1>
				<h2>HP: {this.props.redP.hp}</h2>
				<h2>ATT: {this.props.redP.attack}</h2>
				<img src={this.props.redP.picture} alt="" />
			</div>
		);
	}
}
export default RedSide;

//do not delete any of the comment in this page!
