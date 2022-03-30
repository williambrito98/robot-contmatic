import React, { useState } from "react";
import { useNavigate } from 'react-router'
import '../assets/css/login.css'
import { escapeHtml } from "../util/string";
import { BASE_URL_API } from "../variables";

const Login = ({ setToken }) => {


    const [fields, setFiels] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()

    const handleForm = (event) => {
        event.preventDefault()
        fetch(`${BASE_URL_API}/api/login`, {
            body: JSON.stringify(fields),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(json => {
            json.json().then(res => {
                if (!res.auth) {
                    return alert(res.message)
                }
                setToken(() => {
                    return res.token
                })

                navigate('/admin')


            }).catch(e => {
                alert('Erro ao logar no sistema')
            })
        }).catch(e => {
            alert('Erro ao logar no sistema')
        })



    }

    const handleField = (event) => {
        setFiels({
            ...fields,
            [event.currentTarget.name]: escapeHtml(event.currentTarget.value)
        })
    }

    return (
        <section className="login-container bg-light">
            <div className="login-box">
                <div className="login-form">
                    <h1 className="login-title">LOGIN</h1>
                    <div className="flex">
                        <form onSubmit={handleForm}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" onChange={handleField} className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Email" required value={fields.email} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" onChange={handleField} className="form-control" name="password" id="password" value={fields.password} placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-primary">Entrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login