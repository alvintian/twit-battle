import React, {
	Component
} from 'react';
import './battle.css';

class BlueSide extends Component {


	render() {
		// console.log(this.state.blueplayer,"who is blue??")
	return (<div className="bluePlayer">BLUE:{this.props.blueP.blue_name}</div>)
  }
	}
export default BlueSide;