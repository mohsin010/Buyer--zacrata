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
import CategoryIcon from '@material-ui/icons/Category';
import BusinessIcon from '@material-ui/icons/Business';
import PhoneIcon from '@material-ui/icons/Phone';

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
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import axios from 'axios';

import styles1 from './myStyle.module.css';

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
    // height: "150px",
    // backgroundColor: "rgb(216, 214, 214)"

}



// const classes = useStyles();
// function HomePage() {
class CartPage extends React.Component {

    componentDidMount() {
        let ciphertext = window.sessionStorage.getItem('a#$s!');
        if (!ciphertext) {
            this.props.history.push('./login');
        } else {
            let bytes = CryptoJS.AES.decrypt(ciphertext, 'my-secret-key008899');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }

    }
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
            customerAddress: "Abdullah pur street 1 38000",
            customerno: '030445555555',
            totalamount: 0,
            setOpen: false,
            name: '',
            picture: '',
            desc: '',
            price: 0,
            category: '',
            unit: 'KG',
            checked: true,
            store_name: '',
            store_contact_number: '',
            store_address: '',
            store_image: '',
            store_type: '',

            products: [],
            coun: 0,
            open: false


        }
    }

    componentDidMount() {
        let ciphertext = window.sessionStorage.getItem('a#$s!');
        let order_id = window.sessionStorage.getItem('order_id');
        if (!ciphertext) {
            this.props.history.push('./login');
        } else {
            let bytes = CryptoJS.AES.decrypt(ciphertext, 'my-secret-key008899');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
        let count = window.sessionStorage.getItem('coun')
        this.setState({
            coun: count,
            open: true
        })
        debugger;
        let headers = {
            'authorization': `bearer ${decryptedData} `
        }
        let data = {
            type: 3
        }
        axios.get('https://api.zacarta.com/api/buyer/order?order_id=' + order_id, { headers: headers }).then(res => {
            this.setState({
                open:false
            })
            if (res.data.success == true) {
                this.setState({
                    products: res.data.data.items,
                    totalamount: res.data.data.order_total,
                    store_name: res.data.data.seller.store_name,
                    store_contact_number: res.data.data.seller.store_contact_number,
                    store_image: res.data.data.seller.store_image,
                    store_address: res.data.data.seller.store_address.address,
                    open:false
                    // store_name: res.data.data.store_name,


                })
                console.log(res.data.data)
            }
        }).catch(e => {
            // debugger;
            console.log(e)

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
            price: product.product.price,
            category: product.quantity,
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
    handleDelete = (event, index) => {

        let products = [...this.state.products]
        products.splice(index, 1);
        this.setState({ products: products })
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
                <Backdrop className={classes.backdrop} open={this.state.open} >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <div className={'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32'}>
                    <div className="flex flex-col items-center justify-center w-full" >
                        <FuseAnimate animation="transition.expandIn">
                            <Card className="w-full max-w-500" >
                                <CardContent className="flex flex-col " style={{ height: "100%" }}>
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
                                                                // image={picture}
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
                                                        value={this.state.category}
                                                        // onChange={this.handleQuantityChange}
                                                        SelectProps={{
                                                            native: true,
                                                        }}
                                                        type='text'

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
                                    <Card className={styles1.flexcontainer}>

                                        <div className={styles1.picture}><img src={'https://api.zacarta.com/' + this.state.store_image} /></div>
                                        <div className={styles1.tbldiv}>
                                            <table className={styles1.tbl}>
                                                <tbody>
                                                    <tr><td>

                                                        <th>{this.state.store_name.toUpperCase()}</th>
                                                    </td>
                                                    </tr>
                                                    <tr>
                                                        <td><BusinessIcon />{this.state.store_address}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><PhoneIcon />{this.state.store_contact_number}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    </Card>

                                    <div className={styles1.heading}>
                                        <h1 >Order Details</h1>
                                    </div>
                                    <div className={styles1.cartadd}>
                                        <TableContainer className={styles1.tblcontainer}>
                                            <Table stickyHeader aria-label="sticky table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell className={styles1.srno}>
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

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {this.state.products.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((product, index) => {

                                                        return (
                                                            <TableRow hover>
                                                                <TableCell>
                                                                    {index + 1}
                                                                </TableCell>
                                                                <TableCell className={styles1.propic} ><img src={"https://api.zacarta.com/" + product.product.image} /><div className={styles1.propicdiv}><div><div >{product.product.title}</div></div></div></TableCell>
                                                                {/* <TableCell>{product.price}</TableCell> */}
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
                                                                    {/* <Button onClick={(e) => {
                                                                        this.handleDelete(product, index)
                                                                    }}>
                                                                        <DeleteOutlineIcon />
                                                                    </Button> */}
                                                                    <Button variant="contained" size="small" color="primary" onClick={this.setProductDetails.bind(this, product)}>
                                                                        <PageviewIcon /> View
                                                            </Button>
                                                                </TableCell>


                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                                {/* <Typography className={styles1.addcontainer} > <h3>Total Amount:${this.state.totalamount}</h3></Typography> */}
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
                                        {/* <div className={styles1.addcontain}>
                                            <Card>
                                                <CardContent>
                                                    <Container maxWidth="sm" className={styles1.addmaincontainer} >


                                                        <Typography className={styles1.addcontainer} > <h2> Customer Contact Info</h2></Typography>
                                                        <Typography className={styles1.addcontainer} ><HomeIcon /> {this.state.customerAddress}</Typography>
                                                        <Typography className={styles1.addcontainer} >< PhoneIcon />{this.state.customerno}</Typography>

                                                    </Container>
                                                </CardContent>
                                            </Card>
                                            <div className={styles1.btns}>
                                                <div>

                                                    <Button variant="contained" color="primary"> <PhoneIcon /> Call Customer</Button>
                                                </div>
                                                <div>

                                                    <Button variant="contained" color="primary"><BorderColorIcon /> Confirm Order</Button>
                                                </div>
                                            </div>
                                        </div> */}
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