import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import TextField from "@material-ui/core/TextField";

import {apiGetCall, apiPostCall} from './../services/network.js';
import ResCard from './resCard';

class Foodie extends React.Component {
    
  constructor(props) {
    super(props);
	
		this.state = {
			resData: [],
			loginModel: false,
			token: null,
			name: "",
			cuisines: "",
			booking: false,
			delivery: false,
			sorting: "rating-high-low",
			email: "",
			password: "",
			regEmail: "",
			regName: "",
			regPassword: ""
		};

		this.dataFetcher = this.dataFetcher.bind(this);
		this.handleChange = this.handleChange.bind(this);
  }

	handleChange(whichOne, event){
		this.setState({ 
			[whichOne] : event.target.value,
			resData: []
		}, this.dataFetcher);
	};
	
	handleLoginChange(whichOne, event){
		this.setState({ 
			[whichOne] : event.target.value,
		});
	};

	dataFetcher(){
			
		var url = "/restaurants?sorting="+this.state.sorting+"&"
		
		if(this.state.name.trim() !== "")
			url += "name="+this.state.name.trim()+"&"
		
		if(this.state.cuisines.trim() !== "")
			url += "cuisines="+this.state.cuisines.trim()+"&"
		
		if(this.state.delivery)
			url += "delivery=1&"
		
		if(this.state.booking)
			url += "booking=1&"
		
		var successCallback = function(result){
				
			this.setState({
				resData: result
			})
		}.bind(this)

		var errorCallback = function(error){
			console.log(error);   
		}
			
		apiGetCall(url, successCallback, errorCallback);
	}


	async componentDidMount(){
		let token = await localStorage.getItem('token');
		console.log(token)
		this.setState({
			token: token
		})
		
		this.dataFetcher();   
	}
	
	async userLogout(){
		await localStorage.removeItem("token");
		this.setState({
			token: null
		})
	}
	
	userLogin(){
		var successCallback = function(result){
			localStorage.setItem("token", result.token);
			this.setState({
				token: result.token,
				loginModel: false
			})
		}.bind(this)

		var errorCallback = function(error){
			console.log(error);   
		}
			
		var data = {
			'email': this.state.email,
			'password': this.state.password
		}
		apiPostCall('/login', data, successCallback, errorCallback);
	}
	
	userRegister(){
		var successCallback = function(result){
			this.setState({
				loginModel: false
			})
		}.bind(this)

		var errorCallback = function(error){
			console.log(error);   
		}
			
		var data = {
			'email': this.state.regEmail,
			'password': this.state.regPassword,
			'name': this.state.regName
		}
		apiPostCall('/register', data, successCallback, errorCallback);
	}

