import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import RedSide from "./RedSide.jsx";
import BlueSide from "./BlueSide.jsx";

class BattleScreen extends Component {
		constructor(props) {
		super(props);
		this.state = {
		redStat: {},
		blueStat:{}
			// redStat: {red_name: this.props.content.red_name,
			// 			hp: this.props.content.red_hp,
			// 	    attack: this.props.content.red_attack},
			// blueStat:{blue_name: this.props.content.blue_name,
			// 			hp:this.props.content.blue_hp,
			// 		attack:this.props.content.blue_attack}
		};
	fetch(`/api/CurBattle/${this.props.id}`)
	.then(response => response.json())
//	.then(res => console.log(res,"what is res??"))
	.then(response => this.parseBattle(response))
	}
    onNavigateHome() {
        BrowserRouter.push("/");
    }

    parseBattle=(x) =>{
//zach's code great help!
let battleObj = {}
	x.forEach((battle) => {
  // if battle doesn't already exist
  if (!battleObj[battle.BATTLEID]) {
    // add to battle object
    battleObj = {
      BATTLEID: battle.BATTLEID
    }
  }
  if (battle.id === battle.red_side_id_fk) {
	this.setState({
redStat: {red_name: battle.name,
    			hp: battle.hp,
    		attack: battle.attack}
  })
}
   if(battle.id === battle.blue_side_id_fk){
 	this.setState({
blueStat: {blue_name: battle.name,
    			hp: battle.hp,
    		attack: battle.attack}
  })
    }

})
}

    componentWillMount(){

    }
	componentDidMount() {
	}

	render() {
let redStat=this.state.redStat;
let blueStat=this.state.blueStat;
		return (<div className="battleStage">
                <h3>{this.state.redStat.red_name} VS {this.state.blueStat.blue_name}!</h3>
                <RedSide redP={redStat}/>
                <BlueSide blueP={blueStat}/>                
{/*             <button onClick={this.onNavigateHome} className="btn btn-primary">Go Home!</button>*/}
            </div>)
	}
}

export default BattleScreen;
