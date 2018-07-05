import React, { Component } from 'react';
import $ from 'jquery';
// import Message from "./Message.jsx";
import './App.css';
import ActiveMatch from './ActiveMatch.jsx'
import BattleScreen from './BattleScreen.jsx'

class CurrentBattle extends Component {
	constructor(props) {
		super(props);
		this.state = {
		data: []
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


parseBattle=(x) =>{
//zach's code great help!
let battleObj = {}
	x.forEach((battle) => {
  // if battle doesn't already exist
  if (!battleObj[battle.BATTLEID]) {
    // add to battle object
    battleObj[battle.BATTLEID] = {
      BATTLEID: battle.BATTLEID
    }
  }
  if (battle.id === battle.red_side_id_fk) {
    battleObj[battle.BATTLEID].red_name = battle.name
  } else {
    battleObj[battle.BATTLEID].blue_name = battle.name
  }
})
	this.setState({
		data: Object.values(battleObj)
		});
}

	render() {
	let activematch= this.state.data;
	return (
	<div>
		<h3>CurrentBattles are displayed here</h3>
			{activematch.map(x => <ActiveMatch match={x} key={x.BATTLEID}/>)}
	</div>);
	}
}
export default CurrentBattle;