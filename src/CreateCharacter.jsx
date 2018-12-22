import React, { Component } from 'react';
// import characterframe from "./characterframe.css";
import Twitterpreview from './Twitterpreview.jsx';
// import Message from "./Message.jsx";
// import $ from 'jquery';
import Popup from 'reactjs-popup';
import { Redirect } from 'react-router-dom';
class CreateCharacter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newName: '',
			twitterName: '',
			charAttr: '',
			newImage: '',
			newCharDescription: '',
			inputLinkClicked: false,
			modalIsOpen: false,
			active:false
		};
		this.fd = new FormData();
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({ [name]: value });
		//		this.setState({ newName: event.target.value, charAttr: 'O' });
	}
	handleUpload = e => {
		this.fd.append('file', e.target.files[0]);
		for (var key of this.fd.entries()) {
			console.log(key[0], key[1], 'is the key there???');
		}
		// console.log(e.target.files[0].value,".value??");
		//   this.setState({ newImage: e.target.files[0] });
	};

	handleEnterPressed = event => {
		event.preventDefault();
		if (event.key === 'Enter') {
			//			this.props.postChartoDB(this.state.twitterName,"Tp")
			fetch('/api/NewChar', {
				method: 'post',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				//make sure to serialize your JSON body
				body: JSON.stringify({
					character: this.state.twitterName,
					select: 'Tp',
				}),
			}).then(response => {
				//			console.log(response.json(response),"what is dada");
				//			console.log(response);
				response.json().then(data => {
					this.setState({
						newImage: data.twitterImage,
						newName: '',
						inputLinkClicked: true,
					});
				});
			});
			// .then(data => {
			// this.handleTwitterResponse(data);
			// })
			//		.then(response => {console.log(response,"what is passed back??")});

			//onClick={this.props.postChartoDB(event.target.value, "T")}
			// $.ajax({
			// 	url: '/api/NewChar',
			// 	method: 'POST',
			// 	data: {
			// 		character: event.target.value,
			// 		select: this.state.charAttr,
			// 	},
			// 	success: console.log(this.state.charAttr, 'post success'),
			// });
		}
	};
	handleSubmit(event) {
		event.preventDefault();
		//           var fileD = new FormData($('#photo')[0].files[0]);
		// $.ajax({
		//     type: "POST",
		//     url: '/api/NewChar',
		//     data: this.state.newName,
		//     processData: false,
		//     contentType: false,
		//     dataType: "json",
		// })

		this.fd.append('name', this.state.newName);
		this.fd.append('select', 'O');
		this.fd.append('desc', this.state.newCharDescription);
		fetch('/api/NewChar', {
			method: 'POST',
			// 		headers: {
			// 	Accept: 'application/json',
			// 	'Content-Type': 'application/json',
			// },
			body: this.fd
			//   JSON.stringify({
			//   	  newName: "this.state.newName",
			//    newCharDescription: this.state.newCharDescription
			// })
		}).then(
				setTimeout(() => {
				this.setState({
					active: true
				})
			},500)
				)
		//   handleSubmit(event) {
		//     event.preventDefault();
		//     for (var key of this.fd.entries()) {
		//         console.log(key[0],key[1] ,"is the key there???");
		//     }
		// 		fetch('/api/NewChar', {
		// 			method: 'post',
		// 			//make sure to serialize your JSON body
		// 			body: JSON.stringify({
		// //  photo: this.fd,
		//   newName: this.state.newName,
		//   newCharDescription: this.state.newCharDescription
		// 			}),
		// 		})
		//   .then(res => res.text())
		//   .catch(err => {
		//     alert('failed')
		//   })
		// }
	}
	handleCancelTwitter = () => {
		this.setState({
			twitterName: '',
			inputLinkClicked: false,
		});
	};

	handleTwitterResponse = data => {
		console.log(data);
	};
	// onClick={this.setState({ inputLinkClicked:false })}
	componentDidMount() {}
	render() {
	  		if (this.state.active === true) {
    			return <Redirect to={'/AllChar'} />;
     		}
		return (
			<div
				style={{
					minHeight: '100%',
					minWidth: '100%',
					height: 'auto',
					width: 'auto',
				}}>
				<h2 className="heading-font">Create Your Character!</h2>
				<div
					// className="charcontainer"
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<div>
						<div
							// className="makeChar"
							style={{
								backgroundColor: '#1DA1F2',
								width: '300px',
								flex: '1',
								padding: '1em',
								height: '300px',
							}}>
							<h4 style={{ color: '#CCEEFF' }}>Twitter Character</h4>
							<input
								className=""
								value={this.state.twitterName}
								name="twitterName"
								onChange={this.handleChange}
								onKeyUp={this.handleEnterPressed}
								placeholder="Enter that person's twitter handle"
								type="text"
							/>
							{this.state.inputLinkClicked ? (
								<Popup
									trigger={<button className="button"> Submit </button>}
									modal
									// position="top center"
									closeOnDocumentClick>
									<Twitterpreview
										postChartoDB={this.props.postChartoDB}
										inputLinkClicked={this.state.inputLinkClicked}
										handleCancelTwitter={this.handleCancelTwitter}
										twitterName={this.state.twitterName}
										newImage={this.state.newImage}
									/>
								</Popup>
							) : null}
						</div>
					</div>
					<div>
						<div
							// className="makeChar"
							style={{
								backgroundColor: '#CCC',
								width: '300px',
								flex: '1',
								padding: '1em',
								height: '300px',
							}}>
							<h4 style={{ color: '#111111' }}>Base Character</h4>
							<form onSubmit={this.handleSubmit}>
								<input
									className=""
									name="newName"
									value={this.state.newName}
									onChange={this.handleChange}
									placeholder="Enter New Character's name"
									type="text"
								/>
								<div>
									<span
										style={{
											fontSize: '14px',
											height: '50%',
											color: '#111111',
										}}>
										Write a bit about your character
									</span>
								</div>
								<textarea
									className="textarea"
									name="newCharDescription"
									value={this.state.newCharDescription}
									onChange={this.handleChange}
								/>
								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										marginTop: '5px',
										marginBottom: '5px',
										flexDirection: 'column',
									}}>
									<div style={{ marginTop: '10px', marginBottom: '15px' }}>
										<input
											type="file"
											name="photo"
											className="photo"
											onChange={this.handleUpload}
										/>
									</div>

									<input
										type="submit"
										value="Submit"
										className="create-char-button"
										style={{ height: '40%', width: '40%' }}
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CreateCharacter;
