import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import jwt from 'jsonwebtoken';
import { useNavigate } from 'react-router';
import axios from "axios";
import jwt_decode from "jwt-decode"
import { accordionClasses, Icon } from '@mui/material';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { InputAdornment } from '@mui/material';

import ListItemText from '@mui/material/ListItemText';
export default function Home(props) {

    const history = useNavigate();
    const [text, setText] = useState('')
    const [wishlistData, setwishlistData] = useState([])
    const [data, setdata] = useState(null);
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [suggestion, setSuggestion] = useState([])

    const token = localStorage.getItem('token');

    const tok = jwt_decode(token);
    console.log(tok);
    const [page, setPage] = React.useState(1);
    const handleChange = async (event, value) => {
        setPage(value);
        const token = localStorage.getItem('token');

        const tok = jwt_decode(token);
        console.log(tok);
        if (tok) {
            const userId = tok._id
            await axios.get(process.env.REACT_APP_API_URL + `/user/wishlist/${userId}/${value}`).then(response => {
                console.log(response);
                setwishlistData(response.data.data);

                console.log(wishlistData);
                setLoading(true);
            }).catch(err => {
                console.log(err);
            })



        }
    }



    useEffect(() => {


        const loadApiData = async () => {
            const token = localStorage.getItem('token');


            const response = await axios.get(process.env.REACT_APP_API_URL + '/admin/stocks');
            console.log(response.data);
            setApiData(response.data)
            console.log(apiData)
        }

        const fetchWishlistData = async () => {
            const token = localStorage.getItem('token');

            const tok = jwt_decode(token);
            console.log(tok);
            if (tok) {
                const userId = tok._id
                await axios.get(process.env.REACT_APP_API_URL + `/user/wishlist/${userId}/${page}`).then(response => {
                    console.log(response);
                    setwishlistData(response.data.data);

                    console.log(wishlistData);
                    setLoading(true);
                }).catch(err => {
                    console.log(err);
                })



            }


        }

        loadApiData();
        fetchWishlistData();

    }, [])
    const onChangeHandler = (text) => {
        let matches = [];
        if (text.length > 0) {
            matches = apiData.filter(stock => {
                const regex = new RegExp(`${text}`, "gi");
                return stock.name.match(regex);
            })
        }

        setSuggestion(matches);
        setText(text);
        console.log(suggestion);
    }


    async function addtoWishlist(suggestionName, suggestionId) {
        const tok = jwt_decode(token);
        console.log(tok);
        if (tok) {
            const userId = tok._id;
            console.log(userId);
            const response = await fetch(process.env.REACT_APP_API_URL + '/user/wishlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                    stockName: suggestionName,
                    listId: page,
                    userId: userId,
                    stockId: suggestionId,
                }),
            })
            if (response.status !== "error") {

                const token = localStorage.getItem('token');

                const tok = jwt_decode(token);
                console.log(tok);
                if (tok) {
                    const userId = tok._id
                    await axios.get(process.env.REACT_APP_API_URL + `/user/wishlist/${userId}/${page}`).then(response => {
                        console.log(response);
                        setwishlistData(response.data.data);

                        console.log(wishlistData);

                    }).catch(err => {
                        console.log(err);
                    })



                }
            }
        }
    }



    if (!tok)
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "white", height: "100vh" }}><h1 style={{ color: "black" }}>No access ...
                <Link to="/login" > Login</Link>  </h1></div >
        );
    return (
        <div>

            <div style={{ backgroundColor: "#36454f", height: "5vh", fontSize: "0.8em", justifyContent: "center", alignItems: "center", display: "flex" }}>
                TICKER COMES HERE....
            </div>
            <Navbar {...props} />
            <div>
                <div style={{ marginTop: "2vh", marginLeft: "2vh" }}>
                    {/*} <Stack spacing={2} sx={{ width: 300 }}>

                        <Autocomplete
                            freeSolo
                            id="free-solo-2-demo"
                            disableClearable
                            options={suggestion.map((suggestion) => suggestion.name)}
                            renderInput={(params) => (
                                <div> <TextField
                                    onChange={(e) => onChangeHandler(e.target.value)}
                                    {...params}

                                    label="Search input"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',

                                    }}


                                />

                                </div>

                            )}
                        />
                    </Stack>*/}
                    <input value={text} placeholder="search" onChange={(e) => onChangeHandler(e.target.value)} />
                    {suggestion && suggestion.map((suggestion, i) =>
                        <div><div style={{ color: "black", display: "flex", alignItems: "center", height: "auto", paddingRight: "0.4em" }} key={i}>
                            {suggestion.name} <a style={{ paddingLeft: "1.2em", color: "blue", cursor: "pointer" }}
                                onClick={() => addtoWishlist(suggestion.name, suggestion._id)}>add </a></div></div>
                    )
                    }
                </div>
                {/* <div style={{ marginTop: "5vh", marginLeft: "2vh", padding: "0.9em" }}>{
                    loading && wishlistData && wishlistData.map((suggestion) =>
                        <div><div style={{ padding: "0.5em", color: "black", display: "flex", alignItems: "center", height: "auto" }} key={suggestion.stockId}>{suggestion.stockName} </div></div>
                    )
                }
                </div>
            */}

                <Box
                    sx={{ width: '25%', bgcolor: 'background.paper' }}
                >

                    {
                        loading && wishlistData && wishlistData.map((suggestion) => <ListItem key={suggestion.stockId} component="div" disablePadding>
                            <ListItemButton style={{ color: "black" }}>
                                <ListItemText primary={suggestion.stockName} />
                            </ListItemButton>
                        </ListItem>
                        )}

                </Box>
                \

                <div>
                    <Stack spacing={2} style={{ position: "absolute", bottom: "10px" }}>
                        <Pagination count={5} hidePrevButton hideNextButton page={page} variant="outlined" shape="rounded" onChange={handleChange} />

                    </Stack>

                </div>
            </div>
        </div >
    )
}
