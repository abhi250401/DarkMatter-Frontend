import { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, makeStyles, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import { ButtonUnstyled } from '@mui/base';
import { SendToMobile } from '@mui/icons-material';

const useStyles = makeStyles({
    container: {
        width: '50%',
        margin: '5% 0 0 25%',
        '& > *': {
            marginTop: 20
        }
    }
})

const EditUser = (props) => {
    const [user, setUser] = useState(null);
    const [verify, setVerify] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [phone, setPhone] = useState('');
    const [role, setrole] = useState('')
    const [disabled, setDisabled] = useState(true);
    const classes = useStyles();
    let history = useNavigate();

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + `/userone/${id}`)
            .then(response => {
                console.log(response.data);
                setLoading(true);
                setPhone(response.data.phone);
                setrole(response.data.role);
                setUser(response.data);
                setName(response.data.name);
                setEmail(response.data.email);
                setVerify(response.data.verify);
                console.log(role);
                setAadhaar(response.data.aadhaar);
                setdob(response.data.dob);
                setPan(response.data.pan)
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
    const [pan, setPan] = useState('');
    const [dob, setdob] = useState('');
    const [aadhaar, setAadhaar] = useState('');
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
                "Authorization": `Bearer ${props.user.userId}`
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                role,
                verify
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
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Aadhaar</InputLabel>
                    <Input name="aadhaar" className="input" disabled value={aadhaar} id="my-input" aria-describedby="my-helper-text" />
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="my-input">Dob</InputLabel>
                    <Input name="aadhaar" className="input" disabled={disabled} value={dob} id="my-input" aria-describedby="my-helper-text" />
                </FormControl>


                <FormControl>
                    <InputLabel htmlFor="my-input">Phone</InputLabel>
                    <Input onChange={(e) => setPhone(e.target.value)} name="email" id="email" type="email" value={phone} id="my-input" aria-describedby="my-helper-text" />
                </FormControl>
                {props.user.role === 1 ? (
                    <>
                        <FormControl>
                            <InputLabel htmlFor="my-input">Role</InputLabel>
                            <Input onChange={(e) => setrole(e.target.value)} name="role" id="role" type="role" value={role} id="my-input" aria-describedby="my-helper-text" />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="my-input">Verified</InputLabel>
                            <Input onChange={(e) => setVerify(e.target.value)} name="verify" id="verify" type="verify" value={verify} id="my-input" aria-describedby="my-helper-text" />
                        </FormControl>
                    </>) : null}

            </FormGroup>
            <FormGroup style={{ display: "flex", justifyContent: "center", alignContent: "center", margin: "auto" }}>
                <input
                    style={{ display: "flex", justifyContent: "center", alignContent: "center", marginTop: "10px" }}
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button style={{ width: "100px", marginBottom: "5px", display: "flex", padding: "6px", justifyContent: "center" }} onClick={() => submitFile()}> Upload File</button>
            </FormGroup>
            <ButtonUnstyled style={{ width: "100px", margin: "auto", display: "flex", padding: "6px", justifyContent: "center" }} disabled={disabled} onClick={() => editUserDetails()}>Edit</ButtonUnstyled>

        </div>
    )
}

export default EditUser;
