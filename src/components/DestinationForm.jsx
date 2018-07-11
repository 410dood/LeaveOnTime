

//  NOT DONE _ DONT USE


import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import {
	Container,
	Row,
	Col,
	Button,
	Form,
	FormGroup,
	Input
} from 'reactstrap';

class DestinationForm extends Component {
	constructor() {
		super()
		this.state = {
			location: "",
			length: '',
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit(event) {
		event.preventDefault()
		// TODO - validate!
		axios
			.post('/auth/destination', {
				dest_title: this.state.title,
				dest_add: this.state.address,
				dest_city: this.state.city,
				dest_state: this.state.state,
				dest_zipcode: this.state.zipcode,
				dest_time: this.state.time

			})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('youre good')
					this.setState({
						redirectTo: '/profile'
					})
				} else {
					console.log('duplicate')
				}
			})
	}
	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
		return (
			<div className="DestinationForm">
				{/* <h1>Destination form</h1>
				<label htmlFor="username">Username: </label>
				<input
					type="text"
					name="username"
					value={this.state.username}
					onChange={this.handleChange}
				/>
				<label htmlFor="password">Password: </label>
				<input
					type="password"
					name="password"
					value={this.state.password}
					onChange={this.handleChange}
				/>
				<label htmlFor="confirmPassword">Confirm Password: </label>
				<input
					type="password"
					name="confirmPassword"
					value={this.state.confirmPassword}
					onChange={this.handleChange}
				/>
				<button onClick={this.handleSubmit}>Sign up</button>
			</div> */}

				<div className="DestinationForm" onSubmit={this.onFormSubmit}>
					<Row className="justify-content-center">
						<FormGroup>
							<Col sm="12">
								<Input
									className="locwide"
									type="locname"
									name="location"
									id="dest_title"
									placeholder="Name your destination"
									value={this.state.title}
									onChange={this.onInputChange}
								/>
							</Col>
						</FormGroup>
					</Row>
					<Row className="justify-content-center">
						<FormGroup>
							<Col sm="12">
								<Input
									className="locwide"
									type="address"
									name="dest_add"
									id="dest_add"
									value={this.state.address}
									placeholder="Street address"
									autocomplete="address-line1"
								/>
							</Col>
						</FormGroup>
					</Row>
					<Row>
						<FormGroup>
							<Col sm={{ size: 12, order: 2, offset: 1 }}>
								<Input
									type="city"
									name="dest_city"
									id="dest_city"
									placeholder="City"
									value={this.state.city}
									autocomplete="address-level2"
								/>
							</Col>
						</FormGroup>
						<Col sm={{ size: 5, order: 2, offset: 0 }}>
							<FormGroup>
								<Input type="select" name="dest_state" id="dest_state" value={this.state.state}>
									<option>State</option>
									<option>Alabama</option>
									<option>Alaska</option>
									<option>Arizona</option>
									<option>Arkansas</option>
									<option>California</option>
									<option>Colorado</option>
									<option>Connecticut</option>
									<option>Delaware</option>
									<option>District of Columbia</option>
									<option>Florida</option>
									<option>Georgia</option>
									<option>Hawaii</option>
									<option>Idaho</option>
									<option>Illinois</option>
									<option>Indiana</option>
									<option>Iowa</option>
									<option>Kansas</option>
									<option>Kentucky</option>
									<option>Louisiana</option>
									<option>Maine</option>
									<option>Maryland</option>
									<option>Massachusetts</option>
									<option>Michigan</option>
									<option>Minnesota</option>
									<option>Michigan</option>
									<option>Minnesota</option>
									<option>Mississippi</option>
									<option>Missouri</option>
									<option>Montana</option>
									<option>Nebraska</option>
									<option>Nevada</option>
									<option>New Hampshire</option>
									<option>New Jersey</option>
									<option>New Mexico</option>
									<option>New York</option>
									<option>North Carolina</option>
									<option>North Dakota</option>
									<option>Ohio</option>
									<option>Oklahoma</option>
									<option>Oregon</option>
									<option>Pennsylvania</option>
									<option>Rhode Island</option>
									<option>South Carolina</option>
									<option>South Dakota</option>
									<option>Tennessee</option>
									<option>Texas</option>
									<option>Utah</option>
									<option>Vermont</option>
									<option>Virginia</option>
									<option>Washington</option>
									<option>West Virginia</option>
									<option>Wisconsin</option>
									<option>Wyoming</option>
								</Input>
							</FormGroup>
						</Col>
					</Row>
					<Row className="justify-content-center">
						<FormGroup>
							<Col sm={{ size: 8, offset: 1 }}>
								<Input
									type="zip"
									name="dest_zip"
									id="dest_zip"
									placeholder="Zip Code"
									autocomplete='postal-code'
								/>
							</Col>
						</FormGroup>
						<FormGroup>
							<Col sm={{ size: 12, offset: 0 }}>
								<Input
									type="time"
									name="dest_time"
									id="dest_time"
								/>
							</Col>
						</FormGroup>
					</Row>
					<Row className="justify-content-center">
						<FormGroup check row>
							<Col sm={{ size: 10 }}>
							<button onClick={this.handleSubmit}>Submit</button>
                 </Col>
						</FormGroup>
					</Row>
				</div>
			</div>
		)
	}
}

export default DestinationForm


