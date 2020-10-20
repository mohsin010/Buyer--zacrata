import FuseAnimate from '@fuse/core/FuseAnimate';
import { useForm } from '@fuse/hooks';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import StorefrontIcon from '@material-ui/icons/Storefront';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import Modal from '@material-ui/core/Modal';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PageviewIcon from '@material-ui/icons/Pageview';


import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import MenuItem from '@material-ui/core/MenuItem';
// import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Container from '@material-ui/core/Container';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import BorderColorIcon from '@material-ui/icons/BorderColor';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Button from '@material-ui/core/Button';
import { blue, green, red } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles1 from './myStyle.module.css';

import picture from '../../fall-glow-small.jpg'
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


const overMap = {
    position: "relative",
    // top: "90%",
    left: "1.7%",
    // border: "0.1px solid black",
    borderRadius: "5px",
    width: "97%",
    height: "150px",
    // backgroundColor: "rgb(216, 214, 214)"

}



// const classes = useStyles();
// function HomePage() {
class CartPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedStore: '',
            quantity: '',
            cart: [],
            quantities: 1,
            setRowsPerPage: 10,
            setPage: 0,
            page: 0,
            rowsPerPage: 10,
            store_address: "",
            store_contact: '',
            store_name: '',
            totalamount: 0,
            setOpen: false,
            respOpen: false,
            header: 'Order Placed',
            cardBody: 'Order Placed Successfully',
            name: '',
            picture: '',
            desc: '',
            price: 0,
            quantity: '',
            unit: '',
            cartEmpty: true,
            // store: {
            //     name: "imtiaz",
            //     location: { latitude: 31.452136, longitude: 73.070382 },
            //     data: { picture: picture, no: '+123456788', address: 'Abdullah pur street 1 38000', miles: '3.8', drive: '30 ' }
            // },

            products: [],
            coun: 0,
            order_id: '',
            open: false
        }
    }
    componentDidMount() {
        let ciphertext = window.sessionStorage.getItem('a#$s!');
        let store_id = window.sessionStorage.getItem('store_id');
        let category_id = window.sessionStorage.getItem('category_id');
        let count = window.sessionStorage.getItem('coun')
        this.setState({
            coun: count,
            open: true
        })
        if (!ciphertext) {
            this.props.history.push('./login');
        } else {
            let bytes = CryptoJS.AES.decrypt(ciphertext, 'my-secret-key008899');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
        debugger;
        let headers = {
            'authorization': `bearer ${decryptedData} `
        }
        axios.get('https://api.zacarta.com/api/buyer/cart', {
            headers: headers
        }).then(function (res) {
            this.setState({
                open:false
            })
            if (res.status == 200) {
                debugger;

                if (res.data.data.items.length != 0) {
                    debugger;
                    console.log(res.data)
                    this.setState({
                        store_address: res.data.data.seller.store_address.address,
                        store_name: res.data.data.seller.name,
                        store_contact: res.data.data.seller.store_contact_number,
                        totalamount: res.data.data.order_total,
                        products: res.data.data.items,
                        open: false
                    })
                } else {
                    this.setState({
                        cartEmpty: true,
                        open: false
                    })
                }

            }
        }.bind(this))
            .catch(e => {
                // debugger;
                // setErrMessage(!errMessage)
                console.log(e)
                this.setState({
                    open: false
                })
            })


    }

    handleCheckedChange = (event) => {
        this.setState({
            checked: event.target.checked
        })
    };
    handleChangePage = (e, page) => {
        // setPage(newPage);
        console.log(page)
        this.setState({
            page: page
        })
    };
    setProductDetails = (product, e) => {
        debugger;
        this.setState({
            name: product.product.title,
            picture: product.product.image,
            desc: product.product.description,
            price: product.price,
            quantity: product.quantity,
            unit: product.product.unit.title,
            setOpen: true
        })
        console.log(this.state.displayPictures)
    }
    handleOpen = () => {
        debugger;
        this.setState({
            setOpen: true
        })
    };

    handleClose = () => {
        this.setState({
            setOpen: false
        })
    };
    handleChangeRowsPerPage = (event) => {
        console.log(event.target.value)
        this.setState({
            setPage: 0,
            setRowsPerPage: +event.target.value,
            rowsPerPage: +event.target.value
        })
        // setRowsPerPage(+event.target.value);
        // setPage(0);
    };

    handleQuantityChange = (event) => {
        this.setState({
            quantity: event.target.value
        });
    }
    handleRespClose = () => {
        this.setState({
            respOpen: false
        })
        this.viewOrder()

    };
    viewOrder = () => {
        window.sessionStorage.setItem('order_id', this.state.order_id)
        this.props.history.push('/view-order')

    }
    handleDelete = (product, index, event) => {
        // console.log(product, index);
        let ciphertext = window.sessionStorage.getItem('a#$s!');
        // let store_id = window.sessionStorage.getItem('store_id');
        // let category_id = window.sessionStorage.getItem('category_id');
        if (!ciphertext) {
            this.props.history.push('./login');
        } else {
            let bytes = CryptoJS.AES.decrypt(ciphertext, 'my-secret-key008899');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
        this.setState({
            open: true
        })
        debugger;
        let headers = {
            'authorization': `bearer ${decryptedData} `
        }
        let data = {
            item: product._id
        }
        axios.put('https://api.zacarta.com/api/buyer/cart/removeFromCart', data, {
            headers: headers
        }).then(function (res) {
            this.setState({
                open:false
            })
            if (res.data.success != false) {
                debugger;
                console.log(res.data.data.items)
                let products = [...this.state.products]
                products.splice(index, 1);
                this.setState({
                    totalamount: res.data.data.order_total,
                    products: res.data.data.items,
                    open: false,
                    respOpen: true,
                    header: 'Product Deleted',
                    cardBody: 'Product is Deleted Successfully'
                })

            }
        }.bind(this))
            .catch(e => {
                // debugger;
                // setErrMessage(!errMessage)
                console.log(e)
                this.setState({
                    open: false
                })
            })


    }

    confirmOrder = () => {
        let ciphertext = window.sessionStorage.getItem('a#$s!');
        // let store_id = window.sessionStorage.getItem('store_id');
        // let category_id = window.sessionStorage.getItem('category_id');
        if (!ciphertext) {
            this.props.history.push('./login');
        } else {
            let bytes = CryptoJS.AES.decrypt(ciphertext, 'my-secret-key008899');
            var decryptedData1 = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
        this.setState({
            open: true
        })
        debugger;
        let headers1 = {
            'authorization': `bearer ${decryptedData1} `
        }

        axios.post('https://api.zacarta.com/api/buyer/order/', {}, {
            headers: headers1
        }).then(function (res) {
            this.setState({
                open:false
            })
            debugger;
            if (res.data.success != false) {
                console.log(res.data.data)
                this.setState({
                    totalamount: 0,
                    products: [],
                    respOpen: true,
                    order_id: res.data.data.order_id,
                    open: false,
                    header: 'Order Placed',
                    cardBody: 'Order is Placed Successfully'
                })
            } else {
                this.setState({
                    open: false,
                    respOpen: true,
                    header: 'Empty Cart',
                    cardBody: 'Your Cart is Empty'
                })
            }
        }.bind(this))
            .catch(e => {
                // debugger;
                // setErrMessage(!errMessage)
                this.setState({
                    open: false,
                    respOpen: true,
                    header: 'Error..!',
                    cardBody: 'There is an Error.'
                })
            })


    }


    classes = this.props

    render() {
        const { text, suggestions } = this.state;
        const { classes } = this.props
        const tblclasses = {
            class1: classes.container,
            class2: styles1.tblcontainer
        }


        return (
            <div className={classes.root}>

                <div className={'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32'} >
                    <div className="flex flex-col items-center justify-center w-full" >
                        <FuseAnimate animation="transition.expandIn">
                            <Card className="w-full max-w-500" >
                                <CardContent className="flex flex-col " style={{ minHeight: "80vh" }}>
                                    <Backdrop className={classes.backdrop} open={this.state.open} >
                                        <CircularProgress color="inherit" />
                                    </Backdrop>
                                    <Dialog
                                        open={this.state.respOpen}
                                        onClose={this.handleRespClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{this.state.header}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                {this.state.cardBody}
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
                                    <Dialog
                                        className={styles1.productdialog}
                                        open={this.state.setOpen}
                                        // onClose={this.handleerrClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{"Product Details"}</DialogTitle>
                                        <DialogContent>
                                            <Card className={styles1.abc}>
                                                <CardActionArea>
                                                    <CardContent >
                                                        <Typography gutterBottom variant="h5" component="h2" className={styles1.modaldes}>
                                                            {this.state.name}
                                                        </Typography>
                                                        <CardContent className={styles1.flextest}>
                                                            <CardMedia
                                                                className={this.classes.media, styles1.modalmedia}
                                                                // image={"https://api.zacarta.com/" + this.state.picture}
                                                                title="Contemplative Reptile"
                                                            >
                                                                <img className={styles1.proimage} src={"https://api.zacarta.com/" + this.state.picture} />

                                                            </CardMedia>
                                                            <Typography variant="body2" color="textSecondary" component="p" className={styles1.modaldes}>
                                                                {this.state.desc}
                                                            </Typography>
                                                        </CardContent>
                                                        <Typography variant="body2" color="textSecondary" component="p" className={styles1.modaldes}>
                                                            <b> {'Price: ' + this.state.price.toFixed(2)} </b>
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <TextField
                                                        label="Quantity"
                                                        disabled
                                                        className={styles1.dropdown}
                                                        value={this.state.quantity}
                                                        // onChange={this.handleQuantityChange}
                                                        SelectProps={{
                                                            native: true,
                                                        }}
                                                        type='Number'

                                                        // helperText="Please select your currency"
                                                        variant="outlined"
                                                    >
                                                    </TextField>
                                                    <TextField
                                                        label="Unit"
                                                        disabled
                                                        className={styles1.dropdown}
                                                        value={this.state.unit}
                                                        // onChange={this.handleWeightChange}
                                                        SelectProps={{
                                                            native: true,
                                                        }}
                                                        type='text'

                                                        // helperText="Please select your currency"
                                                        variant="outlined"
                                                    >
                                                    </TextField>
                                                </CardActions>
                                            </Card>
                                            <DialogActions>

                                                <Button onClick={this.handleClose} variant="contained" color="primary">
                                                    Close
                                              </Button>
                                            </DialogActions>
                                        </DialogContent>
                                    </Dialog>

                                    <div className={styles1.heading}>
                                        <h1 >Cart</h1>
                                    </div>
                                    <div className={styles1.cartadd}>
                                        <TableContainer className={styles1.tblcontainer}>
                                            <Table stickyHeader aria-label="sticky table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>
                                                            Sr.#
                                                        </TableCell>

                                                        <TableCell className={styles1.proname}>
                                                            Product Name
                                                    </TableCell>
                                                        <TableCell >
                                                            Weight
                                                         </TableCell>
                                                        <TableCell >
                                                            Unit
                                                         </TableCell>
                                                        <TableCell >
                                                            Price
                                                    </TableCell>
                                                        <TableCell >
                                                            Quantity
                                                    </TableCell>
                                                        {/* <TableCell >
                                                            Discount
                                                    </TableCell> */}
                                                        <TableCell >
                                                            View
                                                    </TableCell>
                                                        <TableCell >
                                                            Delete
                                                    </TableCell>

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {this.state.products.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((product, index) => {

                                                        return (
                                                            <TableRow hover>
                                                                <TableCell>
                                                                    {index + 1}
                                                                </TableCell>
                                                                <TableCell className={styles1.propic} ><img src={"https://api.zacarta.com/" + product.product.image} /><div className={styles1.propicdiv}><div><div >{product.product.name}</div></div></div></TableCell>
                                                                <TableCell>
                                                                    {product.product.weight}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {product.product.unit.title}
                                                                </TableCell>
                                                                <TableCell className={this.state.coun == 2 ? styles1.hidden : ''}>{"₹" + product.price.toFixed(2)}</TableCell>
                                                                <TableCell className={this.state.coun == 1 ? styles1.hidden : ''}>{"$" + product.price.toFixed(2)}</TableCell>

                                                                <TableCell>
                                                                    {product.quantity}
                                                                </TableCell>

                                                                {/* <TableCell>{product.discount}</TableCell> */}
                                                                <TableCell>
                                                                    <Button variant="contained" size="small" color="primary" onClick={this.setProductDetails.bind(this, product)}>
                                                                        <PageviewIcon /> View
                                                            </Button>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Button variant="contained" size="small" color="primary" onClick={this.handleDelete.bind(this, product, index)}>
                                                                        < DeleteIcon />
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                                <Typography className={this.state.coun == 1 ? styles1.hidden : styles1.addcontainer2} > <h3>Total: ${this.state.totalamount.toFixed(2)}</h3></Typography>
                                                <Typography className={this.state.coun == 2 ? styles1.hidden : styles1.addcontainer2} > <h3>Total: ₹{this.state.totalamount.toFixed(2)}</h3></Typography>


                                            </Table>
                                            <TablePagination
                                                rowsPerPageOptions={[10, 25, 100]}
                                                component="div"
                                                count={this.state.products.length}
                                                rowsPerPage={this.state.rowsPerPage}
                                                page={this.state.page}
                                                onChangePage={this.handleChangePage}
                                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                            />

                                        </TableContainer>
                                        <div className={styles1.addcontain}>
                                            <Card>
                                                <CardContent>
                                                    <Container maxWidth="sm" className={styles1.addmaincontainer} >


                                                        <Typography className={styles1.addcontainer} > <h2> Store Contact Info</h2></Typography>
                                                        <Typography className={styles1.addcontainer} ><HomeIcon /> {this.state.store_address}</Typography>
                                                        <Typography className={styles1.addcontainer} >< PhoneIcon />{this.state.store_contact}</Typography>

                                                    </Container>
                                                </CardContent>
                                            </Card>
                                            <div className={styles1.btns}>
                                                <div>

                                                    <Button variant="contained" color="primary" onClick={this.confirmOrder}><BorderColorIcon /> Confirm Order</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </FuseAnimate>
                    </div>
                </div>
            </div>
        );
    }
}
CartPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CartPage);