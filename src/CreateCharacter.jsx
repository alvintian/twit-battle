import React, {
  Component
} from 'react';

// import Message from "./Message.jsx";
class CreateCharacter extends Component {
    componentDidMount() {
    // fetch('/api/message')
    //   .then(response => response.json())
    //   .then(json => this.setState({ message: json[0].name }));
      $.get('/api/NewChar', data=>{
      this.setState({ message: data[0].name,
                      charNames: data });
      })
  }
  render() {
return  <div>
   <h2>new characters all goes in here</h2>
   <input className=""  placeholder="Enter that person's twitter name" />
   <br />
   <input className="" placeholder="Enter New Character's name" />
   <h4>{this.props.content} testtt</h4>
   </div> }
}

export default CreateCharacter;