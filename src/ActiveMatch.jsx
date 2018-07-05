import React, { Component } from 'react';
import './App.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import BattleScreen from './BattleScreen.jsx'

// import Message from "./Message.jsx";
class ActiveMatch extends Component {
		constructor(props) {
		super(props);
		this.state = {
			active: false
		};
	}
		onItemClick = (event) => {
	}

	render() {
		const { match } = this.props;
		const style = this.state.active ? {
			backgroundColor: 'purple'
		} : {
			backgroundColor: 'red'
		}
		let profile = ( 
			<div>
			<Link 	to="/BattleScreen" 
					className="matchBorder"
					onClick={() => {
						this.props.onClick(match);
						this.setState(prevState => {
						return {active: !prevState.active}
					})
				}}
				style={style}>
			<h4 className="matchRedSide">RED SIDE:{match.red_name}</h4>
			<h3 className="matchId">Match #{match.BATTLEID}</h3>
			<h4 className="matchBlueSide">BLUE SIDE:{match.blue_name}</h4>
			</Link>
					<Route	exact path="/BattleScreen"
							render={() => (
					<BattleScreen content={this.state.match}/>
					)}
						/></div>
		);
		// let profileAttr=document.getElementsByClassName("border");
		// profileAttr.style.height = "250px";
		// nodes[i].style.height = "250px";
		return profile;
	}
}

export default ActiveMatch;
