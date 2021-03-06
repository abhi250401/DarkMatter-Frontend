import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import axios from "axios";
import { accordionClasses, Icon } from '@mui/material';
import Navbar from './navbar'

export default function Home( props ) {
    const history = useNavigate();
    const [text, setText] = useState('')
    const [wishlistData, setwishlistData] = useState([])
    const [data, setdata] = useState(null);
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [suggestion, setSuggestion] = useState([])

    useEffect(() => {
        const loadApiData = async () => {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/admin/stocks');
            console.log(response.data);
            setApiData(response.data)
            console.log(apiData)
        }

        const fetchWishlistData = async () => {
            await axios.get(process.env.REACT_APP_API_URL + `/user/wishlist/${props.user.userID}/0`).then(response => {
                console.log(response);
                setwishlistData(response.data.data);
                console.log(wishlistData);
                setLoading(true);
            }).catch(err => {
                console.log(err);
            })
        }

        if( props.user && props.user.userID ) {
            loadApiData();
            fetchWishlistData();
        }
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


    async function addtoWishlist(suggestionName, suggestionId, listID ) {
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
                stockName: suggestionName,
                listId: listID,
                userId: props.user.userID,
                stockId: suggestionId,
            }),
        });

        if ( response.status === 'success' ) {
            await axios.get(process.env.REACT_APP_API_URL + `/user/wishlist/${ props.user.userID }/${ listID }`).then(response => {
                console.log(response);
                setwishlistData(response.data.data);

                console.log(wishlistData);
                setLoading(true);
            }).catch(err => {
                console.log(err);
            });
        }
    }

    if( !props.user || !props.user.userID )
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
                    <input value={text} placeholder="search" onChange={(e) => onChangeHandler(e.target.value)} />
                    {suggestion && suggestion.map((suggestion, i) =>
                        <div><div style={{ color: "black", display: "flex", alignItems: "center", height: "auto", paddingRight: "0.4em" }} key={i}>{suggestion.name} <a style={{ paddingLeft: "1.2em", color: "blue", cursor: "pointer" }} onClick={() => addtoWishlist(suggestion.name, suggestion._id, 0 )}>Add</a></div></div>
                    )
                    }
                </div>
                <div style={{ marginTop: "5vh", marginLeft: "2vh", padding: "0.9em" }}>{
                    loading && wishlistData && wishlistData.map((suggestion) =>
                        <div><div style={{ padding: "0.5em", color: "black", display: "flex", alignItems: "center", height: "auto" }} key={suggestion.stockId}>{suggestion.stockName} </div></div>
                    )
                }

                </div>
            </div>
        </div >
    )
}
