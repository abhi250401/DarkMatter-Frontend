import React from 'react'
import { useParams } from 'react-router';
import { useEffect } from 'react';

export default function Compare() {
    const { id } = useParams();
    const code = id;
    
    useEffect(() => {

    }, [id]);

    return (
        <div>
            Compare Component of {code}
        </div>
    )
}
