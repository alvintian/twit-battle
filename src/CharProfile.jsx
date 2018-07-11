import React, {
	Component
} from 'react';
import ActiveMatch from "./ActiveMatch.jsx";

class CharProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			charStat: {},
			unparsedBattle: []
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
				console.log(response,"what's ALlChar response???")
				this.setState({
					charStat: response[0]
				})
			})
	fetch(`/api/AllChar/${this.props.id}/battles`)
	.then(response => response.json())
	.then(response => {
		console.log(response,"what's ALlChar/battles response???")
	for (let x = 0; x < response.length; x++) {
		if (response[x].blue_side_id_fk === parseInt(this.props.id, 8) || response[x].red_side_id_fk === parseInt(this.props.id, 8)) {
				this.setState({
					unparsedBattle: [...this.state.unparsedBattle, response[x]]
				})
			}
		}
			this.parseBattle(this.state.unparsedBattle);
			console.log(this.state.data,"is data parsed????")
		})
	}
			render() {
		let activematch = this.state.data;
		return ( <div className="leftdiv">
				<div><h2>{this.state.charStat.name}'s PROFILE!</h2>
				<img src={this.state.charStat.picture} alt=""></img>
				<h4>{this.state.charStat.name}</h4></div>
				<div className='rightdiv'>
				<li><h4>Number of matches {this.state.charStat.matches}</h4></li>
				<li><h4>Attack: {this.state.charStat.attack}</h4></li>
				<li><h4>HP: {this.state.charStat.hp}</h4></li>
				<li><h4>Eliminated: {this.state.charStat.eliminated?"True":"False"}</h4></li>
				<li><h4>Description: {this.state.charStat.description}</h4></li>
				</div>
				<p>Past matches:</p>
				{activematch.map(x => (
					<ActiveMatch
						match={x}
						key={x.BATTLEID}
						matchInfo={this.props.matchInfo}
					/>
				))}
				</div>)
		}
	}
	export default CharProfile;