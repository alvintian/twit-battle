import React, {
  Component
} from 'react';
import $ from 'jquery';
// import Message from "./Message.jsx";
class CreateCharacter extends Component {
   constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({content: event.target.value});
  }

  handleEnterPressed = event => {
    event.preventDefault();
    console.log(event.target.value,"eventbody");
    if (event.key === "Enter") {
      $.ajax({
        url: '/api/NewChar',
        method: 'POST',
        data: {character:event.target.value},
        success: console.log("everything works")
      });

    this.setState({content:""});
    }
  }
    componentDidMount() {
    // fetch('/api/message')
    //   .then(response => response.json())
    //   .then(json => this.setState({ message: json[0].name }));
      $.get('/api/message', data=>{
      this.setState({ message: data[1].name});
      })
  }
  render() {
return  <div>
   <h2>new characters all goes in here</h2>
   <input className=""  placeholder="Enter that person's twitter name" />
   <br />
   <input className="" value={this.state.content} onChange={this.handleChange} 
  onKeyUp={this.handleEnterPressed} placeholder="Enter New Character's name" />
   <h4>{this.props.content},{this.state.message}</h4>
   </div> }
}

export default CreateCharacter;