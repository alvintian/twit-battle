import React, { Component } from 'react';
import AllCharacters from './AllCharacters.jsx';

// import Message from "./Message.jsx";

class SelectableCharacters extends Component {
	constructor(props) {
		super(props);
		this.state = {
			RedTeamCharId: 0,
			BlueTeamCharId: 0,
			createBattleClicked: false,
		};
		this.handleCreateBattle=this.handleCreateBattle.bind(this);
		this.handlecancel=this.handlecancel.bind(this);
	}
handleBattleStart=() => {
 	this.props.postBattletoDB(this.state.RedTeamCharId, this.state.BlueTeamCharId);
      console.log(this.state,"BATTLE START!");
		let webSocketData = {
			type: "battleTimer"
		// battleId: "Id" 
		}
	this.props.onMatchStart(webSocketData);
}
	handleClickCard = (card) => {
		console.log(this.state,"what is carddddddddddd");
				// this.setState({
				// 	characterClicked:true
				// })
			if(this.state.RedTeamCharId === 0){
				this.setState({
				RedTeamCharId: card.id,
				BlueTeamCharId: this.state.BlueTeamCharId,
			});
		} else {
			this.setState({
				RedTeamCharId: this.state.RedTeamCharId,
				BlueTeamCharId: card.id,
			});
		}
	};


handleCreateBattle() {
this.setState({
		createBattleClicked: true
		});
}
handlecancel(){
this.setState({
		createBattleClicked: false,
		RedTeamCharId: 0,
		BlueTeamCharId: 0	
		});	
}

	componentDidMount() {}
	render() {
		let charNames = this.props.content;
		return (
			<div>
				{this.state.createBattleClicked ? (
				<div><h3>Choose Your Battle Characters!</h3>
				 <button className="create-char-button"
						 style={{ margin: '0 auto' }}
						 onClick={this.handlecancel}>Cancel Battle</button>
					<button
						className="create-char-button"
						style={{ margin: '0 auto' }}
						type="button"
						onClick={this.handleBattleStart}>
						Submit
					</button></div>
				) : 
				<div><h3>All Characters!</h3>
					<button
						style={{ margin: '0 auto' }}
						onClick={this.handleCreateBattle}>
						Create Battle
					</button></div>}
				{charNames.map(x => (
					<AllCharacters
						message={x}
						key={x.id}
						onCharClick={x => this.handleClickCard(x)}
						createBattleClicked={this.state.createBattleClicked}
					/>
				))}

			</div>
		);
	}
}
export default SelectableCharacters;
