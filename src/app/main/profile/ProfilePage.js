import FuseAnimate from '@fuse/core/FuseAnimate';
import { useForm } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import EditIcon from '@material-ui/icons/Edit';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';
import PublishIcon from '@material-ui/icons/Publish';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles1 from './myStyle.module.css';
// import { styles } from '@material-ui/pickers/views/Calendar/Calendar';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
var CryptoJS = require("crypto-js");




const styles = theme => ({
	root: {
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
		color: theme.palette.primary.contrastText
	},

	highlight: {
		backgroundColor: 'red',
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	}
});


class ProfilePage extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			name: '',
			email: '',
			mobile: '',
			token: '',
			respOpen: false,
			hidden: true,
			open: false
		}
	}
	handleRespClose = () => {
		this.setState({
			respOpen: false,
		})
	}
	componentDidMount() {
		let token = window.sessionStorage.getItem('a#$s!');
		let _id = window.sessionStorage.getItem('_id');
		if (!token) {
			useHistory.push('./login');
		} else {
			let bytes = CryptoJS.AES.decrypt(token, 'my-secret-key008899');
			var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
		}
		this.setState({
			token: decryptedData,
			open: true
		})
		let headers = {
			'Authorization': `bearer ${decryptedData} `
		}
		let _user_info = {
			_user_id: _id
		}

		axios.put('https://api.zacarta.com/api/buyer/user', _user_info, {
			headers: headers
		}).then(res => {
			this.setState({
                open:false
            })
			if (res.status == 200) {
				this.setState({
					name: res.data.data.name,
					email: res.data.data.email,
					mobile: res.data.data.mobile,
					open: false
				})
				// id="outlined-search"
				document.getElementById('outlined-search').setAttribute('disabled', 'disabled')
				document.getElementById('outlined-basic').setAttribute('disabled', 'disabled')
				document.getElementById('inpt3').setAttribute('disabled', 'disabled')
			}
		}).catch(e => {
			debugger;
			this.setState({
				open: false
			})
			// setErrMessage(!errMessage)

		})
	}


	handleSubmit = (ev) => {
		ev.preventDefault();
		let headers = {
			'authorization': `bearer ${this.state.token} `
		}
		this.setState({
			open: true
		})
		let data = {
			name: this.state.name,
			email: this.state.email,
			mobile: this.state.mobile
		}

		axios.put('https://api.zacarta.com/api/buyer/user', data, {
			headers: headers
		}).then(res => {
			this.setState({
                open:false
            })
			if (res.status == 200) {
				this.setState({
					open: false,
					hidden:true,
					respOpen: true
				})

				document.getElementById('outlined-search').setAttribute('disabled', 'disabled')
				document.getElementById('outlined-basic').setAttribute('disabled', 'disabled')
				// document.getElementById('inpt3').setAttribute('disabled', 'disabled')

			}
		}).catch(e => {
			debugger;
			this.setState({
				open: false
			})
			// setErrMessage(!errMessage)

		})

		// resetForm();
	}
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	handleEdit = () => {

		document.getElementById('outlined-search').removeAttribute('disabled')
		document.getElementById('outlined-basic').removeAttribute('disabled')
		// document.getElementById('inpt3').removeAttribute('disabled')
		this.setState({
			hidden: false
		})

	}
	// export default function ControlledOpenSelect() {
	// const classes = useStyles();

	render() {
		const { classes } = this.props

		return (
			<div className={classes.root}>
				<Backdrop className={classes.backdrop} open={this.state.open} >
					<CircularProgress color="inherit" />
				</Backdrop>
				<div className={'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32'}>

					<div className="flex flex-col items-center  w-full" style={{ height: '100vh', marginTop: '3vh' }}>
						<FuseAnimate animation="transition.expandIn" style={{ height: '100vh' }}>
							<Card className="w-full max-w-500 "  >
								<Dialog
									open={this.state.respOpen}
									onClose={this.handleRespClose}
									aria-labelledby="alert-dialog-title"
									aria-describedby="alert-dialog-description"
								>
									<DialogTitle id="alert-dialog-title">{"Profile Updated"}</DialogTitle>
									<DialogContent>
										<DialogContentText id="alert-dialog-description">
											Profile is updated Successfully
                                        </DialogContentText>
									</DialogContent>
									<DialogActions>
										{/* <Link to='/seller-detail'> */}
										<Button onClick={this.handleRespClose} color="primary">
											Close
                                              </Button>
										{/* </Link> */}
									</DialogActions>
								</Dialog>
								{/* <CardContent className="flex flex-col items-center" style={{ height: "100%" }}> */}

								<CardContent  >
									{/* <img clas	sName="w-128 m-32" src="assets/images/logos/fuse.svg" alt="logo" /> */}

									{/* <Typography variant="h6"> */}
									<div className={styles1.heading}>
										<h1>Profile Settings</h1>
									</div>
									{/* </Typography> */}
									<div className={styles1.inp}>
										<form
											name="registerForm"
											noValidate
											className="flex flex-col justify-center w-full"
											style={{ height: '60vh' }}
										// onSubmit={this.handleSubmit}
										>
											<TextField
												className="mb-16"
												label="Full Name"
												// autoFocus
												type="search"
												name="name"
												value={this.state.name}
												onChange={this.handleChange}
												variant="outlined"
												required
												fullWidth
												id="outlined-search"
											// id="inpt"
											/>

											<TextField
												className="mb-16"
												label="Email"
												type="search"
												name="email"
												value={this.state.email}
												onChange={this.handleChange}
												variant="outlined"
												required
												fullWidth
												id="outlined-basic"
											// id="inpt2"

											/>
											<TextField
												className="mb-16"
												label="Mobile Number"
												type="numeric"
												name="number"
												value={this.state.mobile}
												onChange={this.handleChange}
												variant="outlined"
												required
												fullWidth
												id="inpt3"

											/>

											<Button
												onClick={this.handleSubmit}
												variant="contained"
												color="primary"
												className={this.state.hidden ? styles1.hidden : ''}
											// aria-label="Save"
											// disabled={!isFormValid()}
											// type="submit"
											>
												<SaveIcon />
									Save
								</Button>
											<Button
												onClick={this.handleEdit}
												variant="contained"
												color="primary"
												className={this.state.hidden ? '' : styles1.hidden}
											// aria-label="Save"
											// disabled={!isFormValid()}
											// type="submit"
											>
												<EditIcon />
									Edit
								</Button>


										</form>

									</div>
								</CardContent>
							</Card>
						</FuseAnimate>
					</div>
				</div>
			</div>
		)
	}
}

ProfilePage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfilePage);