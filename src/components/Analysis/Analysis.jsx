import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
export default function Analysis() {
    const { id } = useParams();
    const code = id;
    useEffect(() => {


    }, [id]);
    return (
        <div>
            Analysis Component of {code}
        </div>
    )
}
