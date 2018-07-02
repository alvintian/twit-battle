import React, {
  Component
} from 'react';

// import Message from "./Message.jsx";
class AllCharacters extends Component {
  render() {
  let message =this.props.ListMessage;
  	return <button type="button">{message.name}</button>
  }
}

export default AllCharacters;