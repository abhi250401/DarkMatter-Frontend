import React from 'react'
import axios from 'axios'

import { useEffect } from 'react'
export default function Holdings() {

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/user/holdings').then((response) => {
            console.log(response)
        }).catch((err) => {
            console.log(err)
        })

    }, [])
    return (
        <div>

        </div>
    )
}
