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
import PersonIcon from '@material-ui/icons/Person';
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
import Cookies from 'js-cookie';

import styles1 from './myStyle.module.css';

import picture from '../../fall-glow-small.jpg'


const styles = theme => ({
    root: {
        background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
        color: theme.palette.primary.contrastText
    },

    highlight: {
        backgroundColor: 'red',
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
class ViewOrderPage extends React.Component {

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
            respOpen: false,
            respTitle: "",
            respBody: "",
            customer_name: "",
            customerno: '',
            totalamount: '',
            setOpen: false,
            hidden: false,
            name: '',
            picture: '',
            desc: '',
            price: '',
            category: '',
            unit: '',
            checked: true,
            buyer: {},
            totalamount: '',
            markedItems: [],
            products: [],
            coun: 0

        }
    }

    componentDidMount() {
        let token = Cookies.get('a#$s!');
        let order_id = Cookies.get('order_id');
        let flag = Cookies.get('flag')
        let hidden = true
        if (flag == 1) {
            hidden = false
        }
        if (!token) {
            this.props.history.push('./login');
        }
        let count = window.sessionStorage.getItem('coun')
        this.setState({
            coun: count
        })
        debugger
        let headers = {
            'Authorization': `bearer ${token}`
        }
        axios.get('https://api.zacarta.com/api/seller/order?order_id=' + order_id, {
            headers: headers
        }).then(res => {
            debugger
            if (res.data.success == true) {
                let productIds = []
                for (let i = 0; i < res.data.data.items.length; i++) {
                    productIds.push(res.data.data.items[i].product._id)
                    console.log(res.data.data.items[i].product._id)
                }
                this.setState({
                    hidden: hidden,
                    products: res.data.data.items,
                    customer_name: res.data.data.buyer.name,
                    customerno: res.data.data.buyer.mobile,
                    totalamount: res.data.data.order_total,
                    markedItems: productIds
                })

            }
        }).catch(e => {
            console.log(e)
        })
    }

    confirmOrder = () => {
        let token = Cookies.get('a#$s!');
        let order_id = Cookies.get('order_id');
        if (!token) {
            this.props.history.push('./login');
        }
        let headers = {
            'Authorization': `bearer ${token}`
        }
        let newitem = "";
        for (let i = 0; i < this.state.markedItems.length; i++) {
            newitem = newitem.concat("," + [this.state.markedItems[i]])
            console.log(newitem)
        }
        let newStr = newitem.substr(1)
        // let newStr = this.state.markedItems
        // let newArr = JSON.stringify(newStr)

        let data = {
            markedItems: newStr,
            order_id: order_id
        }
        debugger
        axios.put('https://api.zacarta.com/api/seller/order/packOrder', data, {
            headers: headers
        }).then(res => {
            debugger
            if (res.data.success == true) {
                this.setState({
                    respOpen: true,
                    respTitle: "Order Packed",
                    respBody: "Order Status is Packed Successfully"
                })

            } else {
                this.setState({
                    respOpen: true,
                    respTitle: "Error...!",
                    respBody: "There is an Error. Please Try Again"
                })
            }
        }).catch(e => {
            this.setState({
                respOpen: true,
                respTitle: "Error...!",
                respBody: "There is an Error. Please Try Again"
            })
        })

        axios.put('https://api.zacarta.com/api/seller/order/manageOrderStatus', { order_id: order_id }, {
            headers: headers
        }).then(res => {
            debugger
            if (res.data.success == true) {
                console.log(res.data.success)
            }
        }).catch(e => {
            console.log(e)

        })

    }
    handleRespClose = () => {
        this.setState({
            respOpen: false
        })
    }
    handleCheckedChange = (index, event) => {
        if (event.target.checked == true) {
            this.setState({
                markedItems: [...this.state.markedItems, event.target.value]
            })
        } else if (event.target.checked == false) {
            // let index = this.state.markedItems.indexOf(event.target.value)
            let markedItems = [...this.state.markedItems]
            markedItems.splice(index, 1);
            this.setState({ markedItems: markedItems })

        }
        // this.setState({
        //     checked: event.target.checked
        // })
        console.log(this.state.markedItems, event.target.checked)
    };
    checkArray = () => {
        console.log(this.state.markedItems)
    }
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
            // category: product.category.title,
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

                <div className={'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32'}>
                    <div className="flex flex-col items-center justify-center w-full" >
                        <FuseAnimate animation="transition.expandIn">
                            <Card className="w-full max-w-500" >
                                <CardContent className="flex flex-col " style={{ height: "100%", minHeight: "80vh" }}>
                                    <Dialog
                                        open={this.state.respOpen}
                                        onClose={this.handleRespClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{this.state.respTitle}</DialogTitle>
                                        <DialogContent>
                                            {this.state.respBody}
                                        </DialogContent>
                                        <DialogActions>
                                            <Button variant="contained" color="primary" onClick={this.handleRespClose}>
                                                Close
                                            </Button>
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
                                                                image={picture}
                                                                title="Contemplative Reptile"
                                                            >
                                                                {/* <img src={picture} /> */}

                                                            </CardMedia>
                                                            <Typography variant="body2" color="textSecondary" component="p" className={styles1.modaldes}>
                                                                {this.state.desc}
                                                            </Typography>
                                                        </CardContent>
                                                        <Typography variant="body2" color="textSecondary" component="p" className={styles1.modaldes}>
                                                            <b> {'Price: ' + this.state.price} </b>
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <TextField
                                                        label="Category"
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
                                    {/* <Card className={styles1.overMap}>
                                        <CardContent>


                                            <div className={styles1.flexcontainer}>

                                                <div className={styles1.picture}><img src={this.state.store.data.picture} /></div>
                                                <div className={styles1.tbldiv}>
                                                    <table className={styles1.tbl}>
                                                        <tbody>
                                                            <tr><td>

                                                                <th>{this.state.store.name.toUpperCase()}</th>
                                                            </td>
                                                            </tr>
                                                            <tr>
                                                                <td>{this.state.store.data.address}</td>
                                                            </tr>
                                                           
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className={styles1.btn}>
                                                    <Link to="/new-orders" className={styles1.btnlink}>
                                                        <Button variant="contained" color="primary" >
                                                            <KeyboardBackspaceIcon />Back to Orders
                                                    </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card> */}
                                    <div className={styles1.heading}>
                                        <h1 >Order Details</h1>
                                    </div>
                                    <div className={styles1.cartadd}>
                                        <TableContainer className={styles1.tblcontainer}>
                                            <Table stickyHeader aria-label="sticky table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell className={styles1.proname}>
                                                            Select
                                                        </TableCell>

                                                        <TableCell >
                                                            Product Name
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
                                                                    <Checkbox
                                                                        checked={this.state.abc}
                                                                        value={product.product._id}
                                                                        onChange={this.handleCheckedChange.bind(this, index)}
                                                                        defaultChecked
                                                                        color="primary"
                                                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                                    />
                                                                </TableCell>
                                                                <TableCell className={styles1.propic} ><img src={'https://api.zacarta.com/' + product.product.image} /><div className={styles1.propicdiv}><div><div >{product.product.title}</div><div>{product.address}</div></div></div></TableCell>
                                                                {/* <TableCell>{product.price}</TableCell> */}
                                                                <TableCell className={this.state.coun == 2 ? styles1.hidden : ''}>{"₹" + Math.round(product.price * 100) / 100}</TableCell>
                                                                <TableCell className={this.state.coun == 1 ? styles1.hidden : ''}>{"$" + Math.round(product.price * 100) / 100}}</TableCell>

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
                                                <Typography className={this.state.coun == 1 ? styles1.hidden  : styles1.addcontainer2} > <h3>Total: ${Math.round(this.state.totalamount * 100)/100}</h3></Typography>
                                                <Typography className={this.state.coun == 2 ? styles1.hidden  : styles1.addcontainer2} > <h3>Total: ₹{Math.round(this.state.totalamount * 100)/100}</h3></Typography>

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


                                                        <Typography className={styles1.addcontainer} > <h2> Customer Contact Info</h2></Typography>
                                                        <Typography className={styles1.addcontainer} >< PersonIcon /> {this.state.customer_name}</Typography>
                                                        <Typography className={styles1.addcontainer} >< PhoneIcon />{this.state.customerno}</Typography>

                                                    </Container>
                                                </CardContent>
                                            </Card>
                                            <div className={styles1.btns}>
                                                {/* <div>

                                                    <Button variant="contained" color="primary" onClick={this.checkArray}> <PhoneIcon /> Call Customer</Button>
                                                </div> */}
                                                <div className={this.state.hidden ? styles1.hidden : ''}>

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
ViewOrderPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewOrderPage);