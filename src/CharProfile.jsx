import React, { Component } from 'react';
import ActiveMatch from './ActiveMatch.jsx';

class CharProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			charStat: {},
			unparsedBattle: [],
		};
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
				battleObj[battle.BATTLEID].red_side_hp = battle.red_side_hp;
			} else if (battle.id === battle.blue_side_id_fk) {
				battleObj[battle.BATTLEID].blue_name = battle.name;
				battleObj[battle.BATTLEID].blue_hp = battle.hp;
				battleObj[battle.BATTLEID].blue_attack = battle.attack;
				battleObj[battle.BATTLEID].blue_side_hp = battle.blue_side_hp;

			}
		});
		this.setState({
			data: Object.values(battleObj),
		});
	};
	componentDidMount() {
		fetch(`/api/AllChar/${this.props.id}`)
			.then(response => response.json())
			.then(response => {
				this.setState({
					charStat: response[0]
				})
			})
	fetch(`/api/AllChar/${this.props.id}/battles`)
	.then(response => response.json())
	.then(response => {
	for (let x = 0; x < response.length; x++) {
		if (response[x].blue_side_id_fk === Number(this.props.id) || response[x].red_side_id_fk === Number(this.props.id)) {
				this.setState({
					unparsedBattle: [...this.state.unparsedBattle, response[x]]
				})
			}
		}
			this.parseBattle(this.state.unparsedBattle);
		})
	}
	render() {
		let activematch = this.state.data;
				console.log(activematch,"what is activematch")
		return (
			<div className="leftdiv">
				<div>
					<h2>{this.state.charStat.name}'s PROFILE!</h2>
					<img src={this.state.charStat.picture} alt="" />
					<h4>{this.state.charStat.name}</h4>
				</div>
				<div className="rightdiv">
					<li>
						<h4>Number of matches {this.state.charStat.matches}</h4>
					</li>
					<li>
						<h4>Attack: {this.state.charStat.attack}</h4>
					</li>
					<li>
						<h4>HP: {this.state.charStat.hp}</h4>
					</li>
					<li>
						<h4>
							Eliminated: {this.state.charStat.eliminated ? 'True' : 'False'}
						</h4>
					</li>
					<li>
						<h4>Description: {this.state.charStat.description}</h4>
					</li>
				</div>
				<p>Past matches:</p>
				{/* {this.state.charStat.matches > 0
					? activematch.map(x => (
							<ActiveMatch
								match={x}
								key={x.BATTLEID}
								matchInfo={this.props.matchInfo}
							/>
					  ))
					: null} */}
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
export default CharProfile;
