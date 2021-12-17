import React from 'react'
import { useParams } from 'react-router';
import { useEffect } from 'react';

export default function Shortlist() {
    const { id } = useParams();
    const code = id;
    useEffect(() => {


    }, [id]);
    return (
        <div>
            Shortlist Component of {code}
        </div>
    )
}
