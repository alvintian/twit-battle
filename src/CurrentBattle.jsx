import React, { Component } from 'react';
import $ from 'jquery';
// import Message from "./Message.jsx";
import './App.css';
import ActiveMatch from './ActiveMatch.jsx';

class CurrentBattle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
		};
	}
	getData = () => {
		$.get('/api/CurBattle', data => {
			this.parseBattle(data);
		});
	};
	componentDidMount() {
		// fetch('/api/message')
		//   .then(response => response.json())
		//   .then(json => this.setState({ message: json[0].name }));
		this.getData();
	}

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
				battleObj[battle.BATTLEID].active = battle.active;
				battleObj[battle.BATTLEID].timer = battle.timer;
			if (battle.id === battle.red_side_id_fk) {
				battleObj[battle.BATTLEID].red_name = battle.name;
				battleObj[battle.BATTLEID].red_hp = battle.hp;
				battleObj[battle.BATTLEID].red_attack = battle.attack;
				battleObj[battle.BATTLEID].red_picture = battle.picture;
				battleObj[battle.BATTLEID].red_side_hp = battle.red_side_hp;
			} else if (battle.id === battle.blue_side_id_fk) {
				battleObj[battle.BATTLEID].blue_name = battle.name;
				battleObj[battle.BATTLEID].blue_hp = battle.hp;
				battleObj[battle.BATTLEID].blue_attack = battle.attack;
				battleObj[battle.BATTLEID].blue_picture = battle.picture;
				battleObj[battle.BATTLEID].blue_side_hp = battle.blue_side_hp;
			}
		});
		this.setState({
			data: Object.values(battleObj),
		});
	};

	render() {
		let activematch = this.state.data;
		console.log(activematch,"activematch made sense????")
		return (
			<div
				style={{
					height: '100vh',
					minHeight: '100vh',
				}}>
				<h1 style={{ color: '#F5F5F5' }}>CurrentBattles are displayed here</h1>
				{activematch.map(x => (
					<ActiveMatch
						match={x}
						key={x.BATTLEID}
						matchInfo={this.props.matchInfo}
					/>
				))}
			</div>
		);
	}
}
export default CurrentBattle;
