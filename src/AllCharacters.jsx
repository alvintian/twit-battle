import React, { Component } from 'react';
import './App.css';
import { Redirect } from 'react-router-dom';

// import Message from "./Message.jsx";
class AllCharacters extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: null,
			active: false,
			createBattleClicked: this.props.createBattleClicked,
			characterClicked: false,
			counter: 0,
			stateColor: 0,
		};
	}

	componentDidMount() {
		this.setState({ messages: this.props.ListMessage });
	}
	// onItemClick = (event) => {
	// 	event.preventDefault();
	// 	console.log('clicked');
	// 	//  event.stopPropagation();
	// 	this.setState((prevState,props) => {
	// 		return {counter: prevState.counter + 1}
	// 	})
	// }
	onItemClick = event => {
		// if(event.currentTarget.style.backgroundColor === '#ccc'){
		//     event.currentTarget.style.backgroundColor = 'coral';
		//  }else{
		//  	event.currentTarget.style.backgroundColor = '#ccc';
		//  }
	};

	render() {
		const { message } = this.props;
		// const style = this.state.active
		// 	? {
		// 			backgroundColor: '#FF4136',
		// 	  }
		// 	: {
		// 			backgroundColor: '#57609E',
		// 	  };

		const style = this.state.active
			? this.props.colorRedTeamCharId !== 0
				? this.props.colorBlueTeamCharId !== 0
					? {
							backgroundColor: '#FF4136',
					  }
					: { backgroundColor: '#0074D9' }
				: { backgroundColor: '#0074D9' }
			: {
					backgroundColor: '#57609E',
			  };

		if (
			this.props.createBattleClicked === false &&
			this.state.characterClicked === true
		) {
			//			console.log(this.props.characterClicked,"props or false??")
			console.log(this.state.characterClicked, 'state or false??');
			return <Redirect to={'/AllChar/' + this.props.message.id} />;
		}
		let profile = (
			<div
				className={'border ' + (message.eliminated === true ? 'opacity' : null)}
				onClick={e => {
					if (e.target.classList.contains('opacity')) {
						return;
					}
					this.props.onCharClick(message);
					this.setState(prevState => {
						return {
							active: !prevState.active,
							characterClicked:
								this.props.createBattleClicked === false
									? !prevState.characterClicked
									: false,
							stateColor: this.state.stateColor + 1,
						};
					});
				}}
				style={style}>
				{/* {message.eliminated === true ? <h2>elimnated</h2> : <h2>Alive</h2>} */}
				<h2 style={{ color: 'white' }}>{message.name}</h2>

				<h3 style={{ margin: '10px' }}>HP: {message.hp}</h3>
				<h3 style={{ margin: '10px' }}>ATT: {message.attack}</h3>
				<img src={message.picture} width={'200px'} height={'200px'} alt="" />
			</div>
		);
		// let profileAttr=document.getElementsByClassName("border");
		// profileAttr.style.height = "250px";
		// nodes[i].style.height = "250px";
		return profile;
	}
}

export default AllCharacters;
