import React, { Component } from 'react';
import AllCharacters from './AllCharacters.jsx';
import { Redirect } from 'react-router-dom';
// import Message from "./Message.jsx";

class SelectableCharacters extends Component {
	constructor(props) {
		super(props);
		this.state = {
			RedTeamCharId: 0,
			BlueTeamCharId: 0,
			createBattleClicked: false,
			active: false,
			battleid: 0,
			clickedState: 0,
		};
		this.handleCreateBattle = this.handleCreateBattle.bind(this);
		this.handlecancel = this.handlecancel.bind(this);
	}
	handleBattleStart = () => {
		fetch('/api/CurBattle', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			//make sure to serialize your JSON body
			body: JSON.stringify({
				teamRed: this.state.RedTeamCharId,
				teamBlue: this.state.BlueTeamCharId,
			}),
		})
			.then(response => response.json())
			.then(response => {
				this.setState({
					active: true,
					battleid: Number(response),
				});
			}); //		console.log(this.state, 'BATTLE START!');
		let webSocketData = {
			type: 'battleTimer',
			// battleId: "Id"
		};
		this.props.onMatchStart(webSocketData);
	};
	handleClickCard = card => {
		console.log(this.state, 'what is carddddddddddd');
		// this.setState({
		// 	characterClicked:true
		// })
		if (this.state.RedTeamCharId === 0) {
			this.setState({
				RedTeamCharId: card.id,
				BlueTeamCharId: this.state.BlueTeamCharId,
				clickedState: this.state.clickedState + 1,
			});
		} else {
			this.setState({
				RedTeamCharId: this.state.RedTeamCharId,
				BlueTeamCharId: card.id,
				clickedState: this.state.clickedState + 1,
			});
		}
	};

	handleCreateBattle() {
		this.setState({
			createBattleClicked: true,
		});
	}
	handlecancel() {
		this.setState({
			createBattleClicked: false,
			RedTeamCharId: 0,
			BlueTeamCharId: 0,
		});
	}
	componentDidMount() {
		this.props.getData();
	}
	render() {
		let charNames = this.props.content;
		if (this.state.active === true) {
			return <Redirect to={'/CurBattle/'} />;
		}
		return (
			<div>
				{this.state.createBattleClicked ? (
					<div style={{ margin: '10px' }}>
						<h3 className="heading-font">Choose Your Battle Characters!</h3>
						<div style={{ margin: '10px' }}>
							<button
								className="create-char-button"
								style={{ margin: '0 auto' }}
								onClick={this.handlecancel}>
								Cancel Battle
							</button>
							<button
								className="create-char-button"
								style={{ margin: '0 auto' }}
								type="button"
								onClick={this.handleBattleStart}>
								Submit
							</button>
						</div>
					</div>
				) : (
					<div style={{ margin: '10px' }}>
						<h1 className="heading-font">All Characters!</h1>
						<button
							style={{ margin: '0 auto' }}
							className="create-char-button"
							onClick={this.handleCreateBattle}>
							Create Battle
						</button>
					</div>
				)}
				{charNames.map(x => (
					<AllCharacters
						message={x}
						key={x.id}
						onCharClick={x => this.handleClickCard(x)}
						createBattleClicked={this.state.createBattleClicked}
						clickedState={this.state.clickedState}
						colorBlueTeamCharId={this.state.BlueTeamCharId}
						colorRedTeamCharId={this.state.RedTeamCharId}
					/>
				))}
			</div>
		);
	}
}
export default SelectableCharacters;
