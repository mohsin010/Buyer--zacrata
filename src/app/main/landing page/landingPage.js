import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import styles1 from './mystyle.module.css';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube, faDollarSign, faArchive, faPhone } from '@fortawesome/free-solid-svg-icons'
import { HashLink } from 'react-router-hash-link';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import picture from '../../../images/apples.jpeg';
import firstbg from '../../../images/banner-bg.png';
import cellphn from '../../../images/banner-image.png';
import regimg from '../../../images/register-bg.png';
import bucket from '../../../images/image-6.png'
import menu2fruites from '../../../images/image-7.png'
import strawbery from '../../../images/image-8.png'
import apples from '../../../images/image-9.png'
import vegies from '../../../images/image-4.png'
import palak from '../../../images/image-5.png'
import axios from 'axios';





import { Link } from 'react-router-dom';
import { sub } from 'date-fns';


const AntTabs = withStyles({
    root: {
        borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
        backgroundColor: '#1890ff',
    },
})(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&$selected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#40a9ff',
        },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);

const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            maxWidth: 40,
            width: '100%',
            backgroundColor: '#635ee7',
        },
    },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        color: '#fff',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        '&:focus': {
            opacity: 1,
        },
    },
}))((props) => <Tab disableRipple {...props} />);

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: 20,
    },
    padding: {
        padding: theme.spacing(3),
    },
    demo1: {
        backgroundColor: theme.palette.background.paper,

    },
    demo2: {
        backgroundColor: '#2e1534',
    },
}));




