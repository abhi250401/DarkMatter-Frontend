import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Link, Outlet } from 'react-router-dom';
import { Grid, Button, Box, IconButton, List, ListItem, ListItemButton, ListItemText, Paper, Pagination, Stack, Snackbar, Container, Typography, Divider, createTheme } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

import Popover from '@mui/material/Popover';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import PlaylistAdd from '@mui/icons-material/PlaylistAdd';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import axios from "axios";
import SettingsIcon from '@mui/icons-material/Settings';
import Navbar from './navbar'
import './home.css'
import { responsiveFontSizes } from '@material-ui/core';
import { BusinessCenterOutlined } from '@material-ui/icons';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

export default function Home(props) {
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const navigate = useNavigate();
    const [text, setText] = useState('')
    const [wishlistData, setwishlistData] = useState([])
    const [data, setdata] = useState(null);
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [suggestion, setSuggestion] = useState([])
    const [page, setPage] = React.useState(1);
    const [stock, setStock] = React.useState('');
    const [stockPrice, setStockPrice] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [message, setMessage] = React.useState('success');
    const [status, setStatus] = React.useState('success');
    const vertical = 'top';
    const [color, setColor] = React.useState('');
    const horizontal = 'center';
    const [value, setValue] = React.useState('ClosePrice');
    const [sortBy, setSortby] = React.useState('A-Z');
    const [ChangeBy, setChangeBy] = React.useState('OpenPrice');
    const [ChangeFormat, setChangeFormat] = React.useState('Absolute');

    const SortingArray = [
        sortBy,
        value,
        ChangeFormat
    ]
    localStorage.setItem('SortingList', SortingArray)
    //  console.log(SortingArray[1])

    const handleChange = (event) => {
        setValue(event.target.value);
        setOpen(false)

        //  console.log(value);
    };
    const handleChangeFormat = (event) => {
        setChangeFormat(event.target.value);


    };
    const handleClick = () => {
        setOpen(true);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClickP = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(false)
    };
    const ChangeSortBy = () => {
        setSortby()
    }

    const handleCloseP = () => {
        setAnchorEl(null);
    };

    const open1 = Boolean(anchorEl);
    const id = open1 ? 'simple-popover' : undefined;
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(false);
        setOpen(false);
    };

    const getUserWishlist = async function (listId) {
        setLoading(true);
        setSuggestion([]);
        await axios.get(process.env.REACT_APP_API_URL + `/user/wishlist/${props.user.userID}/${listId}`).then(response => {
            setwishlistData(response.data.data);



        }).catch(err => {

            console.log(err);
        })
    }


    const selectUserWishlist = async (event, listId) => {
        setPage(listId);
        getUserWishlist(listId);
        /*if( props.user && props.user.userID ) {
            await axios.get(process.env.REACT_APP_API_URL + `/user/wishlist/${props.user.userID}/${value}`).then(response => {
                setwishlistData(response.data.data);
                setLoading(true);
            }).catch(err => {
                console.log(err);
            })
        }*/
    }

    async function removeFromWatchlist(suggestion) {
        if (!props.user || !props.user.userID) {
            console.log('Invalid user');
            return;
        }

        const response = await fetch(process.env.REACT_APP_API_URL + `/user/wishlist/${suggestion._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: props.user.userID,
                listId: page,
                stockId: stock._id,
                stockName: stock.name,

            }),
        })


        getUserWishlist(page);
        setOpen(true)
    }
    const sortedList = async (prop) => {


        await axios.get(process.env.REACT_APP_API_URL + `/user/sorted/wishlist/${props.user.userID}/${SortingArray}/${prop}`).then(response => {
            setwishlistData(response.data.data);



        }).catch(err => {

            console.log(err);
        })
    }



    useEffect(() => {
        const loadApiData = async () => {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/admin/stocks');
            setApiData(response.data)
            // console.log(response.data)
        };

        //  loadApiData();

        /*const fetchWishlistData = async () => {
            await axios.get(process.env.REACT_APP_API_URL + `/user/wishlist/${props.user.userID}/0`).then(response => {
                setwishlistData(response.data.data);
                setLoading(true);
            }).catch(err => {
                console.log(err);
            })
        }*/

        // if( props.user && props.user.userID ) {}

        // loadApiData();
        // fetchWishlistData();
        getUserWishlist(1);
    }, [])

    const stockDetails = (stock) => {
        navigate(`/stock/${stock.stockCode}`);

        /*setStock(stock.stockName);
        axios.get(process.env.REACT_APP_API_URL + `/stockone/${stock.stockId}`).then((response) => {
            setStockPrice(response.data.marketCapital);
    
        }).catch((err) => {
            setError(true);
            console.log(err);
        })*/
    }

    const searchStock = (text) => {
        let matches = [];

        const loadApiData = async () => {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/admin/stocks');
            setApiData(response.data)


        }

        if (!apiData.length) {
            loadApiData();
        }

        if (text.length >= 3) {
            matches = apiData.filter(stock => {

                if (stock.name) {
                    const regex = new RegExp(`${text}`, 'gi');
                    return stock.name.match(regex);
                }
            })
        }
        setSuggestion(matches);
        setText(text);
    }
    const theme = createTheme({
        overrides: {
            // Name of the component
            MuiListItem: {
                // Name of the rule
                root: {
                    // Some CSS
                    borderBottom: "3px solid rgb(212, 212, 212)"
                },
            },
        },
    });
    async function addtoWishlist(stock) {
        if (!props.user || !props.user.userID) {
            console.log('Invalid user');
            return;
        }

        const response = await fetch(process.env.REACT_APP_API_URL + '/user/wishlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: props.user.userID,
                listId: page,
                stockId: stock._id,
                stockName: stock.name,
                code: stock.code
            }),
        }).then((response) => {
            console.log(response);
            setOpen(true);
            setText('');
            getUserWishlist(page);
        }).catch(() => {
            setError(true);
        });

    }

    function renderRow(props) {

        console.log(props);

        return (
            <ListItem key={props._id} component="div" disablePadding>
                <ListItemButton>
                    <ListItemText primary={`Add Wishlist  ${props.name}`} />
                </ListItemButton>
            </ListItem>
        );
    }

    if (!props.user || !props.user.userID)
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "white", height: "100vh" }}><h1 style={{ color: "black" }}>No access ...
                <Link to="/login" > Login</Link>  </h1></div >
        );
    return (
        <div>
            <Navbar {...props} />
            <div>
                <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
                <Grid container component="main" sx={{ height: 'calc( 100vh - 102px )' }}>
                    <Grid item xs={3} style={{
                        position: 'relative', zIndex: 0
                    }}>
                        {/*<Stack>
                            <Autocomplete
                                freeSolo
                                id="search-stocks"
                                disableClearable
                                options={suggestion.map((suggestion) => suggestion.name)}
                                autoHighlight


                                renderInput={(params) => (
                                    <div style={{ color: "black" }}> <TextField
                                        onChange={(e) => searchStock(e.target.value)}
                                        {...params}

                                        label="Search stock..."
                                        variant="filled"
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'search',

                                        }}
 </Stack>
                                    />

                                    </div>
                                )}

                                    />*/}
                        <div class="search-wrapper" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <input style={{ padding: '.5rem', width: '93%', margin: '5px', border: '1px solid #ccc', borderRadius: '4px' }} value={text} placeholder="Search..." onChange={(e) => searchStock(e.target.value)} />

                            {/*suggestion && suggestion.map((suggestion, i) =>
                                <div class="auto-container"><div class="autoContainer"
                                    style={{
                                        color: "black",
                                        display: "flex",
                                        alignItems: "center",
                                        height: "auto",
                                        paddingRight: "0.4em"
                                    }} key={i}>
                                    <span> {suggestion.name} </span>
                                    <a
                                        style={{
                                            paddingLeft: "1.2em",
                                            color: "blue", cursor:
                                                "pointer"
                                        }}
                                        onClick={() => addtoWishlist(suggestion)}>Add</a></div></div>
                            )
                            }

                            {/* <div style={{ marginTop: "5vh", marginLeft: "2vh", padding: "0.9em" }}>{
                                loading && wishlistData && wishlistData.map((suggestion) =>
                                    <div><div style={{ padding: "0.5em", color: "black", display: "flex", alignItems: "center", height: "auto" }} key={suggestion.stockId}>{suggestion.stockName} </div></div>
                                )
                                 }
                                 </div>
                              */}
                            {/*
                                suggestion && suggestion.map((suggestion, i) =>

                                    <FixedSizeList
                                        height={200}
                                        width={200}
                                        itemSize={20}
                                        itemCount={suggestion.length}
                                        overscanCount={5}
                                    >
                                        {renderRow(suggestion)}
                                    </FixedSizeList>
                            )*/}

                            <List className={(suggestion && suggestion.length) ? 'show' : 'hide'} sx={{
                                width: '100%',
                                // maxWidth: 330,
                                bgcolor: '#fff',
                                position: 'absolute',
                                overflow: 'auto',
                                // maxHeight: 300,
                                '& ul': { padding: 0 },
                                top: '2.25rem',
                                backgroundColor: '#fff',
                                height: '75%',
                                left: 0,
                                right: 0,
                                bottom: 0,
                                zIndex: 1,
                            }}>
                                {suggestion && suggestion.map((suggestion, i) => (
                                    <ListItem
                                        key={suggestion._id}
                                        // disablePadding
                                        secondaryAction={
                                            <div>
                                                <IconButton disablePadding>
                                                    <PlaylistAdd onClick={() => addtoWishlist(suggestion)} color="primary" />
                                                </IconButton>
                                                <IconButton >
                                                    <AnalyticsIcon />
                                                </IconButton>
                                                <IconButton>
                                                    <CompareArrowsIcon />
                                                </IconButton>
                                            </div>
                                        }
                                    >
                                        <ListItemText style={{ color: "black" }} primary={`${suggestion.code}`} />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                        {/* <p style={{ color: "black", marginLeft: "15px", fontWeight: "200", background: "" }}> Wishlist {page}</p>*/}
                        {
                            loading && wishlistData && wishlistData.map((suggestion) =>

                                <MuiThemeProvider theme={theme}>

                                    <ListItem key={suggestion.stockId} component="div" disablePadding style={{ border: "2px", borderBlockColor: "black", borderBottomColor: "black" }}>
                                        <ListItemButton onClick={() => { navigate(`/user/stock/${suggestion.stockId.code}`) }} style={{ color: "black", }}>
                                            {suggestion.stockId.closePrice > 100 ?
                                                (<Grid container direction="row" alignItems="center" ><ListItemText sx={{ color: "green", minWidth: "50%" }}
                                                    primaryTypographyProps={{ fontSize: '0.8rem' }}
                                                    secondaryTypographyProps={{ fontSize: '0.7rem' }}
                                                    primary={suggestion.stockId.code}
                                                />
                                                    <BusinessCenterIcon sx={{ color: "gray", mr: 1 }} />
                                                    <ListItemText sx={{ color: "gray", width: "5%", }}
                                                        primaryTypographyProps={{ fontSize: '0.8rem' }}
                                                        secondaryTypographyProps={{ fontSize: '0.7rem' }}
                                                        primary="0"
                                                    />
                                                    {value === 'ClosePrice' ? (<ListItemText sx={{ color: "green" }}
                                                        primaryTypographyProps={{ fontSize: '0.8rem' }}
                                                        secondaryTypographyProps={{ fontSize: '0.7rem' }}
                                                        primary={suggestion.stockId.closePrice}

                                                    />) : (<ListItemText sx={{ color: "green" }}
                                                        primaryTypographyProps={{ fontSize: '0.8rem' }}
                                                        secondaryTypographyProps={{ fontSize: '0.7rem' }}
                                                        primary={suggestion.stockId.price}

                                                    />)}

                                                    <KeyboardArrowUpIcon sx={{ mr: 2 }} />
                                                    <ListItemText sx={{ color: "green" }}
                                                        primaryTypographyProps={{ fontSize: '0.8rem' }}
                                                        secondaryTypographyProps={{ fontSize: '0.7rem' }}
                                                        primary='0'

                                                    />{ChangeFormat === 'Percentage' ? ('%') : null}
                                                </Grid>) :
                                                (<Grid container direction="row" alignItems="center" >
                                                    <ListItemText sx={{ color: "red", minWidth: "50%", }}
                                                        primaryTypographyProps={{ fontSize: '0.8rem' }}
                                                        secondaryTypographyProps={{ fontSize: '0.7rem' }}
                                                        primary={suggestion.stockId.code}
                                                    />
                                                    <BusinessCenterIcon sx={{ color: "gray", mr: 1 }} />
                                                    <ListItemText sx={{ color: "gray", width: "5%", }}
                                                        primaryTypographyProps={{ fontSize: '0.8rem' }}
                                                        secondaryTypographyProps={{ fontSize: '0.7rem' }}
                                                        primary="0"
                                                    />
                                                    {value === 'ClosePrice' ? (<ListItemText sx={{ color: "red" }}
                                                        primaryTypographyProps={{ fontSize: '0.8rem' }}
                                                        secondaryTypographyProps={{ fontSize: '0.7rem' }}
                                                        primary={suggestion.stockId.closePrice}

                                                    />) : (<ListItemText sx={{ color: "red" }}
                                                        primaryTypographyProps={{ fontSize: '0.8rem' }}
                                                        secondaryTypographyProps={{ fontSize: '0.7rem' }}
                                                        primary={suggestion.stockId.price}

                                                    />)}

                                                    <KeyboardArrowDownIcon sx={{ m: 0, mr: 2 }} disablePadding />

                                                    <ListItemText sx={{ color: "red" }}
                                                        primaryTypographyProps={{ fontSize: '0.8rem' }}
                                                        secondaryTypographyProps={{ fontSize: '0.7rem' }}
                                                        primary='0'

                                                    />{ChangeFormat === 'Percentage' ? ('%') : null}
                                                </Grid>)}

                                        </ListItemButton>
                                        <IconButton disablePadding>
                                            <DeleteIcon onClick={() => removeFromWatchlist(suggestion)} />
                                        </IconButton>
                                    </ListItem>
                                    <Divider sx={{ color: "gray", width: "100%" }} />
                                </MuiThemeProvider>


                            )}

                        <Stack style={{ position: 'absolute', bottom: '.25rem', marginTop: "20px", left: '0.2rem', }}>
                            <Grid container direction="row" alignItems="center" >
                                <Pagination count={5} hidePrevButton hideNextButton page={page} variant="outlined" shape="rounded" onChange={selectUserWishlist} />
                                <Popover
                                    open={open1}
                                    anchorEl={anchorEl}
                                    onClose={handleCloseP}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                >
                                    <Grid container direction="row" alignItems="center" sx={{ width: "200px" }}>

                                        <Container>
                                            <Typography >Sort By</Typography>
                                            <Button sx={{ m: "8px" }} onClick={() => sortedList('A-Z')} variant="contained">A-Z</Button>
                                            <Button variant="contained" onClick={() => sortedList('%')}>%</Button>

                                        </Container>
                                        <Container>
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">Change</FormLabel>
                                                <RadioGroup

                                                    name="controlled-radio-buttons-group"
                                                    value={value}
                                                    onChange={handleChange}
                                                >
                                                    <FormControlLabel value="OpenPrice" control={<Radio />} label="OpenPrice" />
                                                    <FormControlLabel value="ClosePrice" control={<Radio />} label="ClosePrice" />
                                                </RadioGroup>
                                            </FormControl>

                                        </Container>
                                        <Divider sx={{ color: "gray", width: "170px" }} variant="middle" />

                                        <Container sx={{ mt: "10px" }}>
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">Change Format</FormLabel>
                                                <RadioGroup
                                                    aria-label="Change"
                                                    name="controlled-radio-buttons-group"
                                                    onChange={handleChangeFormat}
                                                    value={ChangeFormat}
                                                >
                                                    <FormControlLabel value="Percentage" control={<Radio />} label="Percentage" />
                                                    <FormControlLabel value="Absolute" control={<Radio />} label="Absolute" />

                                                </RadioGroup>
                                            </FormControl>


                                        </Container>


                                    </Grid>
                                </Popover>    <SettingsIcon color="primary" sx={{ ml: 18 }} aria-describedby={id} onClick={handleClickP} /></Grid>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9} component={Paper} elevation={2} square style={{ color: "#000", padding: '.5rem 2rem', zIndex: 1 }}>
                        <Outlet />
                    </Grid>
                </Grid>
            </div >
        </div >
    )
}
