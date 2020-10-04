import React, { Component } from "react";
import { connect } from 'react-redux'
import moment from 'moment'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { add_reminder, remove_reminder, clear_reminder } from './Actions/actions'

import logo from "./images/1.png"

class App extends Component {
	state = {
		text: "",
		date: new Date()
	}

	render_reminders = () => {
		const { reminders } = this.props 
		return (
			<ul className="list-group">
				{
					reminders.map(reminder => {
						return (
							<li key={reminder.id} className="list-group-item text-left" >
								<p >{reminder.text}</p>
								<p>{moment(reminder.date).fromNow()}</p>
								<p className="btn btn-danger" onClick={() => this.props.remove_reminder(reminder.id)}>x</p>
					        </li>
						)
					})
				}
			</ul>
		)
	}

	render() {
		return (
			<div className="App">
				<div className="container">
					<div div className = "img text-center" >
					    <img className="" src={logo} alt="..." />
					</div>
					<div className="title">
						<h2 className="text-center">what should you do ?</h2>
					</div>
					<input
						className="form-control"
						type="text"
						value={this.state.text}
						placeholder="Enter what you think ..."
						onChange={(e) => this.setState({text: e.target.value})}
					/>
					<DatePicker
						className="form-control input2 w-100 "
						placeholder="Enter Date ..."
						value={this.state.date}
						selected={this.state.date}
						onChange={(date) => this.setState({date})}
						showTimeSelect
						timeFormat="HH:mm"
						dateFormat="MMMM d, yyyy, h:mm aa"
						timeCaption="time"
					/>
					{/* <input
						type="datetime-local"
						onChange={(e) => this.setState({date: e.target.value})}
							 
					/> */}
					<button
						className="btn btn-primary w-100"
						onClick={() => {
							this.props.add_reminder(this.state.text, this.state.date)
							this.setState({text: "", date: ""})
						}}
					>Add Reminder</button>
					{
						this.render_reminders()
					}
					<button className="btn btn-danger w-100" onClick={() => { this.props.clear_reminder() }}>Clear Reminders</button>
				</div>
			</div>
		);
	}
}

// function mapDispatchToProps() {
// 	return {
// 		add_reminder : () => dispatchEvent(add_reminder())
// 	}
// }

// function mapStateToProps(state) {
// 	return {
		
// 	}
// }

export default connect(
	state => { return { reminders: state } },
	{ add_reminder, remove_reminder, clear_reminder }
)(App);
