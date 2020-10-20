import styles1 from './myStyle.module.css';

import picture from '../../../app/fall-glow-small.jpg'
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useForm } from '@fuse/hooks';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import compose from 'recompose/compose';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import StorefrontIcon from '@material-ui/icons/Storefront';
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
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';
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

// const Component = withStyles(mystyle)(({classes}) =>{
//     return <div className={classes.foo} />
// })

const inptStyle = {
    width: "90%",
    height: "40px",
    border: "1px solid gray"

}
const overMap = {
    position: "absolute",
    top: "90%",
    left: "1.5%",
    // border: "0.1px solid black",
    borderRadius: "5px",
    width: "97%",
    // height: "20%",
    // backgroundColor: "rgb(216, 214, 214)"

}
const mapStyles =
{
    width: '100%',
    height: '100%',
    marginTop: "5%",
    position: 'relative'
    // marginLeft: "2.5%",

};
const mainCcontainer = {
    width: '80%',
    height: '70%',
    position: "relative"
}

// const classes = useStyles();
// function HomePage() {
class HomePage extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            suggestions: [],
            text: '',
            currentLocation: {
                latitude: 36.778259, longitude: -119.417931
            },
            zoom: 11,
            hidden: true,
            respOpen: false,
            selectedStore: '',
            reload: true,
            geolocation: {
                latitude: 36.778259,
                longitude: -119.417931
            },
            stores: [],
            open: false

        }
    }

    componentWillMount() {
        let ciphertext = window.sessionStorage.getItem('a#$s!');
        if (!ciphertext) {
            // console.log(ciphertext)
            this.props.history.push('./login');
        } else {
            let bytes = CryptoJS.AES.decrypt(ciphertext, 'my-secret-key008899');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }

        let reload = window.sessionStorage.getItem('reload')
        if (reload == 1) {
            window.sessionStorage.setItem('reload', '2')
            window.location.reload()
        }
        let coun = window.sessionStorage.getItem('coun')
        let latitude = 0;
        let longitude = 0
        if (coun == 1) {
            latitude = 19.0760;
            longitude = 72.8777;
        } else {
            latitude = 36.778259;
            longitude = -119.417931;
        }
        this.setState({
            currentLocation: {
                latitude: latitude,
                longitude: longitude,
            },
            open: true

        })
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {

                console.log(position)
                debugger
                if (position.coords.latitude > 0) {

                    console.log(position.coords.latitude)
                    latitude = position.coords.latitude;
                    longitude = position.coords.longitude
                    debugger

                    this.setState({
                        currentLocation: {
                            latitude: latitude,
                            longitude: longitude
                        }
                    })
                }


                let headers = {
                    'authorization': `bearer ${decryptedData} `
                }
                axios.get('https://api.zacarta.com/api/buyer/store?' + "latitude=" + latitude + "&" + "longitude=" + longitude, {
                    headers: headers
                }).then(function (res) {
                    this.setState({
                        open: false
                    })
                    if (res.status == 200) {
                        debugger
                        // console.log(res.data)
                        this.setState({
                            open: false,
                            stores: res.data.data.stores,
                            geolocation: res.data.data.stores[0].store_address.geolocation,
                            currentLocation: {
                                latitude: latitude,
                                longitude: longitude
                            },
                        })
                        // history.push('/home')

                    }
                }.bind(this))
                    .catch(e => {
                        // debugger;
                        // setErrMessage(!errMessage)
                        // console.log(e)
                        this.setState({
                            open: false
                        })

                    })
            })
            let headers = {
                'authorization': `bearer ${decryptedData} `
            }
            axios.get('https://api.zacarta.com/api/buyer/store?' + "latitude=" + latitude + "&" + "longitude=" + longitude, {
                headers: headers
            }).then(function (res) {
                this.setState({
                    open: false
                })
                if (res.status == 200) {
                    debugger
                    // console.log(res.data)
                    this.setState({
                        stores: res.data.data.stores,
                        open: false,
                        geolocation: res.data.data.stores[0].store_address.geolocation,
                        currentLocation: {
                            latitude: latitude,
                            longitude: longitude
                        }
                    })
                    // history.push('/home')

                }
            }.bind(this))
                .catch(e => {
                    this.setState({
                        open: false
                    })
                    // debugger;
                    // setErrMessage(!errMessage)
                    console.log(e)

                })

            // let latitude = 36.778259;
            // let longitude = -119.417931;
            // let headers = {
            //     'authorization': `bearer ${decryptedData} `
            // }
            // axios.get('http://localhost:5000/api/buyer/store?' + "latitude=" + latitude + "&" + "longitude=" + longitude, {
            //     headers: headers
            // }).then(function (res) {
            //     if (res.status == 200) {
            //         debugger
            //         // console.log(res.data)
            //         this.setState({
            //             stores: res.data.data.stores,
            //             geolocation: res.data.data.stores[0].store_address.geolocation,
            //             currentLocation: {
            //                 latitude: latitude,
            //                 longitude: longitude
            //             }
            //         })
            //         // history.push('/home')

            //     }
            // }.bind(this))
            //     .catch(e => {
            //         // debugger;
            //         // setErrMessage(!errMessage)
            //         console.log(e)

            //     })


        } else {
            // if (coun == 1) {
            // let latitude = 36.778259;
            // let longitude = -119.417931;
            let headers = {
                'authorization': `bearer ${decryptedData} `
            }
            axios.get('https://api.zacarta.com/api/buyer/store?' + "latitude=" + latitude + "&" + "longitude=" + longitude, {
                headers: headers
            }).then(function (res) {
                this.setState({
                    open: false
                })
                if (res.status == 200) {
                    debugger
                    // console.log(res.data)
                    this.setState({
                        stores: res.data.data.stores,
                        open: false,
                        geolocation: res.data.data.stores[0].store_address.geolocation,
                        currentLocation: {
                            latitude: latitude,
                            longitude: longitude
                        }
                    })
                    // history.push('/home')

                }
            }.bind(this))
                .catch(e => {
                    this.setState({
                        open: false
                    })
                    // debugger;
                    // setErrMessage(!errMessage)
                    console.log(e)

                })
            // }
            this.setState({
                open: false
            })
        }
    }


    handleRespClose = () => {
        this.setState({
            respOpen: false,
        })
    }
    onTextChange = (e) => {
        let value = e.target.textContent;
        let suggestions = [];

        const regex = new RegExp(`^${value}`, 'i');
        if (value.length > 0) {
            for (const item of this.state.stores) {
                console.log(item);

                if (item.store_name.includes(value)) {
                    suggestions.push(item.store_name)
                    this.selectedText(item.store_name)
                }
            }
        } else {
            this.setState({
                currentLocation: { latitude: this.state.stores[0].store_address.geolocation.latitude, longitude: this.state.stores[0].store_address.geolocation.longitude },
                zoom: 14,
            })
        }
        console.log(suggestions);

        this.setState(() => ({
            suggestions,
            text: value
        }))
    }

    selectedText(value) {
        let location;
        for (let index = 0; index < this.state.stores.length; index++) {
            if (this.state.stores[index].store_name === value) {
                location = this.state.stores[index].store_address.geolocation;
                debugger;
            }
        }
        console.log(value);
        debugger;
        this.setState(() => ({
            currentLocation: { latitude: location.latitude, longitude: location.longitude },
            zoom: 18,
            text: value,
            suggestions: [],
        }))

    }

    checklocation = () => {
        console.log(this.state.currentLocation);
    }

    changePage = (item, e) => {
        window.sessionStorage.setItem('store_id', item._id)
        let ciphertext = window.sessionStorage.getItem('a#$s!');
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
            debugger;
            if (res.data.success != false) {
                if (res.data.data.seller._id == item._id) {

                    this.props.history.push('/store')
                } else {
                    this.setState({
                        respOpen: true
                    })
                }
            } else {
                this.props.history.push('/store')
            }
        }.bind(this))
            .catch(e => {
                // debugger;
                // setErrMessage(!errMessage)
                console.log(e)
            })


    }
    emptyCart = () => {
        let ciphertext = window.sessionStorage.getItem('a#$s!');
        if (!ciphertext) {
            this.props.history.push('./login');
        } else {
            let bytes = CryptoJS.AES.decrypt(ciphertext, 'my-secret-key008899');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
        debugger;
        let headers = {
            'authorization': `bearer ${decryptedData}`
        }
        axios.put('https://api.zacarta.com/api/buyer/cart/deleteCart', {}, {
            headers: headers
        }).then(function (res) {
            debugger;
            if (res.data.success != false) {
                this.props.history.push('/store')
            }
        }.bind(this))
            .catch(e => {
                // debugger;
                // setErrMessage(!errMessage)
                console.log(e)
            })


    }


    displayMarkers = () => {
        console.log(this.state.stores)
        debugger;
        return this.state.stores.map((store, index) => {
            console.log(index, store.location);
            return <Marker key={index} id={index} position={{

                lat: store.store_address.geolocation.latitude,
                lng: store.store_address.geolocation.longitude
            }}
                title={store.store_name}
                name={'abc'}
                // icon ={{iconBase + 'parking_lot_maps.png'}}
                onClick={() => {
                    this.setState({
                        hidden: false,
                        selectedStore: store.store_name
                    });
                    console.log(store)
                }}>


                <InfoWindow
                    key={`infowindow-${store.store_name}`}
                    visible={true}>
                    <div>hyyyyyy</div>
                </InfoWindow>

            </Marker>
        })
    }


    render() {
        const { text, suggestions } = this.state;
        const { classes } = this.props


        return (
            <div className={classes.root}>
                {/* <Backdrop className={classes.backdrop} open={this.state.open} >
                    <CircularProgress color="inherit" />
                </Backdrop> */}


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
                                    <DialogTitle id="alert-dialog-title">{"Alert...!"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            You have an active shopping cart from a different store. That cart will be cleared. Do you want to continue?
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        {/* <Link to='/seller-detail'> */}
                                        <Button onClick={this.handleRespClose} color="primary">
                                            Cancel
                                              </Button>
                                        {/* </Link> */}
                                        {/* <Link to='/seller-detail'> */}
                                        <Button onClick={this.emptyCart} color="primary">
                                            Continue
                                              </Button>
                                        {/* </Link> */}
                                    </DialogActions>
                                </Dialog>
                                <CardContent className="flex flex-col items-center" style={{ height: "800px" }}>
                                    <div style={{ width: "80%" }} >
                                        <h2>Search Store</h2>
                                        {/* <input style={inptStyle} id="query" type="text" onChange={this.onTextChange} value={text} />
                                        {this.renderSuggestions()}  */}
                                        {/* <select> 
                                            <option>abc</option>
                                        </select> */}
                                        {/* <span>Suggestions: {suggestions.length}</span> */}
                                        <Autocomplete
                                            id="search"
                                            // freeSolo
                                            onChange={this.onTextChange}
                                            options={this.state.stores.map((option) => option.store_name)}
                                            renderInput={(params) => (
                                                <TextField {...params} id="outlined-search" label="Search" type="search" margin="normal" color="black" variant="outlined" />
                                            )}
                                        />

                                    </div>

                                    <div style={mainCcontainer}>
                                        <Map
                                            // defaultZoom={10}	
                                            center={{
                                                lat: this.state.currentLocation.latitude,
                                                lng: this.state.currentLocation.longitude
                                            }}
                                            defaultOptions={{
                                                mapTypeControl: false,
                                                streetViewControl: false,
                                                zoomControl: false,
                                                fullscreenControl: false,
                                                styles: mapStyles,
                                                // minZoom: 1,
                                                zoom: -10,

                                            }}
                                            google={this.props.google}
                                            zoom={this.state.zoom}
                                            style={mapStyles}
                                            currentLocation={{ lat: this.state.geolocation.latitude, lng: this.state.geolocation.longitude }}
                                        >
                                            {this.displayMarkers()}
                                        </Map>

                                        <Card style={overMap} className={this.state.hidden ? styles1.hidden : ''} id="over_map">
                                            {this.state.stores.map((item) => {
                                                if (item.store_name == this.state.selectedStore) {

                                                    return <div className={styles1.flexcontainer}>

                                                        <div className={styles1.picture}><img src={"https://api.zacarta.com/" + item.store_image} /></div>
                                                        <div className={styles1.tbldiv}>
                                                            <table className={styles1.tbl}>
                                                                <tbody>
                                                                    <tr><td>

                                                                        <th>{item.store_name.toUpperCase()}</th>
                                                                    </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td> <BusinessIcon />{item.store_address.address}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td> <PhoneIcon />{item.store_contact_number}</td>
                                                                        <td>< CategoryIcon />{item.store_types[0].title}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div className={styles1.btn}>
                                                            <Link className={styles1.link} onClick={this.changePage.bind(this, item)}>
                                                                <Button variant="contained" color="primary" >
                                                                    <StorefrontIcon /> Visit Store
                                                            </Button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                }

                                            })}
                                        </Card>

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
HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
};
// const Combined =new withStyles(styles);
// export default compose(
//     withStyles(styles, {
//       name: 'AppFrame',
//     }),
//     withWidth(),
//     connect(),
//   )(AppFrame);
export default compose(GoogleApiWrapper({
    // apiKey: 'AIzaSyAd4Ne-6KGiOXB6rnYY_lxEW0o8YUUmvjM'
    apiKey: "https://maps.googleapis.com/maps/api/js?v=weekly&key=AIzaSyDbtagfH98A-FpI31sAYzX0M2J1rei8Qt0&callback=initMap"
}), withStyles(styles)
    , withRouter)(HomePage);