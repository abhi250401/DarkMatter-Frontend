import React from "react";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetail from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ListItemText from '@material-ui/core/ListItemText'

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

export const Review = ({ formData, navigation }) => {
    const { go } = navigation;
    const {
        firstName,
        aadhar,
        dob,
        pan,
        phone,
        email,
    } = formData;
    async function registerUser(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:3000/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                formData
            }),
        })

        const data = await response.json()

        if (data.status === 'ok') {
            alert('registration success')

        }
        else {
            alert('error email already exists')
        }
    }


    return (
        <Container maxWidth='sm'>
            <h3>Review</h3>
            <RenderAccordion summary="Profile" go={go} details={[
                { 'Name': firstName },
                { 'Email': email },
                { 'Phone': phone },
            ]} />
            <RenderAccordion summary="Kyc" go={go} details={[
                { 'Adhaar': aadhar },
                { 'dob': dob },
                { 'PAN Card': pan },

            ]} />
            {/* <RenderAccordion summary="" go={go} details={[
                { 'Phone': phone },
                { 'Email': email },
                { 'Password': password }
            ]} /> */}
            <Button
                color="primary"
                variant="contained"
                style={{ marginTop: '1.5rem' }}
                onClick={registerUser}
            >
                Submit
            </Button>

        </Container >
    );
};

export const RenderAccordion = ({ summary, details, go }) => (
    <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
        >{summary}</AccordionSummary>
        <AccordionDetail>
            <div>
                {details.map((data, index) => {
                    const objKey = Object.keys(data)[0];
                    const objValue = data[Object.keys(data)[0]];

                    return <ListItemText key={index}>{`${objKey}: ${objValue}`}</ListItemText>

                })}

            </div>
        </AccordionDetail>
    </Accordion>
)