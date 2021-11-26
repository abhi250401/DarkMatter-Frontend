import React from "react";
import { useForm, useStep } from "react-hooks-helper";
import { Names } from "./Signup/checkout";
import { Address } from "./Signup/AddressForm";
import { Contact } from "./Signup/PaymentForm";
import { Review } from "./Signup/Review";
import { Submit } from "./Signup/Submit.jsx";

const defaultData = {
    firstName: "",
    lastName: "",
    nickName: "",
    address: "",
    password: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
};

const steps = [
    { id: "names" },
    { id: "address" },
    { id: "contact" },
    { id: "review" },
    { id: "submit" },
];

export default function Multistep() {
    const [formData, setForm] = useForm(defaultData);
    const { step, navigation } = useStep({
        steps,
        initialStep: 0,
    });

    const props = { formData, setForm, navigation, steps };

    switch (step.id) {
        case "names":
            return <Names {...props} />;
        case "address":
            return <Address {...props} />;
        case "contact":
            return <Contact {...props} />;
        case "review":
            return <Review {...props} />;
        case "submit":
            return <Submit {...props} />;
    }

    return (
        <div>
            <h1>Multi step-form</h1>
        </div>
    );
};