import React, { Component } from 'react';
import AllCharacters from './AllCharacters.jsx';

// import Message from "./Message.jsx";

class SelectableCharacters extends Component {
	constructor(props) {
		super(props);
		this.state = {
			RedTeamCharId:0,
			BlueTeamCharId:0
		};
	}
handleBattleStart=() => {
 	this.props.postBattletoDB(this.state.RedTeamCharId, this.state.BlueTeamCharId);
      console.log(this.state,"BATTLE START!");
}
	handleClickCard = (card) => {
		if(this.state.RedTeamCharId === 0){
			this.setState({
				RedTeamCharId: card.id,
				BlueTeamCharId: this.state.BlueTeamCharId
			});
		}else{
			this.setState({
				RedTeamCharId:this.state.RedTeamCharId,
				BlueTeamCharId: card.id
			});
		}
      console.log(this.state,"what is the state?");
}
//      console.log(event.hp);
	

	componentDidMount() {}
	render() {
		let charNames=this.props.content;
		return (
	<div>
		<h3>Choose Your Battle Characters!</h3>
		<h1>
			{charNames.map(x => <AllCharacters message={x} key={x.id} onClick={(x) => this.handleClickCard(x)} />)}
			<button type="button" onClick={this.handleBattleStart}>Submit</button>
		</h1>

	</div>);
	}
}
export default SelectableCharacters;