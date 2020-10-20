import styles1 from './myStyle.module.css';

import picture from '../../../app/fall-glow-small.jpg';

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
import CategoryIcon from '@material-ui/icons/Category';
import BusinessIcon from '@material-ui/icons/Business';
import PhoneIcon from '@material-ui/icons/Phone';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import PageviewIcon from '@material-ui/icons/Pageview';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import ShopIcon from '@material-ui/icons/Shop';
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

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

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

const overMap = {
    position: "relative",
    // top: "90%",
    // left: "1%",
    // border: "0.1px solid black",
    borderRadius: "5px",
    width: "97%",
    // height: "110px",
    // backgroundColor: "rgb(216, 214, 214)"

}


// const classes = useStyles();
// function HomePage() {
class ProductsPage extends React.Component {
    componentWillMount() {
        let ciphertext = window.sessionStorage.getItem('a#$s!');
        let store_id = window.sessionStorage.getItem('store_id');
        let category_id = window.sessionStorage.getItem('category_id');
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

        let headers = {
            'authorization': `bearer ${decryptedData} `
        }
        axios.get('https://api.zacarta.com/api/buyer/store/products?' + "store=" + store_id + "&" + "category=" + category_id, {
            headers: headers
        }).then(function (res) {
            debugger;
            this.setState({
                open:false
            })
            if (res.status == 200) {
                debugger;
                console.log(res.data)
                this.setState({
                    store_name: res.data.data.store.store_name,
                    store_address: res.data.data.store.store_address.address,
                    store_contact_number: res.data.data.store.store_contact_number,
                    store_id: res.data.data.store._id,
                    category_id: res.data.data.store.grouped[0].category._id,
                    store_image: res.data.data.store.store_image,
                    //    store: res.data.data.store,
                    products: res.data.data.store.grouped[0].products,
                    open: false
                })
                console.log(res.data.data.store.grouped[0].products)
                // history.push('/home')

            }
        }.bind(this))
            .catch(e => {
                // debugger;
                // setErrMessage(!errMessage)
                console.log(e)
            })


    }

    constructor(props) {
        super(props);

        this.state = {
            suggestions: [],
            text: '',
            setRowsPerPage: 10,
            setPage: 0,
            page: 0,
            rowsPerPage: 10,
            setOpen: false,
            zoom: 14,
            hidden: false,
            respOpen: false,
            name: '',
            picture: '',
            desc: '',
            price: 0,
            category: '1',
            unit: '',
            quantity: '1',
            category_id: '',
            store_id: '',
            selectedStore: '',
            store_name: '',
            store_address: '',
            store_contact_number: '',
            store_image: '',
            products: [],
            coun: 0,
            open: false

        }
    }

    handleDispatch = (item, e) => {
        console.log(item)
    }
    onTextChange = (e) => {
        let value = e.target.textContent;
        debugger;
        let suggestions = [];
        const regex = new RegExp(`^${value}`, 'i');
        if (value.length > 0) {
            for (const item of this.state.products) {
                console.log(item);

                if (item.title.includes(value)) {
                    suggestions.push(item)
                    // this.selectedText(item.name)
                }
            }
        }
        console.log(suggestions);

        this.setState(() => ({
            suggestions,
            text: value
        }))
    }
    handleChangePage = (event, page) => {
        this.setState({
            page: page
        })
    };

    handleChangeRowsPerPage = (event) => {
        console.log(event.target.value)
        this.setState({
            setPage: 0,
            setRowsPerPage: +event.target.value,
            rowsPerPage: +event.target.value
        })

    };

    handleOpen = (item) => {
        debugger;
        this.setState({
            setOpen: true,
            name: item.title,
            picture: item.icon,
            desc: item.description,
            price: item.price,
            category: '1',
            unit: item.unit.title,
        })
    };

