import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL_API } from "../variables";

const HeaderAdmin = () => {
    return (
        <header className="bg-primary">
            <nav className="navbar navbar-dark">
                <Link className="navbar-brand " to="/admin">Dashboard</Link>
                <a className="bg-light text-dark my-3 nav-item nav-link rounded" target="_blank" href={`${BASE_URL_API}/downloadZip`} rel="noreferrer">BAIXAR ZIP</a>
            </nav>
        </header>
    )
}

export default HeaderAdmin