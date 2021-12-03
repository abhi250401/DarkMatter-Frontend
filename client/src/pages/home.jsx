import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Grid, Autocomplete, ListItem, ListItemButton, ListItemText, Paper, Pagination, Stack, TextField } from '@mui/material';
import axios from "axios";
import Navbar from './navbar'

export default function Home(props) {

    const history = useNavigate();
    const [text, setText] = useState('')
    const [wishlistData, setwishlistData] = useState([])
    const [data, setdata] = useState(null);
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [suggestion, setSuggestion] = useState([])
    const [page, setPage] = React.useState(1);

    const getUserWishlist = function( listId ){
        setLoading(true);
        return axios.get(process.env.REACT_APP_API_URL + `/user/wishlist/${props.user.userID}/${listId}`).then(response => {
            setwishlistData(response.data.data);
            setLoading(false);
        }).catch(err => {
            console.log(err);
        })
    }

    const selectUserWishlist = async (event, listId) => {
        setPage(listId);
        getUserWishlist( listId );
        /*if( props.user && props.user.userID ) {
            await axios.get(process.env.REACT_APP_API_URL + `/user/wishlist/${props.user.userID}/${value}`).then(response => {
                setwishlistData(response.data.data);
                setLoading(true);
            }).catch(err => {
                console.log(err);
            })
        }*/
    }

    useEffect(() => {
        const loadApiData = async () => {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/admin/stocks');
            setApiData(response.data)
        }

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
        getUserWishlist( 0 );
    }, [])

    const searchStock = (text) => {
        let matches = [];

        const loadApiData = async () => {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/admin/stocks');
            setApiData(response.data)
        }

        if( !apiData.length ) {
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

    async function addtoWishlist( stock ) {
        if( !props.user || !props.user.userID ) {
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
        })

        if (response.status === 'success') {
            getUserWishlist( page );
            /*await axios.get(process.env.REACT_APP_API_URL + `/user/wishlist/${props.user.userID}/${page}`).then(response => {
                setwishlistData(response.data.data);
            }).catch(err => {
                console.log(err);
            })*/
        }
    }

    if( !props.user || !props.user.userID )
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "white", height: "100vh" }}><h1 style={{ color: "black" }}>No access ...
                <Link to="/login" > Login</Link>  </h1></div >
        );
    return (
        <div>
            <Navbar {...props} />
            <div>
                <Grid container component="main" sx={{ height: 'calc( 100vh - 102px )' }}>
                  <Grid item xs={3} style={{ position : 'relative' }}>
                     <Stack>
                        <Autocomplete
                            freeSolo
                            id="search-stocks"
                            disableClearable
                            options={suggestion.map((suggestion) => suggestion.name)}
                            renderInput={(params) => (
                                <div> <TextField
                                    onChange={(e) => searchStock(e.target.value)}
                                    {...params}
                                    label="Search stock..."
                                    variant="filled" 
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                                </div>
                            )}
                        />
                        {/*<input value={text} placeholder="search" onChange={(e) => searchStock(e.target.value)} />*/}
                        {suggestion && suggestion.map((suggestion, i) =>
                            <div><div style={{ color: "black", display: "flex", alignItems: "center", height: "auto", paddingRight: "0.4em" }} key={i}>
                                {suggestion.name} <a style={{ paddingLeft: "1.2em", color: "blue", cursor: "pointer" }}
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

                        {
                            loading && wishlistData && wishlistData.map((suggestion) => <ListItem key={suggestion.stockId} component="div" disablePadding>
                                <ListItemButton style={{ color: "black" }}>
                                    <ListItemText primary={suggestion.stockName} />
                                </ListItemButton>
                            </ListItem>
                            )}
                    </Stack>
                    <Stack style={{ position: 'absolute', bottom: '.25rem', left : '2rem' }}>
                        <Pagination count={5} hidePrevButton hideNextButton page={page} variant="outlined" shape="rounded" onChange={selectUserWishlist} />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9} component={Paper} elevation={2} square style={{ color: "#000", padding : '.5rem 2rem' }}>
                        <h3>Hi { props.user.name }!</h3>
                  </Grid>
                </Grid>
            </div>
        </div>
    )
}
