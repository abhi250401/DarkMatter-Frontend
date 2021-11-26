import React, { useEffect, useState } from "react";
import "./phone.css";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// react router

//components
import Signup from "./Signup";

const Phone = () => {
    let phone_number;
    const [viewOtpForm, setViewOtpForm] = useState(false);
    const [user, setUser] = useState(false);
    let goto = useNavigate();
    const firebaseConfig = {
        apiKey: "AIzaSyBjk9IaChZz4Zuh1-rfTaRpmCsk5BYsUUc",
        authDomain: "darkmatter-in.firebaseapp.com",
        projectId: "darkmatter-in",
        storageBucket: "darkmatter-in.appspot.com",
        messagingSenderId: "964632753982",
        appId: "1:964632753982:web:8e74d660fd45ba12f51e6f",
        measurementId: "G-PZFSTRKXGF"
    };


    useEffect(() => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
                callback: function (response) {
                    console.log("Captcha Resolved");
                    this.onSignInSubmit();
                },
                defaultCountry: "IN",
            }
        );
    }, []);

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }

    const auth = firebase.auth();

    auth.onAuthStateChanged((user) => {
        if (user) {
            setUser(user);
        }
    });

    const loginSubmit = (e) => {
        e.preventDefault();

        phone_number = "+91" + e.target.phone.value;
        const appVerifier = window.recaptchaVerifier;

        auth
            .signInWithPhoneNumber(phone_number, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                console.log("otp sent");
                setViewOtpForm(true);
                window.confirmationResult = confirmationResult;
                // ...
            })
            .catch((error) => {
                // Error; SMS not sent
                // ...
                alert(error.message);
            });

    };

    const otpSubmit = (e) => {
        e.preventDefault();

        let opt_number = e.target.otp_value.value;

        window.confirmationResult
            .confirm(opt_number)
            .then((confirmationResult) => {
                console.log(confirmationResult);
                console.log("success");

                phone_number = confirmationResult.user.phoneNumber;
                console.log(phone_number);
                localStorage.setItem("phone_number", phone_number);
                axios.post('http://localhost:3000/api/user/phoneauth',
                    phone_number).then(response => {
                        console.log(response)
                        if (response.data.status === "ok")
                            goto('/login');
                        else
                            goto('/signup')
                    }).catch(err => {
                        console.log(err);
                    })

            })
            .catch((error) => {

                alert(error.message);
            });
    };

    const signOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                window.open("/signin", "_self");
            })
            .catch((error) => {
                // An error happened.
                console.log(error);
            });
    };

    return (
        <div>
            <div id="recaptcha-container"></div>


            <Signup
                phoneNumber={phone_number}
                loginSubmit={loginSubmit}
                otpSubmit={otpSubmit}
                viewOtpForm={viewOtpForm}
            />
        </div>
    );
};

export default Phone;