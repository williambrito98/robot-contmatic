import React from "react";
import { Link } from "react-router-dom";

const HeaderAdmin = () => {
    return (
        <header className="bg-primary">
            <nav className="navbar navbar-dark ">
                <Link className="navbar-brand " to="/admin">Dashboard</Link>
            </nav>
        </header>
    )
}

export default HeaderAdmin