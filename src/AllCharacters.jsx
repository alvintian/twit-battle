import React, {
  Component
} from 'react';
import './App.css';

// import Message from "./Message.jsx";
class AllCharacters extends Component {
  render() {
  let message =this.props.ListMessage;
    let profile=<div  className="border" title="profile"><h4>{message.name}</h4><li>HP: {message.hp}</li><li>ATT: {message.attack}</li></div>
 // let profileAttr=document.getElementsByClassName("border");
  	     // profileAttr.style.height = "250px";
    // nodes[i].style.height = "250px";
  	return profile;
  }
}

export default AllCharacters;