	render() {
		return (
			<div>
				<div className="nav-root">
					<AppBar position="static">
						<Toolbar variant="dense">
							<Typography variant="title" color="inherit">
								Food Finder
							</Typography>
							<div className="app-search">
								<InputBase 
									placeholder="Search…"
									value={this.state.name}
									onChange={(event)=>this.handleChange('name', event)}
								/>
							</div>
							<div className="nav-heading">
							</div>
							{
								this.state.token !== null ? (
									<Button color="inherit" onClick={() => {this.userLogout()}}>LOGOUT</Button>
								) : (
									<Button color="inherit" onClick={() => {this.setState({loginModel: true})}}>LOGIN</Button>
								)
							}
						</Toolbar>
					</AppBar>
				</div>
				<div>
					<Grid container spacing={0}>
						<Grid item xs={1}>
						</Grid>
						<Grid item xs={2}>
							<Paper className="each-res filter-paper" elevation={1}>
								<Typography component="title">FILTERS</Typography>
							</Paper>
							<Paper className="each-res filter-paper" elevation={1}>
								<Typography component="title">CUISINES:</Typography>
								<FormControl>
									<InputBase 
										placeholder="Cuisines…"
										value={this.state.cuisines}
										onChange={(event)=>this.handleChange('cuisines', event)}
									/>
								</FormControl>
							</Paper>
							<Paper className="each-res filter-paper" elevation={1}>
								<Typography component="title">SORT:</Typography>
								<FormControl>
									<Select
										value={this.state.sorting}
										onChange={(event)=>this.handleChange('sorting', event)}
									>
										<MenuItem value={"cost-low-high"}>Cost Low to High</MenuItem>
										<MenuItem value={"cost-high-low"}>Cost High to Low</MenuItem>
										<MenuItem value={"rating-high-low"}>Rating High to Low</MenuItem>
										<MenuItem value={"votes-high-low"}>Votes High to Low</MenuItem>
									</Select>
								</FormControl>
							</Paper>
							<Paper className="each-res filter-paper" elevation={1}>
								<Typography component="title">TABLE BOOKING:</Typography>
								<Switch
									checked={this.state.booking}
									onChange={(event) => this.handleChange('booking', event)}
									value="booking"
								/>
								<Typography component="title">HOME DELIVERY:</Typography>
								<Switch
									checked={this.state.delivery}
									onChange={(event) => this.handleChange('delivery', event)}
									value="delivery"
								/>
							</Paper>
							
						</Grid>
						<Grid item xs={5}>
							<Paper className="each-res filter-paper" elevation={1}>
								<Typography component="title">TOTAL {this.state.resData.length} results</Typography>
							</Paper>
							
						{
              this.state.resData.map((value, key) => (
                <ResCard 
									key={"res"+key}
									data={value}
                />
              ))
						}
						</Grid>
					</Grid>	
				</div>
				<div>
					<Dialog
						open={this.state.loginModel}
						onClose={() => {this.setState({loginModel: false})}}
					>
						<DialogContent>
							<div id="login-model">
								<Grid container spacing={8}>
									<Grid item xs={6}>
										<div>
											<Typography variant="h5" className="text-left">LOGIN</Typography>
										</div>
										<div>
											<TextField
												fullWidth
												id="login-email"
												label="Email"
												value={this.state.email}
												onChange={(event) => this.handleLoginChange("email", event)}
												margin="normal"
												variant="outlined"
											/>
										</div>
										<div>
											<TextField
												fullWidth
												id="login-password"
												label="Password"
												type="password"
												value={this.state.password}
												onChange={(event) => this.handleLoginChange("password", event)}
												margin="normal"
												variant="outlined"
											/>
										</div>
										<div id="login-btn">
											<Button
												fullWidth
												variant="outlined"
												color="primary"
												onClick={() => {
													this.userLogin();
												}}
											>
												LOGIN
											</Button>
										</div>
									</Grid>
									<Grid item xs={6}>
										<div>
											<Typography variant="h5" className="text-left">REGISTER</Typography>
										</div>
										<div>
											<TextField
												fullWidth
												id="login-email"
												label="Email"
												value={this.state.regEmail}
												onChange={(event) => this.handleLoginChange("regEmail", event)}
												margin="normal"
												variant="outlined"
											/>
										</div>
										<div>
											<TextField
												fullWidth
												id="login-name"
												label="Name"
												value={this.state.regName}
												onChange={(event) => this.handleLoginChange("regName", event)}
												margin="normal"
												variant="outlined"
											/>
										</div>
										<div>
											<TextField
												fullWidth
												id="login-password"
												label="Password"
												type="password"
												value={this.state.regPassword}
												onChange={(event) => this.handleLoginChange("regPassword", event)}
												margin="normal"
												variant="outlined"
											/>
										</div>
										<div id="login-btn">
											<Button
												fullWidth
												variant="outlined"
												color="primary"
												onClick={() => {
													this.userRegister();
												}}
											>
												REGISTER
											</Button>
										</div>
									</Grid>
								</Grid>
							</div>
						</DialogContent>
					</Dialog>
				</div>
			</div>
		);
	}
}

export default Foodie;