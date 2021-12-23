import { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, makeStyles, Typography } from '@material-ui/core';
import { Button, Checkbox, FormLabel, FormControlLabel, FormHelperText } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import axios from 'axios';
import * as React from 'react';

const useStyles = makeStyles({
    container: {
        width: '50%',
        margin: '5% 0 0 25%',
        '& > *': {
            marginTop: 20
        }
    }
})

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const EditStock = () => {
    const classes = useStyles();
    let history = useNavigate();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const [stock, setStock] = useState({});
    const { code } = useParams();
    const [categoryList, setCategoryList] = useState([]);

    function setStockValue( field, value ) {
        stock[ field ] = value;
        setStock( stock )
        console.log( field, stock[ field ])
    }

    useEffect(() => {
        setLoading(true);

        //  Get stock data
        axios.get(process.env.REACT_APP_API_URL + `/user/stock/${code}`)
        .then(response => {
            let stockData = response.data;
            if( typeof response.data.categories === 'undefined' ) {
                stockData.categories = [];
            }

            setStock( stockData );

            //  Get global categories
            axios.get(process.env.REACT_APP_API_URL + '/stock/category' )
            .then((response) => {
                response.data.map(( item, k ) => {
                    item.selected = false;
                    let cidx = stockData.categories.findIndex( x => x._id === item._id );
                    if( cidx !== -1 ) {
                        item.selected = true;
                    }
                });
                setCategoryList( response.data );
            }).catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        }).finally(()=>{
            setLoading(false);
        });
    }, [code]);

    const editStockDetails = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL + `/stock/${code}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( stock ),
        })

        const data = await response.json()
        if (data.acknowledged == true) {
            history('/admin/stocks');
        } else {
            alert('error');
        }
    }

    const handleChange = (position, item) => {
        if( typeof stock.categories === 'undefined' ) {
            stock.categories = [];
        }

        let idx = stock.categories.findIndex( x => x._id === item._id );
        if( idx === -1 ) {
            item.selected = true;
            stock.categories.push( item );
        }else {
            item.selected = false;
            stock.categories.splice( idx, 1 )
        }

        setStockValue( 'categories', stock.categories )
        return item;
    };

    return (
        <div>
            <FormGroup className={classes.container}>
                <Typography variant="h4">Edit Information</Typography>
                <FormControl>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input onChange={(e) => setStockValue( 'name', e.target.value ) } name="name" type="name" id="name" value={stock.name} aria-describedby="my-helper-text" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="price">Price</InputLabel>
                    <Input onChange={(e) => setStockValue( 'price', e.target.value ) } name="price" id="price" type="number" value={stock.price} aria-describedby="my-helper-text" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="code">Code</InputLabel>
                    <Input onChange={(e) => setStockValue( 'code', e.target.value ) } name="code" id="code" type="text" value={stock.code} aria-describedby="my-helper-text" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="percentage">Percentage</InputLabel>
                    <Input onChange={(e) => setStockValue( 'percentage', e.target.value)} name="percentage" id="percentage" type="number" value={stock.percentage} aria-describedby="my-helper-text" />
                </FormControl><FormControl>
                    <InputLabel htmlFor="marketCap">Market capital</InputLabel>
                    <Input onChange={(e) => setStockValue( 'marketCap', e.target.value)} name="marketCap" id="marketCap" type="number" value={stock.marketCap} aria-describedby="my-helper-text" />
                </FormControl><FormControl>
                    <InputLabel htmlFor="peRatio">Pe Ratio</InputLabel>
                    <Input onChange={(e) => setStockValue( 'peRatio', e.target.value)} name="peRatio" id="peRatio" type="number" value={stock.peRatio} aria-describedby="my-helper-text" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="closePrice">Close Price</InputLabel>
                    <Input onChange={(e) => setStockValue( 'closePrice', e.target.value)} value={stock.closePrice} id="closePrice" aria-describedby="my-helper-text" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="sector">Sector</InputLabel>
                    <Input onChange={(e) => setStockValue( 'sector', e.target.value)} name="sector" id="sector" type="text" value={stock.sector}aria-describedby="sector text" />
                </FormControl>
                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                    <FormLabel component="legend">Categories</FormLabel>
                    <FormGroup>
                        {categoryList && categoryList.map((item, index) => (
                            <FormControlLabel
                                control={
                                    <Checkbox data-checked={item.selected} onChange={() => handleChange(index, item)} name={stock.categories} value={item._id} key={item._id} />
                                }
                                label={item.title}
                            />
                        ))}
                    </FormGroup>
                </FormControl>
                <FormControl>
                    <Button variant="contained" sx={{ mb: 2 }} color="primary" onClick={() => editStockDetails()}>SAVE</Button>
                </FormControl>
            </FormGroup>
        </div>
    )
}

export default EditStock;