    handleClose = () => {
        this.setState({
            setOpen: false
        })
    };
    handleQuantityChange = (e) => {
        this.setState({
            quantity: e.target.value
        })
    }
    addToCart = (product, e) => {

        window.sessionStorage.setItem('cart', true)
        this.setState({
            open: true
        })
        console.log(product)
        let data = {
            item: product._id,
            price: product.price,
            quantity: this.state.quantity,
            category: this.state.category_id,
            seller: this.state.store_id
        }
        let ciphertext = window.sessionStorage.getItem('a#$s!');
        // let store_id = window.sessionStorage.getItem('store_id');
        let category_id = window.sessionStorage.getItem('category_id');
        if (!ciphertext) {
            this.props.history.push('./login');
        } else {
            let bytes = CryptoJS.AES.decrypt(ciphertext, 'my-secret-key008899');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
        let headers = {
            'authorization': `bearer ${decryptedData} `
        }
        console.log(data)
        axios.put('https://api.zacarta.com/api/buyer/cart/addToCart', data, {
            headers: headers
        }).then(function (res) {
            debugger;
            this.setState({
                open:false
            })
            if (res.status == 200) {
                debugger;
                this.setState({
                    open: false,
                    respOpen: true,
                    quantity: 1
                })


            }
        }.bind(this))
            .catch(e => {
                // debugger;
                // setErrMessage(!errMessage)
                console.log(e)
            })
    }
    handleRespClose = () => {
        this.setState({
            respOpen: false,
        })
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

                                <Dialog
                                    open={this.state.respOpen}
                                    onClose={this.handleRespClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"Product Added"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Product Added to Cart Successfully
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
                                                            // image={picture}
                                                            title="Contemplative Reptile"
                                                            style={{ display: 'flex' }}
                                                        >
                                                            <img className={styles1.proimage} src={"https://api.zacarta.com/" + this.state.picture} />

                                                            <Typography variant="body2" color="textSecondary" component="p" className={styles1.modaldes}>
                                                                {this.state.desc}
                                                            </Typography>
                                                        </CardMedia>
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
                                                    className={styles1.quantity}
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
                                <CardContent className="flex flex-col items-center" style={{ height: "100%" }}>
                                    <div style={overMap} id="over_map">

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
                                                            <td> <BusinessIcon />{this.state.store_address}</td>
                                                        </tr>
                                                        <tr>
                                                            <td> <PhoneIcon />{this.state.store_contact_number}</td>
                                                            {/* <td>< CategoryIcon />{this.state.category}</td> */}
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className={styles1.btn}>
                                                <Link to="/store" className={styles1.link}>
                                                    <Button variant="contained" color="primary" >
                                                        <KeyboardBackspaceIcon />Back to Store
                                                        </Button>
                                                </Link>
                                            </div>
                                        </Card>

                                    </div>

                                    <div className={styles1.search}>
                                        <Autocomplete
                                            id="search"
                                            freeSolo
                                            onChange={this.onTextChange}
                                            options={this.state.products.map((option) => option.title)}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Search" margin="normal" variant="outlined" />
                                            )}
                                        />
                                    </div>
                                    <div className={styles1.heading}>
                                        <h1>Products</h1>
                                    </div>
                                    <TableContainer className={classes.container}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell >
                                                        Sr.#
                                                    </TableCell>
                                                    <TableCell className={styles1.namecell}>
                                                        Product
                                                    </TableCell>
                                                    <TableCell >
                                                        Price
                                                    </TableCell>
                                                    <TableCell >
                                                        Unit
                                                    </TableCell>
                                                    <TableCell >
                                                        Weight
                                                    </TableCell>
                                                    <TableCell>
                                                        Quantity
                                                    </TableCell>
                                                    <TableCell >
                                                        View
                                                    </TableCell>
                                                    <TableCell >
                                                        Add to Cart
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.suggestions.length == 0 ? this.state.products.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((product, index) => {
                                                    return (
                                                        <TableRow hover>

                                                            <TableCell>{index + 1}</TableCell>
                                                            <TableCell className={styles1.propic} ><img src={'https://api.zacarta.com/' + product.icon} /><div className={styles1.propicdiv}><div><div >{product.title}</div></div></div></TableCell>

                                                            {/* <TableCell>{product.price} </TableCell> */}
                                                            <TableCell className={this.state.coun == 2 ? styles1.hidden : ''}>{"₹" + product.price.toFixed(2)}</TableCell>
                                                            <TableCell className={this.state.coun == 1 ? styles1.hidden : ''}>{"$" + product.price.toFixed(2)}</TableCell>

                                                            <TableCell>{product.unit.title}</TableCell>
                                                            <TableCell>{product.weight} </TableCell>

                                                            <TableCell>
                                                                <TextField
                                                                    label="Quantity"
                                                                    className={styles1.dropdown}
                                                                    value={this.state.abc}
                                                                    defaultValue="1"
                                                                    onChange={this.handleQuantityChange}
                                                                    SelectProps={{
                                                                        native: true,
                                                                    }}
                                                                    type='number'

                                                                    // helperText="Please select your currency"
                                                                    variant="outlined"
                                                                >
                                                                </TextField>
                                                            </TableCell>
                                                            <TableCell>

                                                                <Button variant="contained" size="small" color="primary" onClick={this.handleOpen.bind(this, product)} >
                                                                    <PageviewIcon /> View
                                                            </Button>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Button variant="contained" size="small" color="primary" onClick={this.addToCart.bind(this, product)}>
                                                                    <ShopIcon /> Add to Cart

                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                }) : this.state.suggestions.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((product, index) => {
                                                    return (
                                                        <TableRow hover>
                                                            <TableCell>{index + 1}</TableCell>
                                                            <TableCell className={styles1.propic} ><img src={'https://api.zacarta.com/' + product.icon} /><div className={styles1.propicdiv}><div><div >{product.title}</div></div></div></TableCell>
                                                            {/* <TableCell>{product.price}</TableCell> */}
                                                            <TableCell className={this.state.coun == 2 ? styles1.hidden : ''}>{"₹" + product.price.toFixed(2)}</TableCell>
                                                            <TableCell className={this.state.coun == 1 ? styles1.hidden : ''}>{"$" + product.price.toFixed(2)}</TableCell>

                                                            <TableCell>{product.unit.title}</TableCell>
                                                            <TableCell>{product.weight} </TableCell>

                                                            <TableCell>
                                                                <TextField
                                                                    label="Quantity"
                                                                    className={styles1.dropdown}
                                                                    // value={this.state.ab}
                                                                    onChange={this.handleQuantityChange}
                                                                    SelectProps={{
                                                                        native: true,
                                                                    }}
                                                                    type='number'

                                                                    // helperText="Please select your currency"
                                                                    variant="outlined"
                                                                >
                                                                </TextField>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Button variant="contained" size="small" color="primary" onClick={this.handleOpen.bind(this, product)} >
                                                                    <PageviewIcon /> View
                                                            </Button>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Button variant="contained" size="small" color="primary" onClick={this.addToCart.bind(this, product)}>
                                                                    <ShopIcon /> Add to Cart

                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[10, 25, 100]}
                                        component="div"
                                        count={this.state.products.length}
                                        rowsPerPage={this.state.rowsPerPage}
                                        page={this.state.page}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                    {/* <div className={styles1.catcontainer}>
                                        {this.state.suggestions.length != 0 ? this.state.suggestions.map(item => {
                                            return <div className={styles1.flexchild}><Link to='/products'><img src={item.picture} /></Link></div>

                                        }) : this.state.categories.map(item => {
                                            return <div className={styles1.flexchild}><Link to='/products'><img src={item.picture} /></Link></div>


                                        })}

                                    </div> */}
                                </CardContent>
                            </Card>
                        </FuseAnimate>
                    </div>
                </div>
            </div >
        );
    }
}
ProductsPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductsPage);