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
	componentDidMount() {
		fetch(`/api/AllChar/${this.props.id}`)
			.then(response => response.json())
			.then(response => {
				this.setState({
					charStat: response[0],
				});
			});
		fetch(`/api/AllChar/${this.props.id}/battles`)
			.then(response => response.json())
			.then(response => {
				for (let x = 0; x < response.length; x++) {
					if (
						response[x].blue_side_id_fk === Number(this.props.id) ||
						response[x].red_side_id_fk === Number(this.props.id)
					) {
						this.setState({
							unparsedBattle: [...this.state.unparsedBattle, response[x]],
						});
					}
				}
				this.parseBattle(this.state.unparsedBattle);
			});
	}
	render() {
		let activematch = this.state.data;
		return (
			<div className="leftdiv">
				<div>
					<h1 style={{ color: '#FFF', fontWeight: 'bold' }}>
						{this.state.charStat.name}'s Profile
					</h1>
					<img src={this.state.charStat.picture} alt="" />
					<h2 style={{ color: '#FFF', fontWeight: 'bold' }}>
						{this.state.charStat.name}
					</h2>
				</div>
				<div className="rightdiv" style={{ margin: '10px' }}>
					{/* <li>
						<h4>Number of matches {this.state.charStat.matches}</h4>
					</li> */}

					<h2 style={{ color: '#FFF' }}>
						Attack: {this.state.charStat.attack}
					</h2>

					<h2 style={{ color: '#FFF' }}>HP: {this.state.charStat.hp}</h2>

					<h2 style={{ color: '#FFF' }}>
						Eliminated: {this.state.charStat.eliminated ? 'True' : 'False'}
					</h2>

					<h2 style={{ color: '#FFF' }}>
						Description: {this.state.charStat.description}
					</h2>
				</div>
				<h2 style={{ color: '#FFF', fontWeight: 'bold' }}>Past matches:</h2>
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
