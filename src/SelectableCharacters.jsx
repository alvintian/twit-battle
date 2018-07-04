import React, { Component } from 'react';
import $ from 'jquery';
import AllCharacters from './AllCharacters.jsx';

// import Message from "./Message.jsx";

class SelectableCharacters extends Component {
	constructor(props) {
		super(props);
		this.state = {
			RedTeamName:"",
			BlueTeamName:""
		};
	}
handleBattleStart=() => {
 	this.props.postBattletoDB(this.state.RedTeamName, this.state.BlueTeamName);
      console.log(this.state,"BATTLE START!");
}
	handleClickCard = (event) => {
		if(this.state.RedTeamName === ""){
			this.setState({
				RedTeamName: event.name
			});
		}else{
			this.setState({
				BlueTeamName: event.name
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