function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        minWidth: 500
        // maxWidth: 1700,

        // height:"5000px"
    },
    root1: {
        maxWidth: 280,
        minWidth: 100,
        width: 270,
        height: 399,
        marginTop: 5,
        marginLeft: 10
    },
    media: {
        height: 270,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function LandingPage() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [products, setProducts] = React.useState([]);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [subject, setSubject] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [resp, setResp] = React.useState(false);

    const handleFormChange = (e) => {
        setName(e.target.value)
        setEmail(e.target.value)

    }
    const submitForm = () => {
        let data = {
            name: name,
            email: email,
            subject: subject,
            message: message
        }
        axios.post("http://18.189.255.96:3000/api/seller/contact/contact", data).then(res => {
            // setProducts(res.data.data.products)
            // console.log(res.data.data)
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
            setResp(true);

        }).catch(e => {
            console.log(e)
        })
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [val, setVal] = React.useState(0);


    const handleChange1 = (event, newValue1) => {
        setVal(newValue1);
        console.log(val)
    };

    const closeResp = () => {
        setResp(false)
    }
    useEffect(() => {
        // console.log("e")

        axios.get("http://18.189.255.96:3000/api/buyer/store/getproducts").then(res => {
            setProducts(res.data.data.products)

        }).catch(e => {
            console.log(e)
        })

    }, [])
    function CustomizedTabs(prod) {
        const classes = useStyles();

        const handleProducts = (e) => {
            console.log(e.target.textContent.toString())
            let value = e.target.textContent
            axios.get("http://18.189.255.96:3000/api/buyer/store/getproducts?category=" + value).then(res => {
                console.log(res.data.data.products)
                setProducts(res.data.data.products)

            }).catch(e => {
                console.log(e)
            })
        }


        return (
            <div className={classes.root}>
                <div className={classes.demo1}>
                    <AntTabs className={styles1.antTab} value={val} onChange={handleChange1} aria-label="ant example">
                        <AntTab label="All" onClick={handleProducts} />
                        <AntTab label="Meat" onClick={handleProducts} />
                        <AntTab label="Fruits" onClick={handleProducts} />
                        <AntTab label="Vegetables" onClick={handleProducts} />

                    </AntTabs>
                    <Typography className={classes.padding} />
                </div>
                {/* <div className={classes.demo2}>
                    <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
                        <StyledTab label="Workflows" />
                        <StyledTab label="Datasets" />
                        <StyledTab label="Connections" />
                    </StyledTabs>
                    <Typography className={classes.padding} />
                </div> */}
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <Dialog
                open={resp}
                onClose={closeResp}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Request Submitted"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Your requsest is submitted.
                                        </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* <Link to='/seller-detail'> */}
                    <Button onClick={closeResp} color="primary">
                        Close
                     </Button>
                </DialogActions>
            </Dialog>
            <AppBar position="float" className={styles1.appbar}>
                <div className={styles1.maincontainer}>
                    <h1 className={styles1.title}>Zacarta</h1>
                    <div className={styles1.navcontainer}>
                        <Tabs className={styles1.tabsmain} value={value} onChange={handleChange} aria-label="simple tabs example">

                            <Tab className={styles1.tabs} label={<HashLink to="index#howtouse" className={styles1.link}>
                                How to use
                            </HashLink>} {...a11yProps(0)} />


                            <Tab className={styles1.tabs} label={
                                <HashLink to="index#products" className={styles1.link}>
                                    Products
                                     </HashLink>
                            } {...a11yProps(1)} />

                            <Tab className={styles1.tabs} label={
                                <HashLink to="index#apps" className={styles1.link}>
                                    Buyer & Seller
                                     </HashLink>
                            } {...a11yProps(2)} />

                            <Tab className={styles1.tabs} label={
                                <HashLink to="index#contactus" className={styles1.link}>
                                    Contact
                                      </HashLink>
                            } {...a11yProps(3)} />
                            <HashLink to="/login" className={styles1.link}>

                                <Tab className={styles1.lgin} label="Login" {...a11yProps(4)} ></Tab>
                            </HashLink>
                            <a href="http://seller.zacarta.com" target="_blank" className={styles1.link}>

                                <Tab className={styles1.lgin} label="Seller Login" {...a11yProps(5)} ></Tab>
                            </a>
                            {/* <Tab className={styles1.phone} label={
                                <span>
                                    <PhoneOutlinedIcon /> + 03045548981
                                </span>

                            } {...a11yProps(6)} ></Tab> */}

                            {/* <Tab className={styles1.numtab} label="Login"  ></Tab> */}

                        </Tabs>
                    </div>
                </div>
            </AppBar>
            <div className={styles1.firstcontainer}>
                <img className={styles1.firstbg} src={firstbg} />
                <div className={styles1.findhedivading}>
                    <h1 className={styles1.findheading}>Find Grocery Stores Near You</h1>
                    <h1 className={styles1.findheading2}>Download Our App and Start Shopping</h1>
                    <div className={styles1.downloadlinks2}>
                        <Button variant="contained" className={styles1.btnapp2}>
                            <a>
                                {/* <img src={app} /> */}
                            </a>
                        </Button>
                        <Button variant="contained" className={styles1.btnplay}>
                            <a>
                                {/* <img src={play} /> */}

                            </a>
                        </Button>

                    </div>
                </div>

                <div className={styles1.cellphn}></div>
                {/* <img className={styles1.cellphn} src={cellphn} /> */}

            </div>
            <div className={styles1.secondcontainer} id="howtouse">
                <h1 className={styles1.howtouse}>How to use?</h1>
                <div className={styles1.listmaindiv}>
                    <div className={styles1.iconlist}>
                        <div className={styles1.icondiv}>
                            <LocationOnIcon className={styles1.icons} />
                        </div>
                        <h2 className={styles1.icontitle}>
                            Select Store
                        </h2>
                    </div>
                    <div className={styles1.iconlist}>
                        <div className={styles1.icondiv}>
                            <ShoppingCartIcon className={styles1.icons} />
                        </div>
                        <h2 className={styles1.icontitle}>
                            Order Grocery
                        </h2>
                    </div>
                    <div className={styles1.iconlist}>
                        <div className={styles1.icondiv}>
                            <FontAwesomeIcon className={styles1.icons} icon={faArchive} ></FontAwesomeIcon>

                        </div>
                        <h2 className={styles1.icontitle}>
                            Order Ready
                        </h2>
                    </div>
                    {/* <div className={styles1.iconlist}>
                        <div className={styles1.icondiv}>
                        <FontAwesomeIcon className={styles1.icons} icon={faDollarSign} ></FontAwesomeIcon>

                        </div>
                        <h2 className={styles1.icontitle}>
                            acc
                        </h2>
                    </div> */}
                    <div className={styles1.iconlist}>
                        <div className={styles1.icondiv}>
                            <FontAwesomeIcon className={styles1.icons} icon={faCube} ></FontAwesomeIcon>

                        </div>
                        <h2 className={styles1.icontitle}>
                            Order Pickup
                        </h2>
                    </div>

                </div>
            </div>

            <div className={styles1.productscontainer} id="products">
                <div className={styles1.productscontainer2}>
                    <h1 className={styles1.producttittle}>Products</h1>
                    <div className={styles1.line}></div>
                    <div className={styles1.cutomtabs}>
                        <CustomizedTabs />
                    </div>
                </div>
                <div className={styles1.productsdisp}>

                    {products.map(item => {
                        return <Card className={classes.root1}>
                            {/* <CardHeader className={styles1.cardheader}
                                title={item.title}
                            // subheader="September 14, 2016"
                            /> */}
                            <Typography className={styles1.cardheader} variant="body2" color="textSecondary" component="p">
                                <h2>{item.title}</h2>
                            </Typography>
                            <CardMedia
                                className={classes.media}
                                image={"http://18.189.255.96:3000/" + item.image}
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <h3><b>Price:</b> {item.price}</h3>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {item.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    })}
                </div>



            </div>
            <div className={styles1.apps} id="apps">
                <div className={styles1.buyer}>
                    <div className={styles1.buyer2} >
                        <div>
                            <h1 className={styles1.producttittle}>Buyer</h1>
                            <p>Download the app and enjoy shopping</p>
                            <h3 className={styles1.downloadtitle}>Download Our App</h3>
                            <div className={styles1.downloadlinks}>
                                <div>
                                    <Button variant="contained" className={styles1.btn2}>
                                        <a>
                                            {/* <img src={app} /> */}
                                        </a>
                                    </Button>
                                    <Button variant="contained" className={styles1.btn}>
                                        <a>
                                            {/* <img src={play} /> */}

                                        </a>
                                    </Button>
                                </div>

                            </div>
                        </div>
                        <img className={styles1.vegies} src={vegies} />

                    </div>
                </div>
                <div className={styles1.seller}>
                    <div className={styles1.seller2} >
                        <img className={styles1.palak} src={palak} />

                        <div className={styles1.sellerinner}>
                            <h1 className={styles1.producttittle}>Seller</h1>
                            <p>Download the app and enjoy shopping</p>
                            <h3 className={styles1.downloadtitleseller}>Download Our App</h3>
                            <div className={styles1.downloadlinksseller}>
                                <Button variant="contained" className={styles1.btn2seller}>
                                    <a>
                                        {/* <img src={app} /> */}
                                    </a>
                                </Button>
                                <Button variant="contained" className={styles1.btnseller}>
                                    <a>
                                        {/* <img src={play} /> */}

                                    </a>
                                </Button>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className={styles1.registeroffer}>
                {/* <div> */}
                <img src={regimg} className={styles1.regimg} />

                {/* </div> */}
                <div className={styles1.innerdiv} >
                    <h1 className={styles1.producttittlereg}>Register Your Store Today</h1>
                    <Button className={styles1.productbtn} variant="contained" color="default"><HashLink className={styles1.link2} to="index#contactus">Contact Us</HashLink></Button>
                </div>

            </div>
            <div className={styles1.bestseeling} id="best-selling">

                <h1 className={styles1.producbestselling}>All the best items for you</h1>
                <h1 className={styles1.producttittlereg}>Best Seller Products</h1>
                <div className={styles1.listmaindiv2}>
                    <div className={styles1.iconlist2}>
                        <div className={styles1.icondiv1}>
                            <div className={styles1.icons2}>

                            </div>
                            {/* <LocationOnIcon className={styles1.icons} /> */}
                        </div>

                    </div>
                    <div className={styles1.iconlist2}>
                        <div className={styles1.icondiv2}>
                            <div className={styles1.icons3}>

                            </div>
                            {/* <ShoppingCartIcon className={styles1.icons} /> */}
                        </div>

                    </div>
                    <div className={styles1.iconlist2}>
                        <div className={styles1.icondiv3}>
                            <div className={styles1.icons3}>

                            </div>
                            {/* <FontAwesomeIcon className={styles1.icons} icon={faArchive} ></FontAwesomeIcon> */}

                        </div>

                    </div>


                </div>
            </div>
            {/* <div class={styles1.gridcontainer} id="brosher">
                <div class={styles1.item2}>
                    <h1 className={styles1.price}>
                        Special Price
                    </h1>
                    <h1 className={styles1.off}>
                        30% OFF
                    </h1>
                    <img src={bucket} className={styles1.bucket}
                    />
                </div>
                <div class={styles1.item3}>
                    <h1 className={styles1.menu2h}>
                        Fresh Fruits
                    </h1>
                    <div className={styles1.maenu2inner}>
                        <h1 className={styles1.menu2off}>
                            60% OFF
                    </h1>
                        <img src={menu2fruites} className={styles1.menu2fruites}
                        />
                    </div>
                </div>
                <div class={styles1.item4}>
                    <h1 className={styles1.menu3h}>
                        Strawbery
                    </h1>
                    <span>
                        <img src={strawbery} className={styles1.menu3fruites}
                        />
                    </span>
                </div>
                <div class={styles1.item5}>
                    <img src={apples} className={styles1.menu4fruites}
                    />
                    <div className={styles1.menu4fruitesinner}>
                        <h1 className={styles1.menu4h}>
                            Fresh Fruit
                    </h1>
                        <h1 className={styles1.menu42h}>
                            10% OFF
                    </h1>
                    </div>

                </div>
            </div> */}
            <div className={styles1.contactus} id="contactus">
                < h1 className={styles1.contacth}>Contact Us</h1>

                <div class={styles1.container}>
                    <form  >
                        <label for="fname" >Full Name</label>
                        <input type="text" value={name} onChange={(e) => {
                            setName(e.target.value)
                        }} id="fname" name="firstname" placeholder="Your name.." />

                        <label for="lname" >Email</label>
                        <input type="text" value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }} id="lname" name="lastname" placeholder="Your email.." />
                        <label for="lname">Subject</label>
                        <input type="text" value={subject} onChange={(e) => {
                            setSubject(e.target.value)
                        }} id="lname" name="lastname" placeholder="Subject.." />


                        <label for="subject">Message</label>
                        <textarea id="subject" value={message} onChange={(e) => {
                            setMessage(e.target.value)
                        }} name="subject" placeholder="Write something.." style={{ height: "200px" }}></textarea>

                        <Button onClick={submitForm} variant="contained" color="primary">
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </div >
    );
}