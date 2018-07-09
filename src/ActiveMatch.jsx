import React, { Component } from 'react';
import './App.css';
import { Redirect } from 'react-router-dom';

// import Message from "./Message.jsx";
class ActiveMatch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
		};
	}
	handleBattleStart = () => {};
	// fetch('/api/message')
	//   .then(response => response.json())
	//   .then(json => this.setState({ message: json[0].name }));

	// 	onClick={() => {
	// 		this.props.onClick(match);
	// 		this.setState(prevState => {
	// 		return {active: !prevState.active}
	// 	})
	// }}

	render() {
		const { match } = this.props;
		if (this.state.active === true) {
			return <Redirect to={'/CurBattle/' + match.BATTLEID} />;
		}

		const style = this.state.active
			? {
					backgroundColor: 'purple',
			  }
			: {
					backgroundColor: '#99aab5',
					color: '#111111',
					overflow: 'auto',
			  };
		let profile = (
			<div>
				<div className="matchID">
					<h3>Match #{match.BATTLEID}</h3>
				</div>
				<div
					onClick={() => {
						this.props.matchInfo(match);

						this.setState(prevState => {
							return { active: !prevState.active };
						});
					}}
					className="matchBorder"
					style={style}>
					<div className="matchID">
						<h3>Match #{match.BATTLEID}</h3>
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							flexDirection: 'row',
						}}>
						<div className="redSide">
							<h2>RED SIDE</h2>
							<h4>{match.red_name}</h4>
						</div>
						<div className="blueSide">
							<h2>BLUE SIDE</h2>
							<h4>{match.blue_name}</h4>
						</div>
					</div>
				</div>
			</div>
		);
		return profile;
	}
}

export default ActiveMatch;
