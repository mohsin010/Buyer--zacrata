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

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import PageviewIcon from '@material-ui/icons/Pageview';
import CategoryIcon from '@material-ui/icons/Category';
import BusinessIcon from '@material-ui/icons/Business';
import PhoneIcon from '@material-ui/icons/Phone';

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
    },
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
class StorePage extends React.Component {
    componentWillMount() {
        let ciphertext = window.sessionStorage.getItem('a#$s!');
        let store_id = window.sessionStorage.getItem('store_id')
        if (!ciphertext) {
            this.props.history.push('./login');
        } else {
            let bytes = CryptoJS.AES.decrypt(ciphertext, 'my-secret-key008899');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
        this.setState({
            open: true
        })
        let headers = {
            'authorization': `bearer ${decryptedData} `
        }
        axios.get('https://api.zacarta.com/api/buyer/store/detail?' + "store=" + store_id, {
            headers: headers
        }).then(function (res) {
            this.setState({
                open:false
            })
            debugger;
            if (res.status == 200) {
                debugger;
                console.log(res.data)
                this.setState({
                    store_name: res.data.data.store.store_name,
                    store_address: res.data.data.store.store_address.address,
                    store_contact_number: res.data.data.store.store_contact_number,
                    store_image: res.data.data.store.store_image,
                    store_category: res.data.data.store.store_types[0].title,
                    //    store: res.data.data.store,
                    categories: res.data.data.store.categories,
                    open: false

                })
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
            currentLocation: {
                latitude: 31.452136, longitude: 73.070382
            },
            zoom: 14,
            hidden: false,
            selectedStore: '',
            store_name: '',
            store_address: '',
            store_contact_number: '',
            store_image: '',
            store_category: '',
            categories: [],
            open: false
        }
    }

    handleDispatch = (item, e) => {
        window.sessionStorage.setItem('category_id', item.category._id)
        // console.log(item.category._id)

    }
    onTextChange = (e) => {
        let value = e.target.textContent;
        debugger;
        let suggestions = [];
        const regex = new RegExp(`^${value}`, 'i');
        if (value.length > 0) {
            for (const item of this.state.categories) {
                console.log(item);

                if (item.category.title.includes(value)) {
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
                                                            <td><BusinessIcon />{this.state.store_address}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><PhoneIcon />{this.state.store_contact_number}</td>
                                                            <td>< CategoryIcon />{this.state.store_category}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className={styles1.btn}>
                                                <Link to="/home" className={styles1.link}>
                                                    <Button variant="contained" color="primary" >
                                                        <KeyboardBackspaceIcon />Back to Search
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
                                            options={this.state.categories.map((option) => option.category.title)}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Search" margin="normal" variant="outlined" />
                                            )}
                                        />
                                    </div>
                                    <div className={styles1.heading}>
                                        <h1>Categories</h1>
                                    </div>
                                    <TableContainer className={classes.container}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell >
                                                        Sr.#
                                                    </TableCell>
                                                    <TableCell className={styles1.namecell}>
                                                        Category
                                                    </TableCell>
                                                    <TableCell >
                                                        View
                                                    </TableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.suggestions.length == 0 ? this.state.categories.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((product, index) => {
                                                    return (
                                                        <TableRow hover>

                                                            <TableCell>{index + 1}</TableCell>
                                                            <TableCell className={styles1.propic} ><img src={'https://api.zacarta.com/' + product.category.icon} /><div className={styles1.propicdiv}><div><div >{product.category.title}</div></div></div></TableCell>
                                                            <TableCell>
                                                                <Link to='/products' className={styles1.linkcls}>
                                                                    <Button variant="contained" size="small" color="primary" onClick={this.handleDispatch.bind(this, product)} >
                                                                        <PageviewIcon /> View
                                                            </Button>
                                                                </Link>
                                                            </TableCell>

                                                        </TableRow>
                                                    )
                                                }) : this.state.suggestions.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((product, index) => {
                                                    return (
                                                        <TableRow hover>
                                                            <TableCell>{index + 1}</TableCell>
                                                            <TableCell className={styles1.propic} ><img src={'https://api.zacarta.com/' + product.category.icon} /><div className={styles1.propicdiv}><div><div >{product.category.title}</div></div></div></TableCell>
                                                            <TableCell>
                                                                <Link to='/products' className={styles1.linkcls}>
                                                                    <Button variant="contained" size="small" color="primary" onClick={this.handleDispatch.bind(this, product)} >
                                                                        <PageviewIcon /> View
                                                            </Button>
                                                                </Link>
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
                                        count={this.state.categories.length}
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
            </div>
        );
    }
}
StorePage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StorePage);