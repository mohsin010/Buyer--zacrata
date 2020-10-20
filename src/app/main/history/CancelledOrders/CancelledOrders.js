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
import PageviewIcon from '@material-ui/icons/Pageview';



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
import Cookies from 'js-cookie';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

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
    // left: "1%",
    border: "0.1px solid black",
    borderRadius: "5px",
    width: "97%",
    height: "110px",
    backgroundColor: "rgb(216, 214, 214)"

}



// const classes = useStyles();
// function HomePage() {
class CancelledOrders extends React.Component {

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

            orders: [],
            coun: 0,
            open:false
        }
    }
    componentDidMount() {
        let ciphertext = window.sessionStorage.getItem('a#$s!');
        if (!ciphertext) {
            this.props.history.push('./login');
        } else {
            let bytes = CryptoJS.AES.decrypt(ciphertext, 'my-secret-key008899');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
        debugger;
        let count = window.sessionStorage.getItem('coun')
        this.setState({
            coun: count,
            open: true
        })
        let headers = {
            'authorization': `bearer ${decryptedData}`
        }
        let data = {
            type: 3
        }
        axios.get('https://api.zacarta.com/api/buyer/order/getAllOrders?type=3', { headers: headers }).then(res => {
            this.setState({
                open:false
            })
            if (res.data.success == true) {
                this.setState({
                    orders: res.data.data,
                    open: false
                })
            }
        }).catch(e => {
            // debugger;
            console.log(e)
            this.setState({
                open: false
            })

        })

    }
    handleChangePage = (page) => {
        // setPage(newPage);
        console.log(page)
        this.setState({
            setPage: +0.01
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
        // this.setState({

        // })
        let products = [...this.state.products]
        products.splice(index, 1);
        this.setState({ products: products })
        // debugger; 
        // console.log(event, index)
    }
    viewOrder = (order, e) => {
        if (order) {
            Cookies.remove('flag')
            window.sessionStorage.setItem('order_id', order)
            this.props.history.push('/view-order')
        }

    }


    render() {
        const { text, suggestions } = this.state;
        const { classes } = this.props


        return (
            <div className={classes.root}>
                <Backdrop className={classes.backdrop} open={this.state.open} >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <div className={'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32'}>
                    <div className="flex flex-col items-center justify-center w-full" >
                        <FuseAnimate animation="transition.expandIn">
                            <Card className="w-full max-w-500" >
                                <CardContent className="flex flex-col items-center" style={{ height: "100%" }}>


                                    <div className={styles1.heading}>
                                        <h1 >Cancelled Orders</h1>
                                    </div>
                                    <TableContainer className={classes.container}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell >
                                                        {/* <FontAwesomeIcon icon={["fas", "coffee"]} /> */}
                                                        OrderId
                                                    </TableCell>
                                                    <TableCell className={styles1.proname}>
                                                        Store Name
                                                    </TableCell>

                                                    <TableCell >
                                                        Price
                                                    </TableCell>
                                                    <TableCell >
                                                        Quantity
                                                    </TableCell>
                                                    <TableCell >
                                                        Phone No
                                                    </TableCell>
                                                    <TableCell >
                                                        Date
                                                    </TableCell>
                                                    <TableCell >
                                                        View
                                                    </TableCell>
                                                    {/* {this.columns.map((column) => (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                            style={{ minWidth: column.minWidth }}
                                                        >
                                                            {column.label}
                                                        </TableCell>
                                                    ))} */}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.orders.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((order, index) => {
                                                    //    this.setState({
                                                    //        quantity: product.quantity
                                                    //    })
                                                    return (
                                                        <TableRow hover>
                                                            <TableCell>{order.order_id}</TableCell>
                                                            <TableCell className={styles1.propic} ><img src={"https://api.zacarta.com/" + order.seller.store_image} /><div className={styles1.propicdiv}><div><div >{order.seller.store_name}</div><div>{order.seller.store_address.address}</div></div></div></TableCell>
                                                            {/* <TableCell>{order.order_total}</TableCell> */}
                                                            <TableCell className={this.state.coun == 2 ? styles1.hidden : ''}>{"₹" + order.order_total.toFixed(2)}</TableCell>
                                                            <TableCell className={this.state.coun == 1 ? styles1.hidden : ''}>{"$" + order.order_total.toFixed(2)}</TableCell>

                                                            <TableCell>
                                                                {order.totalProducts}
                                                            </TableCell>
                                                            <TableCell>
                                                                {order.seller.store_contact_number}
                                                            </TableCell>
                                                            <TableCell>
                                                                {(new Date(order.end_time)).toLocaleDateString()}
                                                            </TableCell>
                                                            <TableCell  >
                                                                <Button variant="contained" size="small" color="primary" onClick={this.viewOrder.bind(this, order.order_id)}>
                                                                    <PageviewIcon />  View Order
                                                                </Button>
                                                            </TableCell>

                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[10, 25, 100]}
                                        component="div"
                                        count={this.state.orders.length}
                                        rowsPerPage={this.state.rowsPerPage}
                                        page={this.state.page}
                                        onChangePage={(e) => { this.handleChangePage(this.state.page) }}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />

                                </CardContent>
                            </Card>
                        </FuseAnimate>
                    </div>
                </div>
            </div>
        );
    }
}
CancelledOrders.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CancelledOrders);