import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import AllCharacters from './AllCharacters.jsx';
import CreateCharacter from './CreateCharacter.jsx';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

const Home = () => (
	<div>
		<h2>Homes</h2>
	</div>
);

const Character = ({ match }) => (
	<div>
		<h3>{match.params.charId}</h3>
	</div>
);

const AllCharacter = ({ match }) => (
	<div>
		<h2>Every character is displayed here</h2>
		<ul>
			<li>
				<Link to={`${match.url}/Char1`}>Char1</Link>
			</li>
			<li>
				<Link to={`${match.url}/Char2`}>Char2</Link>
			</li>
			<li>
				<Link to={`${match.url}/Char3`}>Char3</Link>
			</li>
		</ul>
		<Route path="/AllChar/:charId" component={Character} />
		<Route
			exact
			path={match.url}
			render={() => <h3>please select a Character</h3>}
		/>
	</div>
);

const CurrentBattle = () => (
	<div>
		<h3>CurrentBattle displayed here</h3>
	</div>
);

class App extends Component {
	constructor() {
		super();
		this.state = {
			message: '',
			charNames: [],
		};
	}

	componentDidMount() {
		// fetch('/api/message')
		//   .then(response => response.json())
		//   .then(json => this.setState({ message: json[0].name }));
		$.get('/api/message', data => {
			this.setState({
				message: data[0].name,
				charNames: data,
			});
		});
	}

	render() {
		let charNames = this.state.charNames;
		console.log(charNames, "what's in charNames?");
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
						<Route exact path="/" component={Home} />
						<Route exact path="/NewChar"
							render={() => <CreateCharacter content={this.state.message} />}
						/>
						<Route exact path="/AllChar" component={AllCharacter} />
						<Route exact path="/CurBattle" component={CurrentBattle} />
					</div>
				</Router>
				<h2>{this.state.message}</h2>
				<h1>
					{charNames.map(x => <AllCharacters ListMessage={x} key={x.id} />)}
				</h1>
			</div>
		);
	}
}

export default App;
