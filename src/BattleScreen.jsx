import React, { Component } from 'react';
import './App.css';
// import { BrowserRouter } from "react-router-dom";
import RedSide from "./RedSide.jsx";
import BlueSide from "./BlueSide.jsx";
import BattleTime from "./BattleTime.jsx";
class BattleScreen extends Component {
		constructor(props) {
		super(props);
		this.state = {
		redStat: {},
		blueStat:{},
			// redStat: {red_name: this.props.content.red_name,
			// 			hp: this.props.content.red_hp,
			// 	    attack: this.props.content.red_attack},
			// blueStat:{blue_name: this.props.content.blue_name,
			// 			hp:this.props.content.blue_hp,
			// 		attack:this.props.content.blue_attack}
		};
	fetch(`/api/CurBattle/${this.props.id}`)
	.then(response => response.json())
	.then(response => this.parseBattle(response))
  this.onNavigateHome=this.onNavigateHome.bind(this);
	}



    onNavigateHome() {
//        BrowserRouter.push("/");
      fetch(`/api/CurBattle/${this.props.id}`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      //make sure to serialize your JSON body
      body: JSON.stringify({
          id:this.props.id
      }),
    })
    .then(console.log("function success"))
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
                <BattleTime start={Date.now()}/>
                <RedSide redP={redStat}/>
                <BlueSide blueP={blueStat}/> 
             <button onClick={this.onNavigateHome} className="btn btn-primary">End match!</button>
            </div>)
	}
}

export default BattleScreen;
