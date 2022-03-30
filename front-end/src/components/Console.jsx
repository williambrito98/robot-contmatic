import React, { useEffect, useState } from "react";
import { BASE_URL_API } from "../variables";


const Console = ({ token }) => {

    const [logRobo, setLog] = useState([])

    useEffect(() => {
        const intervalID = setInterval(() => {
            fetch(`${BASE_URL_API}/api/log`,
                {
                    method: 'GET',
                    headers: {
                        'x-access-token': token
                    }
                }).then(res => {
                    res.json().then(e => {
                        setLog(e)
                    })
                })
        }, 5000)

        return () => {
            clearInterval(intervalID)
        }
    }, [])


    return (
        <>
            <h1>CONSOLE</h1>

            <hr />

            <div className="container bg-dark text-white p-3 h-500px overflow-y-scrool overflow-x-hidden">
                {logRobo.map((item, index) => (
                    <p key={index}>
                        {item}
                    </p>
                ))}
            </div>
        </>
    )
}

export default Console