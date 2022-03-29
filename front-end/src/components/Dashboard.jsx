import React from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";


const Dashboard = ({ token }) => {
    return (
        <>
            <HeaderAdmin />
            <div className="contaier-fluid mt-5">
                <div className="row">
                    <div className="col-4 border p-5">
                        <nav className="nav nav-pills nav-justified flex-column">
                            <Link className="nav-item nav-link active" to="#">Robo</Link>
                            <Link className="nav-item nav-link" to="#">Agendador</Link>
                        </nav>
                    </div>
                    <div className="col-8 border">
                        <div className="d-flex flex-wrap my-3">
                            <div className="card ml-3 mt-2" style={{ width: '18rem' }}>
                                <img className="card-img-top" src="data:image/png;base64,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" alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">Baixa Arquivos</h5>
                                    <p className="card-text">Robo que entra no sistema do contmatic e baixa arquivos pre-determinador</p>
                                    <div className="d-flex justify-content-start align-center">
                                        <small><strong>Status</strong>: Executando</small>
                                        <div class="loader"></div>
                                    </div>
                                    {/* <a href="#" class ="btn btn-primary">Go somewhere</a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard