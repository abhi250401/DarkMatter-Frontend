import React from 'react'
import { useParams } from 'react-router';
import { useEffect } from 'react';

export default function Performance() {
    const { id } = useParams();
    const code = id;
    useEffect(() => {


    }, [id]);
    return (
        <div>
            Performance Component of {code} hi
        </div>
    )
}
