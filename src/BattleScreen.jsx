import React, { Component } from 'react';
import './App.css';
// import { BrowserRouter } from "react-router-dom";
import RedSide from './RedSide.jsx';
import BlueSide from './BlueSide.jsx';
import BattleTime from './BattleTime.jsx';
class BattleScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redStat: {},
			blueStat: {},
			displayWinner: false,
			// redStat: {red_name: this.props.content.red_name,
			// 			hp: this.props.content.red_hp,
			// 	    attack: this.props.content.red_attack},
			// blueStat:{blue_name: this.props.content.blue_name,
			// 			hp:this.props.content.blue_hp,
			// 		attack:this.props.content.blue_attack}
		};
		//    this.props.onMessageSubmit(this.state.content)

		fetch(`/api/CurBattle/${this.props.id}`)
			.then(response => response.json())
			.then(response => {
				this.parseBattle(response);
			});
		this.onNavigateHome = this.onNavigateHome.bind(this);
		//this.checkWinner = this.checkWinner.bind(this);
	}

	onNavigateHome() {
		//        BrowserRouter.push("/");
		fetch(`/api/CurBattle/${this.props.id}`, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			//make sure to serialize your JSON body
			body: JSON.stringify({
				id: this.props.id,
			}),
		}).then(console.log('function success'));
	}
	parseBattle = x => {
		//zach's code great help!
		let battleObj = {};
		x.forEach(battle => {
			// if battle doesn't already exist
			if (!battleObj[battle.BATTLEID]) {
				// add to battle object
				battleObj = {
					BATTLEID: battle.BATTLEID,
				};
			}
			if (battle.id === battle.red_side_id_fk) {
				this.setState({
					redStat: {
						red_name: battle.name,
						hp: battle.hp,
						attack: battle.attack,
						picture: battle.picture,
					},
				});
			}
			if (battle.id === battle.blue_side_id_fk) {
				this.setState({
					blueStat: {
						blue_name: battle.name,
						hp: battle.hp,
						attack: battle.attack,
						picture: battle.picture,
					},
				});
			}
		});
	};
	componentWillMount() {}
	componentDidMount() {
		this.setState({
			displayWinner: true,
		});
	}
	componentWillUnmount() {
		if (this.state.redStat.attack > this.state.blueStat.attack) {
			fetch('/api/updateChar', {
				method: 'post',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				//make sure to serialize your JSON body
				body: JSON.stringify({
					character: this.state.blueStat.blue_name,
					battleID: this.props.content.BATTLEID,
				}),
			});
		} else if (this.state.blueStat.attack > this.state.redStat.attack) {
			fetch('/api/updateChar', {
				method: 'post',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				//make sure to serialize your JSON body
				body: JSON.stringify({
					character: this.state.redStat.red_name,
					battleID: this.props.content.BATTLEID,
				}),
			});
		}
	}

	checkWinner = (redStat, blueStat) => {
		if (redStat.attack - blueStat.hp > blueStat.attack - redStat.hp) {
			return <RedSide redP={redStat} />;
		} else {
			return <BlueSide blueP={blueStat} />;
		}
	};

	render() {
		let { redStat, blueStat, displayWinner } = this.state;

		console.log(this.props);
		return (
			<div className="battleStage">
				<h3 style={{ color: '#111111' }}>{this.state.redStat.red_name}</h3>
				<h4 style={{ color: '#111111' }}>VS</h4>
				<h3 style={{ color: '#111111' }}>{this.state.blueStat.blue_name}</h3>
				{/* <BattleTime start={Date.now()} /> */}
				{/* <RedSide redP={redStat} />
				<BlueSide blueP={blueStat} /> */}
				<div style={{ color: '#111111' }}>
					<h2 style={{ color: '#57609E' }}>Winner</h2>
				</div>
				<div>
					{displayWinner && <div>{this.checkWinner(redStat, blueStat)}</div>}
				</div>
			</div>
		);
	}
}

export default BattleScreen;
