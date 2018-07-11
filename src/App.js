import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import CreateCharacter from './CreateCharacter.jsx';
import CurrentBattle from './CurrentBattle.jsx';
import SelectableCharacters from './SelectableCharacters.jsx';
import {
	NavLink,
	Switch,
	Route,
	Link,
	BrowserRouter as Router,
} from 'react-router-dom';
import BattleScreen from './BattleScreen.jsx';
import CharProfile from './CharProfile.jsx';
import Twitterwars from './images/twitterwars.png';
import TwitterwarsHome from './images/twiterwarshome.png';
const Home = () => (
	<div>
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				flexDirection: 'column',
				alignItems: 'center',
			}}>
			<img
				src={TwitterwarsHome}
				width={'300px'}
				style={{ marginTop: '20px' }}
				alt=""
			/>
			<h1>Create Your Character!</h1>
			<div className="create-char-button">
				<Link
					style={{ textDecoration: 'none', color: '#111111' }}
					to="/NewChar">
					Create Character
				</Link>
			</div>
			<h1>View Current Battles! </h1>
			<div className="create-char-button">
				<Link
					style={{ textDecoration: 'none', color: '#111111' }}
					to="/CurBattle">
					View Battles!
				</Link>
			</div>
		</div>
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
			matchState: {},
		};
				this.getData();
		this.matchInfo = this.matchInfo.bind(this);
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
				matchState: match,
			});
		}
	componentDidMount() {
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
//			this.getData();
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
					<div
						style={{
							minHeight: '100%',
							minWidth: '100%',
							height: 'auto',
							width: 'auto',
						}}>
						<nav>
							<div className="logo">
								<img
									alt=""
									src={Twitterwars}
									style={{ width: '50px', height: '50px' }}
								/>
							</div>
							<li>
								<NavLink
									activeClassName="is-active"
									style={{ textDecoration: 'none', color: '#Efedef' }}
									to="/">
									Home
								</NavLink>
							</li>
							<li>
								<NavLink
									activeStyle={{ color: 'red' }}
									style={{ textDecoration: 'none', color: '#Efedef' }}
									to="/NewChar">
									Create Character
								</NavLink>
							</li>
							<li>
								<NavLink
									activeStyle={{ color: 'red' }}
									style={{ textDecoration: 'none', color: '#Efedef' }}
									to="/AllChar">
									All Characters
								</NavLink>
							</li>
							<li>
								{
									<NavLink
										activeStyle={{ color: 'red' }}
										style={{ textDecoration: 'none', color: '#Efedef' }}
										to="/CurBattle">
										Show Current Battle
									</NavLink>
								}
							</li>
						</nav>
						{/* <Route exact path="/" component={Home} /> */}
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
							<BattleScreen content={matchState} id={match.params.id} />
								)}/>
						  	<Route exact path={"/AllChar/:id"}
									render={({match}) => (
							<CharProfile content={matchState} id={match.params.id} />
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
