import React, { Component } from 'react';
import './App.css';
import {
	withRouter,
	Route,
	Link,
	Redirect,
	BrowserRouter as Router,
} from 'react-router-dom';
import BattleScreen from './BattleScreen.jsx';

// import Message from "./Message.jsx";
class ActiveMatch extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			active: false,
		};
	}
		onItemClick = (event) => {
	}
				// 	onClick={() => {
				// 		this.props.onClick(match);
				// 		this.setState(prevState => {
				// 		return {active: !prevState.active}
				// 	})
				// }}
	render() {
		const { match } = this.props;
		const style = this.state.active
			? {
					backgroundColor: 'purple',
			  }
			: {
					backgroundColor: 'red',
			  };
		let profile = (
			// <Router>
			<div
				className="matchBorder"
				onClick={() => {
					return this.props.history.push('/battleScreen');
				}}>
				<h4 className="matchRedSide">RED SIDE:{match.red_name}</h4>
				<h3 className="matchId">Match #{match.BATTLEID}</h3>
				<h4 className="matchBlueSide">BLUE SIDE:{match.blue_name}</h4>
				{/* <Route
						exact
						path="/battleScreen"
						component={BattleScreen}
						//render={() => <BattleScreen content={this.state.match} />}
					/>
				
			{/* </Router> */}
			</div>
		);
		// let profileAttr=document.getElementsByClassName("border");
		// profileAttr.style.height = "250px";
		// nodes[i].style.height = "250px";
		return profile;
	}
}

export default withRouter(ActiveMatch);
