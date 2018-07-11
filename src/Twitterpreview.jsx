import React, {
	Component
} from 'react';
class Twitterpreview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputLinkClicked:this.props.inputLinkClicked
		}
	    this.handlecancel = this.handlecancel.bind(this);
	}

  handlecancel(){
  	this.props.handleCancelTwitter();
//  this.setState({ inputLinkClicked:false })
}
render() {
		console.log(this.props.twitterName,"twittername in props??")

		// console.log(this.state.blueplayer,"who is blue??")
	return (
 <div className="twitterPicPreview"><img src={this.props.newImage} alt=""></img>
 <button onClick={this.handlecancel}>Cancel</button>
<button onClick={() =>this.props.postChartoDB(this.props.twitterName,"T")}>Submit</button>
</div>)
}
}

export default Twitterpreview;