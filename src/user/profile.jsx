import { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, makeStyles, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import { ButtonUnstyled } from '@mui/base';

const useStyles = makeStyles({
    container: {
        width: '50%',
        margin: '5% 0 0 25%',
        '& > *': {
            marginTop: 20
        }
    }
})

const EditUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [disabled, setDisabled] = useState(true);
    const classes = useStyles();
    let history = useNavigate();

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + `/userone/${id}`)
            .then(response => {
                console.log(response.data);
                setLoading(true);

                setUser(response.data);
                setName(response.data.name);
                setEmail(response.data.email);

            }).catch(err => {
                console.log(err);
            })
    }, []);
    const Token = {
        _id: `${id}`
    };

    console.log(Token)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [file, setFile] = useState('');
    const edit = () => {
        setDisabled(!disabled);
    }
    console.log(file);
    const submitFile = async () => {

        const formData = new FormData()
        formData.append('profileImg', file)
        axios.put(process.env.REACT_APP_API_URL + `/user/image/${id}`, formData, {
        }).then(res => {
            console.log(res)
        })

    }
    const editUserDetails = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL + `/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
            }),
        })

        const data = await response.json()
        if (data.acknowledged == true) {
            alert('successfull')

        } else {
            alert('error');
        }
    }

    if (!loading)
        return <h1>loading....</h1>;

    return (
        <div>

            <FormGroup disabled="false" className={classes.container}>
                <Typography variant="h4" style={{ display: "flex" }}>User Information</Typography>
                <EditIcon onClick={() => edit()} />
                <FormControl>
                    <InputLabel htmlFor="my-input">Name</InputLabel>
                    <Input onChange={(e) => setName(e.target.value)} name="name" className="input" disabled={disabled} type="name" id="name" value={name} id="my-input" aria-describedby="my-helper-text" />
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="my-input">Email</InputLabel>
                    <Input onChange={(e) => setEmail(e.target.value)} name="email" className="input" disabled={disabled} id="email" type="email" value={email} id="my-input" aria-describedby="my-helper-text" />
                    <ButtonUnstyled disabled={disabled} onClick={() => editUserDetails()}>Edit</ButtonUnstyled>
                </FormControl>
            </FormGroup>
            <FormGroup>
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button onClick={() => submitFile()}> Upload File</button>
            </FormGroup>
        </div>
    )
}

export default EditUser;
