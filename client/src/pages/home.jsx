import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Grid, Autocomplete, ListItem, ListItemButton, Box, ListItemText, Paper, Pagination, Stack, TextField } from '@mui/material';
import axios from "axios";
import Navbar from './navbar'
import SearchBar from "material-ui-search-bar";
import List from '@mui/material/List';
import MuiAlert from '@mui/material/Alert';

import DeleteIcon from '@mui/icons-material/Delete';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import './home.css'
import { ControlCameraSharp, PlaylistAdd } from '@mui/icons-material';
import { FixedSizeList } from 'react-window';
export default function Home(props) {
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });


    const history = useNavigate();
    const [text, setText] = useState('')
    const [wishlistData, setwishlistData] = useState([])
    const [data, setdata] = useState(null);
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [suggestion, setSuggestion] = useState([])
    const [page, setPage] = React.useState(1);
    const [stock, setStock] = React.useState('');
    const [stockPrice, setStockPrice] = React.useState('');
    const getUserWishlist = async function (listId) {
        setLoading(true);
        await axios.get(process.env.REACT_APP_API_URL + `/user/wishlist/${props.user.userID}/${listId}`).then(response => {
            setwishlistData(response.data.data);
            <Alert severity="error">This is an error message!</Alert>
        }).catch(err => {
            return <Alert severity="error">This is an error message!</Alert>
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
    }

    useEffect(() => {
        const loadApiData = async () => {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/admin/stocks');
            setApiData(response.data)
        }
        loadApiData();

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



    const stockDetails = (wishlistData) => {
        setStock(wishlistData.stockName);


        axios.get(process.env.REACT_APP_API_URL + `/stockone/${wishlistData.stockId}`).then((response) => {
            setStockPrice(response.data.price);





        }).catch((err) => {
            console.log(err);
        })

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

        if (text.length > 0) {
            matches = apiData.filter(stock => {
                const regex = new RegExp(`${text}`, 'gi');
                return stock.name.match(regex);
            })
        }
        setSuggestion(matches);
        setText(text);
    }

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

            }),
        }).then(() => {

            console.log(response);
        }).catch(() => {
            return

        })





        getUserWishlist(page);
        /*await axios.get(process.env.REACT_APP_API_URL + `/user/wishlist/${props.user.userID}/${page}`).then(response => {
            setwishlistData(response.data.data);
        }).catch(err => {
            console.log(err);
        })*/

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
                <Grid container component="main" sx={{ height: 'calc( 100vh - 102px )' }}>
                    <Grid item xs={3} style={{
                        position: 'relative'
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

                        <input style={{ padding: "8px", width: "80%", margin: "7px" }} value={text} placeholder="search" onChange={(e) => searchStock(e.target.value)} />
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

                        {suggestion && suggestion.map((suggestion, i) => (
                            <List sx={{
                                width: '95%',
                                maxWidth: 330,
                                bgcolor: 'background.paper',
                                position: 'relative',
                                overflow: 'auto',
                                maxHeight: 300,
                                '& ul': { padding: 0 },
                            }}> <ListItem
                                key={suggestion._id}
                                disableGutters

                                disablePadding
                                secondaryAction={
                                    <IconButton disablePadding>
                                        <PlaylistAdd onClick={() => addtoWishlist(suggestion)} color="primary" />
                                    </IconButton>
                                }
                            >
                                    <ListItemText style={{ color: "black", marginLeft: "17px" }} disablePadding primary={`${suggestion.name}`} />
                                </ListItem>
                            </List>
                        ))}
                        <p style={{ color: "black", marginLeft: "15px", fontWeight: "200", background: "" }}> Wishlist {page}</p>

                        {
                            loading && wishlistData && wishlistData.map((suggestion) => <ListItem key={suggestion.stockId} component="div" disablePadding>

                                <ListItemButton onClick={() => { stockDetails(suggestion) }} style={{ color: "black" }}>

                                    <ListItemText onClick={() => { stockDetails(suggestion) }} primary={suggestion.stockName} />

                                </ListItemButton><IconButton disablePadding>
                                    <DeleteIcon onClick={() => removeFromWatchlist(suggestion)} color="primary" />
                                </IconButton>
                            </ListItem>
                            )}
                        <Stack style={{ position: 'absolute', bottom: '.25rem', marginTop: "20px", left: '2rem' }}>
                            <Pagination count={5} hidePrevButton hideNextButton page={page} variant="outlined" shape="rounded" onChange={selectUserWishlist} />
                        </Stack>


                    </Grid>
                    <Grid item xs={12} sm={8} md={9} component={Paper} elevation={2} square style={{ color: "#000", padding: '.5rem 2rem' }}>
                        <h3>Hi {props.user.name}!</h3>

                        <h1 style={{ color: "black", fontFamily: "Helvetica" }}>{stock}</h1>
                        <p style={{ fontFamily: "Helvetica" }}> {stock !== '' ? <span>Price : </span> : null}
                            {stockPrice
                            }</p>

                    </Grid>
                </Grid>
            </div>
        </div >
    )
}
