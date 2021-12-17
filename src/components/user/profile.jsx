import { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, makeStyles, Typography, TextField } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useNavigate } from 'react-router';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';

import { ButtonUnstyled } from '@mui/base';
import { SendToMobile } from '@mui/icons-material';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

const useStyles = makeStyles({
    container: {
        //  width: '50%',
        // margin: '5% 0 0 25%',
        '& > *': {
            //      marginTop: 20
        }
    }
})

const EditUser = (props) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [file, setFile] = useState('');
    const [pan, setPan] = useState('');
    const [dob, setdob] = useState('');
    const [aadhaar, setAadhaar] = useState('');
    const [user, setUser] = useState(null);
    const [verify, setVerify] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [phone, setPhone] = useState('');
    const [role, setrole] = useState('')
    const [disabled, setDisabled] = useState(true);
    const [status, setstatus] = useState('')
    const classes = useStyles();
    console.log(props);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + `/userone`,
            {
                params: {
                    _id: id
                }
            }
        )
            .then(response => {
                console.log(response.data);
                setLoading(true);
                setPhone(response.data.phone);
                setrole(response.data.role);
                setUser(response.data);
                setstatus(response.data.status)
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



    return (
        <div>
            <Typography variant="h4" > User Profile</Typography>
            <EditIcon sx={{ mr: 2, mt: 2, mb: 2 }} onClick={() => navigate('edit')} />
            <DocumentScannerIcon sx={{ mr: 2, mt: 2, mb: 2 }} onClick={() => navigate('update/kyc')} />

            <div>
                <Typography variant="body1">Name : {name}</Typography>

                <Typography variant="body1">role: {role}</Typography>
                <Typography variant="body1"> Phone : {phone}</Typography>
                <Typography variant="body1"> Email : {email}</Typography>
                <Typography variant="body1">Status : {status}</Typography>
                <Typography variant="body1">Verified : {verify}</Typography>

            </div>
        </div>
    )
}

export default EditUser;
