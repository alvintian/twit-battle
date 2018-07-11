import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import CreateCharacter from './CreateCharacter.jsx';
import CurrentBattle from './CurrentBattle.jsx';
import SelectableCharacters from './SelectableCharacters.jsx';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import BattleScreen from './BattleScreen.jsx';
const Home = () => (
	<div>
		<h2>Homes</h2>
	</div>
);

// const Character = ({ match }) => (
// 	<div>
// 		<h3>{match.params.charId}</h3>
// 	</div>
// );

// const AllCharacter = ({ match }) => (
// 	<div>
// 		<h2>Every character is displayed here</h2>
// 		<ul>
// 			<li>
// 				<Link to={`${match.url}/Char1`}>Char1</Link>
// 			</li>
// 			<li>
// 				<Link to={`${match.url}/Char2`}>Char2</Link>
// 			</li>
// 			<li>
// 				<Link to={`${match.url}/Char3`}>Char3</Link>
// 			</li>
// 		</ul>
// 		<Route path="/AllChar/:charId" component={Character} />
// 		<Route
// 			exact
// 			path={match.url}
// 			render={() => <h3>please select a Character</h3>}
// 		/>
// 	</div>
// );
//do not delete the comments.
class App extends Component {
	constructor() {
		super();
		this.state = {
			charNames: [],
			matchState: {}
		};
		this.matchInfo=this.matchInfo.bind(this);
		this.postBattletoDB = this.postBattletoDB.bind(this);
		this.postChartoDB = this.postChartoDB.bind(this);
		// this.handleClickCard=this.handleClickCard.bind(this);
	}

	getData = () => {
		$.get('/api/message', data => {
			this.setState({
				charNames: data,
			});
		});
	};
	matchInfo(match){	
			this.setState({
				matchState: match
			});
		}
	componentDidMount() {
		this.getData();
		// this.socket = new WebSocket("ws://localhost:8080/");
		// this.socket.addEventListener("message", event => {
		// 	const responseMessage = JSON.parse(event.data);
		// if(typeof(responseMessage)==='number'){
		// 	console.log(responseMessage,"total users is a numb");
		// return 	this.totalUsers(responseMessage);	
		// }
		//   switch(responseMessage.type) {
  //     case "incomingMessage":
  //       // handle incoming message
  //     break;
  //     case "incomingNotification":
	 //        // handle incoming notification
		//  responseMessage.content= responseMessage.oldname+" has changed their name to "+responseMessage.username;
  //       break;
  //     default:
  //       // show an error in the console if the message type is unknown
  //       throw new Error("Unknown event type " + responseMessage.type);
		// 	}
		// 	const messages = this.state.messages.concat(responseMessage);
		// 	this.setState({messages: messages})
//		});
	}

	postBattletoDB(team_Red, team_Blue) {
		fetch('/api/CurBattle', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			//make sure to serialize your JSON body
			body: JSON.stringify({
				teamRed: team_Red,
				teamBlue: team_Blue,
			}),
		});
	}
	postChartoDB(charName, charAttr) {
		// $.ajax({
		// 	url: '/api/NewChar',
		// 	method: 'POST',
		// 	data: {
		// 		character: charName,
		// 		select: charAttr,
		// 	},
		// 	success: console.log(charAttr, 'post success'),
		// });
		fetch('/api/NewChar', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			//make sure to serialize your JSON body
			body: JSON.stringify({
				character: charName,
				select: charAttr,
			}),
		}).then(response => {
			console.log(response.body,"twittername in props??")
			this.getData();
		});
	}

	handleMatchStart = content => {
		// let message = {
		// 	content: content
		// }
		// if(this.state.currentUser.name !== this.state.currentUser.newname){
		// 	message.type="postNotification";
		// 	message.username = this.state.currentUser.newname;
		// 	message.oldname=this.state.currentUser.name;
		// 	this.setState({
		// 		currentUser: {
		// 			name: this.state.currentUser.newname,
		// 			newname: this.state.currentUser.newname,
		// 		  color: this.state.currentUser.color
		// 		}
		// 	})
		// } else{
		// 	message.type="postMessage";
		// 	message.username = this.state.currentUser.name;
		// }
		// this.socket.send(JSON.stringify(content));
	}

	render() {
		let charNames = this.state.charNames;
		let matchState = this.state.matchState;
		return (
			<div className="App">
				<Router>
					<div>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/NewChar">Create Character</Link>
						</li>
						<li>
							<Link to="/AllChar">All Characters</Link>
						</li>
						<li>
							<Link to="/CurBattle">Show Current Battle</Link>
						</li>

						<Switch>
							<Route exact path="/" component={Home} />
							<Route
								exact
								path="/NewChar"
								render={() => (
									<CreateCharacter
										postChartoDB={this.postChartoDB}
									/>
								)}
							/>
							<Route
								exact
								path="/AllChar"
								render={() => (
									<SelectableCharacters
										content={charNames}
										postBattletoDB={this.postBattletoDB} 
										onMatchStart={this.handleMatchStart}
									/>
								)}
							/>
						  	<Route exact path={"/CurBattle/:id"}
									render={({match}) => (
							<BattleScreen content={matchState} id={match.params.id}/>
								)}/>
							<Route exact path="/CurBattle" 
									render={() => (
							<CurrentBattle matchInfo={this.matchInfo}/>
								)} />
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
