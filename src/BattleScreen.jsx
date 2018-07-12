import React, { Component } from 'react';
import './App.css';
// import { BrowserRouter } from "react-router-dom";
import RedSide from './RedSide.jsx';
import BlueSide from './BlueSide.jsx';
import BattleTime from './BattleTime.jsx';
import { ProgressBar } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class BattleScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redStat: {},
			blueStat: {},
			cur_red_hp: null,
			cur_blue_hp: null,
			displayWinner: false,
			redPTurn: true,
			active: false,
			// redStat: {red_name: this.props.content.red_name,
			// 			hp: this.props.content.red_hp,
			// 	    attack: this.props.content.red_attack},
			// blueStat:{blue_name: this.props.content.blue_name,
			// 			hp:this.props.content.blue_hp,
			// 		attack:this.props.content.blue_attack}
		};
		//    this.props.onMessageSubmit(this.state.content)
		//this.checkWinner = this.checkWinner.bind(this);
		this.handleBackButton = this.handleBackButton.bind(this);
	}
	handleBackButton() {
		this.setState({
			active: true,
		});
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
					cur_red_hp: battle.hp,
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
					cur_blue_hp: battle.hp,
				});
			}
		});
	};
	componentWillMount() {}
	componentDidMount() {
		fetch(`/api/CurBattle/${this.props.id}`)
			.then(response => response.json())
			.then(response => {
				this.parseBattle(response);
			});

		this.timer = setInterval(
			function() {
				console.log(
					this.state.redStat.attack,
					this.state.cur_red_hp,
					'what is redhp?'
				);
				if (this.state.cur_red_hp > 0 && this.state.cur_blue_hp > 0) {
					if (this.state.redPTurn === true) {
						this.setState(prevState => {
							return {
								redPTurn: !prevState.redPTurn,
								cur_blue_hp: this.state.cur_blue_hp - this.state.redStat.attack,
							};
						});
					} else {
						this.setState(prevState => {
							return {
								redPTurn: !prevState.redPTurn,
								cur_red_hp: this.state.cur_red_hp - this.state.blueStat.attack,
							};
						});
					}
				} else if (this.state.cur_red_hp <= 0) {
					this.setState({
						displayWinner: true,
					});
					clearInterval(this.timer);
				} else if (this.state.cur_blue_hp <= 0) {
					this.setState({
						displayWinner: true,
					});
					clearInterval(this.timer);
				}
				//				console.log(this.state.cur_red_hp, 'what is redhp after set??');
			}.bind(this),
			500
		);
	}
	componentWillUnmount() {
		clearInterval(this.timer);
		fetch('/api/updateChar', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			//make sure to serialize your JSON body
			body: JSON.stringify({
				character:
					this.state.cur_blue_hp <= 0
						? this.state.blueStat.blue_name
						: this.state.redStat.red_name,
				battleID: this.props.content.BATTLEID,
				red_side_hp: this.state.cur_red_hp,
				blue_side_hp: this.state.cur_blue_hp,
			}),
		});
	}

	checkWinner = (redStat, blueStat) => {
		if (this.state.cur_blue_hp <= 0) {
			return <RedSide redP={redStat} />;
		} else {
			return <BlueSide blueP={blueStat} />;
		}
	};

	render() {
		let { redStat, blueStat, displayWinner } = this.state;
		let redHealthPercent =
			(this.state.cur_red_hp / this.state.redStat.hp) * 100;
		let blueHealthPercent =
			(this.state.cur_blue_hp / this.state.blueStat.hp) * 100;
		if (this.state.active === true) {
			return <Redirect to={'/AllChar'} />;
		}
		return (
			<div className="battleStage">
				<h3 style={{ color: '#111111' }}>{this.state.redStat.red_name}</h3>
				<ProgressBar
					active
					now={redHealthPercent < 0 ? 0 : redHealthPercent}
					striped
					bsStyle="danger"
				/>
				<h4 style={{ color: '#111111' }}>VS</h4>
				<h3 style={{ color: '#111111' }}>{this.state.blueStat.blue_name}</h3>
				<ProgressBar
					active
					now={blueHealthPercent < 0 ? 0 : blueHealthPercent}
					striped
					bsStyle="info"
				/>
				{/*				 <BattleTime start={Date.now()} /> 
*/}
				{this.state.displayWinner === true ? (
					<div>
						<div style={{ color: '#111111' }}>
							<h1 style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Winner</h1>
						</div>
						<div>
							<div>{this.checkWinner(redStat, blueStat)}</div>
						</div>
						<button
							className="create-char-button"
							style={{ margin: '0 auto' }}
							type="button"
							onClick={this.handleBackButton}>
							Create Another Battle
						</button>
					</div>
				) : (
					<div>
						<RedSide redP={redStat} />
						<BlueSide blueP={blueStat} />
					</div>
				)}
			</div>
		);
	}
}

export default BattleScreen;
