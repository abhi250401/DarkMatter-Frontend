import { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, makeStyles, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import axios from 'axios';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [marketCap, setMarketCap] = useState('');
    const [closePrice, setclosePrice] = useState(0);
    const [codes, setcodes] = useState('')
    const [sector, setsector] = useState('')
    const [peRatio, setpeRatio] = useState('')
    const [percentage, setPercentage] = useState('')
    const { code } = useParams();
    const id = code
    const [category, setCategory] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [categoryData, setCategoryData] = useState([]);
    const classes = useStyles();
    let history = useNavigate();

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + `/user/stock/${code}`)
            .then(response => {
                // console.log(response.data);
                setLoading(true);
                console.log(response.data);
                setName(response.data.name);
                setPrice(response.data.price);
                setsector(response.data.sector);
                setpeRatio(response.data.peRatio);
                setPercentage(response.data.percentage);
                setclosePrice(response.data.closePrice);
                setMarketCap(response.data.marketCapital);
                setcodes(response.data.code);

            }).catch(err => {
                console.log(err);
            })
        axios.get(process.env.REACT_APP_API_URL + '/stock/category', {
            params: {
                code: code,
            }
        }).then((response) => {
            setCategoryData(response.data);
        }).catch(() => {

        })
        axios.get(process.env.REACT_APP_API_URL + '/stock/category', {

        }).then((response) => {
            setCategoryList(response.data);
        }).catch(() => {

        })


    }, [code]);

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');


    const editStockDetails = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL + `/stock/${code}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                price,
            }),
        })

        const data = await response.json()
        if (data.acknowledged == true) {
            // alert('successfull')
            history('/admin/stocks'); console.log(data);
        } else {
            alert('error');
        }
    }
    const addCategory = () => {
        if (category === '')
            return;
        axios.post(process.env.REACT_APP_API_URL + '/stock/category', {
            code: id,
            title: category,
        }).then((response) => {
            console.log(response.data);

        }).catch((err) => {
            console.log(err);
        })
    }



    return (
        <div>
            <FormGroup className={classes.container}>
                <Typography variant="h4">Edit Information</Typography>
                <FormControl>
                    <InputLabel htmlFor="my-input">Name</InputLabel>
                    <Input onChange={(e) => setName(e.target.value)} name="name" type="name" id="name" value={name} id="my-input" aria-describedby="my-helper-text" />
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="my-input">Price</InputLabel>
                    <Input onChange={(e) => setPrice(e.target.value)} name="price" id="price" type="price" value={price} id="my-input" aria-describedby="my-helper-text" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Code</InputLabel>
                    <Input onChange={(e) => setcodes(e.target.value)} name="price" id="price" type="price" value={code} id="my-input" aria-describedby="my-helper-text" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Percentage</InputLabel>
                    <Input onChange={(e) => setPercentage(e.target.value)} name="price" id="price" type="price" value={percentage} id="my-input" aria-describedby="my-helper-text" />
                </FormControl><FormControl>
                    <InputLabel htmlFor="my-input">Market capital</InputLabel>
                    <Input onChange={(e) => setMarketCap(e.target.value)} name="price" id="price" type="price" value={marketCap} id="my-input" aria-describedby="my-helper-text" />
                </FormControl><FormControl>
                    <InputLabel htmlFor="my-input">Pe Ratio</InputLabel>
                    <Input onChange={(e) => setpeRatio(e.target.value)} name="price" id="price" type="price" value={peRatio} id="my-input" aria-describedby="my-helper-text" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Close Price</InputLabel>
                    <Input onChange={(e) => setclosePrice(e.target.value)} value={closePrice} id="my-input" aria-describedby="my-helper-text" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Sector</InputLabel>
                    <Input onChange={(e) => setsector(e.target.value)} name="price" id="price" type="price" value={sector} id="my-input" aria-describedby="my-helper-text" />
                </FormControl>
                <Button onClick={handleOpen}>Add Category </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>


                        <FormControl>
                            <InputLabel htmlFor="my-input">Title</InputLabel>
                            <Input onChange={(e) => setCategory(e.target.value)} name="category" type=" category" value={category} id="my-input" aria-describedby="my-helper-text" />

                            <Button variant="contained" sx={{ mt: 2 }} color="primary" onClick={() => addCategory()}>Add Category</Button>
                        </FormControl>
                    </Box>
                </Modal>
                <FormControl>
                    <Button variant="contained" sx={{ mb: 2 }} color="primary" onClick={() => editStockDetails()}>Edit Stock</Button>
                </FormControl>
            </FormGroup>
            <FormGroup>
                <InputLabel htmlFor="my-input">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"

                    label="Age"

                >{categoryData ? (categoryData.map((data) => (<MenuItem >{data.title}</MenuItem>))) : null}


                </Select>
            </FormGroup>
            <FormGroup>
                <InputLabel htmlFor="my-input">All Categories</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"

                    label="Age"

                >{categoryList && categoryList.map((data) => (<MenuItem >{data.title}</MenuItem>))}


                </Select>
            </FormGroup>
        </div >

    )
}

export default EditStock;