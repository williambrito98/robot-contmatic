import React, {  useState } from "react";
import HeaderAdmin from "./HeaderAdmin";
import FormRobot from "./FormRobot";
import Schedule from "./Schedule";

const Dashboard = ({ token }) => {


    const [activeComponent, setActiveComponent] = useState({
        name: 'formRobot',
        component: <FormRobot token={token} />
    })

    const components = {
        "formRobot": <FormRobot token={token}/>,
        "schedule": <Schedule token={token} />
    }

    const changeActiveComponent =  (event) => {
        setActiveComponent({
            name: event.target.id,
            component: components[event.target.id]
        })
    }



    return (
        <>
            <HeaderAdmin />
            <div className="contaier-fluid mt-5">
                <div className="row">
                    <div className="col-3 border p-5">
                        <nav className="nav nav-pills nav-justified flex-column">
                            <button type='button' onClick={changeActiveComponent} className={activeComponent.name === 'formRobot' ? "btn my-3 nav-item nav-link active" : "btn my-3 nav-item nav-link"} id="formRobot">Robo</button>
                            <button type='button' onClick={changeActiveComponent} id="schedule" className={activeComponent.name === 'schedule' ? "btn nav-item nav-link active" : "btn nav-item nav-link"}>Agendador</button>
                        </nav>
                    </div>
                    <div className="col-9 border">
                        {activeComponent.component}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard