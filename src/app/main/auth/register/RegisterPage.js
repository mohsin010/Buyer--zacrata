import FuseAnimate from '@fuse/core/FuseAnimate';
import { useForm } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import MuiPhoneNumber from 'material-ui-phone-number';
import firebase from '../login/firebase-config';


import Alert from '@material-ui/lab/Alert';
import style1 from './mystyle.module.css';

import axios from 'axios';


const style = theme => ({
	root: {
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
		color: theme.palette.primary.contrastText
	}
});

const mystyle = {
	marginLeft: "15%",
	textDecoration: 'none'

}
class RegisterPage extends React.Component {



	constructor(props) {
		super(props);

		this.state = {
			setOpen: false,
			errMessage: true,
			dialogTitle: '',
			dialogBody: '',
			btnNameL: 'Close',
			email: '',
			number: "",
			name: '',

		}
	}

	handleSubmit = (e) => {
		let data = new FormData();
		data.append('name', this.state.name)
		data.append('email', this.state.email)
		data.append('mobile', this.state.number)
		e.preventDefault();
		var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
		var number = this.state.number;
		debugger;
		firebase.auth().signInWithPhoneNumber(number, recaptcha).then((e) => {
			var code = prompt('Enter the otp', '');


			if (code === null) return;


			e.confirm(code).then((result) => {
				console.log(result.user);
				debugger;


				// () => {
				const headers = {
					'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
					// 'Access-Control-Allow-Origin': 'http://localhost:5000'
				}

				axios.post('https://api.zacarta.com/api/buyer/auth/register', data, {
					headers: headers
				}).then(res => {
					debugger;
					if (res.status == 200) {
						this.setState({
							setOpen: true,
							dialogBody: 'Regestration is Successfull',
							dialogTitle: 'Registered',
							name: '',
							email: '',
							number: ''
						});
						this.props.history.push('/login')
					}
				}).catch(e => {
					debugger;
					this.setState({
						setOpen: true,
						dialogBody: 'Phone Number is Already Registered',
						dialogTitle: 'Error !',

					})
					
				})
				// }
			}).catch(function (error) {
				// this.setState({
				// 	errMessage: false
				// })
				console.error(error);

			});

		})
			.catch(function (error) {
				console.error(error);

			});

	}

	handleNumberChange = (e) => {
		let num = e.replace(/(?!\w|\s)./g, '')
			.replace(/\s+/g, ' ')
			.replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2');
		let num2 = num.replace(/\s/g, "");
		num2 = "+" + num2
		// num2 = num2.split(" ")
		debugger;
		this.setState({
			number: num2
		})
	}
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	};

	handleClose = () => {
		// setOpen(false);
		this.setState({
			setOpen: false
		})
	};

	handleOpen = () => {
	};

	classes = this.props

	render() {

		const { classes } = this.props

		return (
			<div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32')}>
				<div className="flex flex-col items-center justify-center w-full">
					<FuseAnimate animation="transition.expandIn">
						<Card className="w-full max-w-384">
							<CardContent className="flex flex-col items-center justify-center p-32">
								{/* <img clas	sName="w-128 m-32" src="assets/images/logos/fuse.svg" alt="logo" /> */}

								<Dialog
									open={this.state.setOpen}
									onClose={this.handleClose}
									aria-labelledby="alert-dialog-title"
									aria-describedby="alert-dialog-description"
								>
									<DialogTitle id="alert-dialog-title">{this.state.dialogTitle}</DialogTitle>
									<DialogContent>
										<DialogContentText id="alert-dialog-description">
											{this.state.dialogBody}
										</DialogContentText>
									</DialogContent>
									<DialogActions>
										{/* <Link to='/seller-detail'> */}
										<Button onClick={this.handleClose} color="primary">
											Close
                                              </Button>
										{/* </Link> */}
									</DialogActions>
								</Dialog>
								<Typography variant="h6" className="mt-16 mb-32">
									CREATE AN ACCOUNT
							</Typography>
								<Alert className={this.state.errMessage ? style1.hide : style1.view} severity="error">OTP is Invalid..!</Alert>
								<div id="recaptcha" className={style1.recp}></div>

								<form
									name="registerForm"
									noValidate
									className="flex flex-col justify-center w-full"
									onSubmit={this.handleSubmit}
								>
									<TextField
										className="mb-16"
										label="Full Name"
										autoFocus
										type="search"
										name="name"
										id="outlined-search"
										value={this.state.name}
										onChange={this.handleChange}
										variant="outlined"
										required
										fullWidth
									/>
									{/* <MuiPhoneInput
										defaultCountry='it'
										regions={'europe'}
									/> */}
									<MuiPhoneNumber defaultCountry={'us'} onChange={this.handleNumberChange}
										onlyCountries={['in', 'us']}
										variant="outlined"
										required
										fullWidth
										className="mb-16"
										label="Mobile Number"
										name="number"

									/>
									{/* <TextField
										className="mb-16"
										label="Mobile Number"
										type="numeric"
										name="number"
										value={this.state.number}
										onChange={this.handleChange}
										variant="outlined"
										required 
										fullWidth
									/> */}
									{/* <TextField
										className="mb-16"
										label="Email"
										// type="text"
										name="email"
										value={this.state.email}
										onChange={this.handleChange}
										// variant="outlined"
										required
									// fullWidth
									/> */}

									<TextField
										className="mb-16"
										label="Email"
										// autoFocus
										type="search"
										id="outlined-search"
										name="email"
										value={this.state.email}
										onChange={this.handleChange}
										variant="outlined"
										required
										fullWidth
									/>
									{/* <Link to="/login" style={mystyle}> */}
									<Button
										variant="contained"
										color="primary"
										className="w-224 mx-auto mt-16"
										aria-label="Register"
										// disabled={!isFormValid()}
										type="submit"
									>

										CREATE AN ACCOUNT
								</Button>
									{/* </Link> */}
								</form>

								<div className="flex flex-col items-center justify-center pt-32 pb-24">
									<span className="font-medium">Already have an account?</span>
									<Link className="font-medium" to="/login">
										Login
								</Link>
								</div>
							</CardContent>
						</Card>
					</FuseAnimate>
				</div>
			</div>
		);
	}
}

RegisterPage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(style)(RegisterPage);