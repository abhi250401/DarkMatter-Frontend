import React, { useEffect, useState, useContext, createContext } from 'react'
import { useNavigate } from 'react-router';
import { Grid, Button, IconButton, List, ListItem, ListItemButton, ListItemText, Pagination, Stack, Snackbar, Container, Typography, Divider, createTheme } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';
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
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

export default function Wishlist(props) {
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const nam = "abhishek";
    const context = createContext(nam);
    const navigate = useNavigate();
    const [text, setText] = useState('')
    const [wishlistData, setwishlistData] = useState([])
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [suggestion, setSuggestion] = useState([])
    const [page, setPage] = React.useState(1);
    const [stock, setStock] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [message, setMessage] = React.useState('success');
    const [status, setStatus] = React.useState('success');
    const vertical = 'top';
    const horizontal = 'center';
    const [value, setValue] = React.useState('ClosePrice');
    const [orderBy, setOrderBy] = React.useState('createdAt')
    const [sortBy, setSortby] = React.useState("desc");
    const [format, setFormat] = React.useState('value');
    const [price, setPrice] = React.useState('close')
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [stockLoad, setStockLoad] = React.useState(false);
    function Loading() {
        return (
            <div>
                <Skeleton height={50} />
                <Skeleton height={50} />
                <Skeleton height={50} />
            </div>
        );
    }
    const SortingArray = [
        sortBy,
        value,
        orderBy,
        price,
        format
    ]
    localStorage.setItem('SortingList', SortingArray)
    //  console.log(SortingArray[1])

    const handleChange = (event) => {
        setValue(event.target.value);
        setOpen(false)

        //  console.log(value);
    };
    const handleChangeFormat = (event) => {
        setFormat(event.target.value);
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleClickP = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(false)
    };

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
        console.log(open)
    };
    const sortedList = () => {
        if (sortBy === "desc")
            setSortby("asc")
        else
            setSortby("desc");


        getUserWishlist(page)
    }

    const getUserWishlist = async function (listId) {
        setLoading(true);
        setSuggestion([]);
        await axios.get(process.env.REACT_APP_API_URL + `/user/wishlist`, {
            params: {
                sortBy,
                orderBy,
                format,
                price,
                listId,
            }
        }).then(response => {
            setwishlistData(response.data.data);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }

    const selectUserWishlist = async (event, listId) => {
        setPage(listId);
        getUserWishlist(listId);
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

    useEffect(() => {
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
        if (text.length === 3 && !apiData.length) {
            setStockLoad(true);
        }
        let matches = [];
        if (text.length >= 3) {
            const loadApiData = async () => {
                const response = await axios.get(process.env.REACT_APP_API_URL + '/admin/stocks', {
                    params: {
                        text: text,
                        limit: 5000,
                        skip: 0,
                        rowsperpage: 5000
                    }
                });

                setApiData(response.data.data)

                setStockLoad(false);


            }
            if (!apiData.length) {
                loadApiData();
            }
            matches = apiData.filter(stock => {
                if (stock.name) {
                    const regex = new RegExp(`${text}`, 'gi');
                    return stock.name.match(regex);
                }
            })
        }
        if (matches.length > 20)
            matches.length = 20
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
    return (
        <Grid id="user-wishlist" item xs={3} style={{
            position: 'relative', zIndex: 0
        }}>
            <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>

            <div className="search-wrapper" style={{ display: 'flex', alignItems: 'end', flexDirection: 'column' }}>
                {stockLoad ? (<CircularProgress size="1.1em" sx={{ mt: 1.7, mr: 1.2 }} style={{ zIndex: '3', position: 'absolute' }} />) : null}
                <input style={{ position: '', padding: '.5rem', width: '93%', margin: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
                    value={text} placeholder="Search..." onChange={(e) => searchStock(e.target.value)} />

                {!stockLoad ? (<List className={(suggestion && suggestion.length) ? 'show' : 'hide'} sx={{
                    width: '100%',
                    // maxWidth: 330,
                    bgcolor: '#fff',
                    position: 'absolute',
                    overflowY: 'auto',
                    // maxHeight: 300,
                    '& ul': { padding: 0 },
                    top: '2.4rem',
                    backgroundColor: '#fff',
                    height: '75%',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1,
                }}>
                    {suggestion && suggestion.map((suggestion, i) => (
                        <ListItem
                            key={i}
                            secondaryAction={
                                <div>
                                    <IconButton onClick={() => addtoWishlist(suggestion)} >
                                        <PlaylistAdd color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => { navigate(`/user/stock/${suggestion.code}/analysis`) }}>
                                        <AnalyticsIcon />
                                    </IconButton>
                                    <IconButton onClick={() => { navigate(`/user/stock/${suggestion.code}/compare`) }} >
                                        <CompareArrowsIcon />
                                    </IconButton>
                                </div>
                            }
                        >
                            <ListItemText primary={`${suggestion.code}`} onClick={() => { navigate(`/user/stock/${suggestion.code}`) }} />
                        </ListItem>
                    ))}
                </List>) : null}
            </div>
            {loading ? (Loading()
            ) : (<div style={{ overflowY: "auto", height: "70vh" }}>
                {wishlistData && wishlistData.map((suggestion, i) =>
                    <ListItem className={(suggestion.stockId.closePrice > 10 ? 'text-success' : 'text-error')} key={i} component="div" disableGutters disablePadding divider aria-label="User stock lists">
                        <ListItemButton onClick={() => { navigate(`/user/stock/${suggestion.stockId.code}`) }}>
                            <Grid container direction="row" alignItems="center" >
                                <ListItemText
                                    sx={{ minWidth: "50%" }}
                                    primary={suggestion.stockId.code}
                                />
                                <BusinessCenterIcon sx={{ color: "#ccc", mr: 1 }} />
                                <ListItemText sx={{ color: "#979797", width: "5%", }}
                                    primary="0"
                                />
                                {value === 'ClosePrice' ? (
                                    <ListItemText
                                        primary={suggestion.stockId.closePrice}
                                    />) : (
                                    <ListItemText
                                        primary={suggestion.stockId.price}
                                    />)}

                                <KeyboardArrowUpIcon sx={{ mr: 2 }} />
                                <ListItemText
                                    primary="0"
                                />{format === 'percentage' ? ('%') : null}
                            </Grid>
                        </ListItemButton>
                        <IconButton onClick={() => removeFromWatchlist(suggestion)}>
                            <DeleteIcon />
                        </IconButton>
                        <Divider />
                    </ListItem>
                )}</div>)}

            <Stack style={{
                position: 'absolute', width: "100%", backgroundColor: "#FAF9F6", padding: "5px", bottom: 0
            }}  >
                < Grid container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center" >
                    <Pagination count={5} hidePrevButton hideNextButton page={page} variant="outlined" shape="rounded" onChange={selectUserWishlist} />
                    <SettingsIcon color="primary" sx={{ mr: 2 }} aria-describedby={id} onClick={handleClickP} />
                </Grid>
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
                            <Button sx={{ m: "8px" }} onClick={() => sortedList()} variant="contained">A-Z</Button>
                            <Button variant="contained" onClick={() => sortedList()}>%</Button>
                        </Container>
                        <Divider sx={{ color: '#979797', width: '100%' }} />
                        <Container>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Change</FormLabel>
                                <RadioGroup
                                    name="controlled-radio-buttons-group"
                                    value={value}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="OpenPrice" control={<Radio />} label="Open Price" />
                                    <FormControlLabel value="ClosePrice" control={<Radio />} label="Close Price" />
                                </RadioGroup>
                            </FormControl>
                        </Container>
                        <Divider sx={{ color: '#979797', width: '100%' }} />
                        <Container sx={{ mt: "10px" }}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Change Format</FormLabel>
                                <RadioGroup
                                    aria-label="Change"
                                    name="controlled-radio-buttons-group"
                                    onChange={handleChangeFormat}
                                    value={format}
                                >
                                    <FormControlLabel value="percentage" control={<Radio />} label="Percentage" />
                                    <FormControlLabel value="value" control={<Radio />} label="Absolute" />
                                </RadioGroup>
                            </FormControl>
                        </Container>
                    </Grid>
                </Popover>
            </Stack>
        </Grid>

    )
}


