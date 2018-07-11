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
	parseBattle = x => {
		//zach's code great help!
		let battleObj = {};
		x.forEach(battle => {
			// if battle doesn't already exist
			if (!battleObj[battle.BATTLEID]) {
				// add to battle object
				battleObj[battle.BATTLEID] = {
					BATTLEID: battle.BATTLEID,
				};
			}
			if (battle.id === battle.red_side_id_fk) {
				battleObj[battle.BATTLEID].red_name = battle.name;
				battleObj[battle.BATTLEID].red_hp = battle.hp;
				battleObj[battle.BATTLEID].red_attack = battle.attack;
			} else if (battle.id === battle.blue_side_id_fk) {
				battleObj[battle.BATTLEID].blue_name = battle.name;
				battleObj[battle.BATTLEID].blue_hp = battle.hp;
				battleObj[battle.BATTLEID].blue_attack = battle.attack;
			}
		});
		this.setState({
			data: Object.values(battleObj),
		});
	};

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
					//backgroundColor: '#99aab5',
					backgroundColor: '#D5D5D5',
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
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							flexDirection: 'row',
							marginTop: '10px',
							marginBottom: '10px',
						}}>
						<div className="redSide">
							<h2>RED SIDE</h2>
							<h4>{match.red_name}</h4>
						</div>
						<div style={{ marginLeft: '40px' }}>
							<h1 style={{ color: '#303030', opacity: '0.7' }}>VS</h1>
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
