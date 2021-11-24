import React, { useState } from 'react';
import { useEffect } from 'react';
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, Button, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from "./navbar";
const useStyles = makeStyles({
    table: {
        width: '90%',
        margin: '50px 0 0 50px'
    },
    thead: {
        '& > *': {
            fontSize: 20,
            background: '#000000',
            color: '#FFFFFF'
        }
    },
    row: {
        '& > *': {
            fontSize: 18
        }
    }
})
export default function AdminUsers() {
    const [loading, setLoading] = useState(false);

    const classes = useStyles();
    const [users, setData] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:3000/api/user/users').then(response => {
            console.log(response.data);
            setData(response.data);
            setLoading(true);
        }).catch(err => {
            console.log(err);
        })


    }, [])
    if (!loading)
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "white", height: "100vh" }}><h1 style={{ color: "white" }}>Loading ...</h1></div>
        );

    return (
        <div>
            <Navbar />
            <div>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow className={classes.thead}>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>`Phone`</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {users.map((user) => (
                            <TableRow className={classes.row} key={user._id}>
                                <Link to={`/user/profile/${user._id}`} >
                                    <TableCell>{user._id}</TableCell>
                                </Link>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>
                                    <Button color="primary" variant="contained" style={{ marginRight: 10 }} component={Link} to={`/edit/${user._id}`}>Edit</Button>
                                    <Button color="secondary" variant="contained" >Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )

};
