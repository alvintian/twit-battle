import React, {
    Component
} from 'react';

class BattleTime extends Component {
     constructor(props) {
    super(props);
        this.state = {
        elapsed: 0,
        };
        this.tick=this.tick.bind(this);
       // this.handleChange = this.handleChange.bind(this);

}
    componentDidMount(){
        // componentDidMount is called by react when the component 
        // has been rendered on the page. We can set the interval here:
        this.timer = setInterval(this.tick, 50);
    }

    componentWillUnmount(){
        // This method is called immediately before the component is removed
        // from the page and destroyed. We can clear the interval here:
        console.log("what time is it?",this.state.elapsed)
        clearInterval(this.timer);
    }
tick(){
      this.setState({elapsed: new Date() - this.props.start});   
}
    render() {
                // Calculate elapsed to tenth of a second:
        var elapsed = Math.round(this.state.elapsed / 100);
        // This will give a number with one digit after the decimal dot (xx.x):
        var seconds = (elapsed / 10).toFixed(1);
        console.log(seconds,"what is the second??")    
    return (<p>This example was started <b>{seconds} seconds</b> ago.</p>)
  }
    }
export default BattleTime;




// var BattleTime = React.createClass({
//     getInitialState: function(){
//         // This is called before our render function. The object that is 
//         // returned is assigned to this.state, so we can use it later.
//         return { elapsed: 0 };
//     },
//     componentDidMount: function(){
//         // componentDidMount is called by react when the component 
//         // has been rendered on the page. We can set the interval here:
//         this.timer = setInterval(this.tick, 50);
//     },

//     componentWillUnmount: function(){
//         // This method is called immediately before the component is removed
//         // from the page and destroyed. We can clear the interval here:
//         clearInterval(this.timer);
//     },

//     tick: function(){
//         // This function is called every 50 ms. It updates the 
//         // elapsed counter. Calling setState causes the component to be re-rendered
//         this.setState({elapsed: new Date() - this.props.start});
//     },

//     render: function() {  
//         // Calculate elapsed to tenth of a second:
//         var elapsed = Math.round(this.state.elapsed / 100);
//         // This will give a number with one digit after the decimal dot (xx.x):
//         var seconds = (elapsed / 10).toFixed(1);    
//         // Although we return an entire <p> element, react will smartly update
//         // only the changed parts, which contain the seconds variable.
//         return <p>This example was started <b>{seconds} seconds</b> ago.</p>;
//     }
// });

// ReactDOM.render(
//     <BattleTime start={Date.now()} />,
//     document.getElementById('timerContainer')
// );