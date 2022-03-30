import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useNavigate } from "react-router";
import { anosOptions, BASE_URL_API, codigoOptions, mesesOptions } from "../variables";
const Schedule = ({ token }) => {


    const [fields, setFields] = useState({
        servidor: 'tactusSP',
        date: '',
    })
    const [codigos, setCodigos] = useState([])
    const [anos, setAnos] = useState([])
    const [meses, setMeses] = useState([])
    const [tableSchedule, setTableSchedule] = useState([])
    const navigate = useNavigate()


    const getSchedules = () => {
        fetch(`${BASE_URL_API}/api/schedule`, {
            headers: {
                'x-access-token': token
            }
        }).then(response => {
            response.json().then(json => {
                setTableSchedule([...json])
            }).catch(e => {
                navigate('/')
            })
        }).catch(e => {
            alert('Servidor Indisponivel')
        })
    }

    const removeSchedule = (event) => {
        const remove = window.confirm('Tem certeza que deseja remover esse agendamento ?')
        if (!remove) return
        
        fetch(`${BASE_URL_API}/api/schedule/remove`, {
            method: 'post',
            body: JSON.stringify({
                id: event.currentTarget.value
            }),
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json',
            }
        }).then(response => {
            response.json().then(json => {
                alert(json.message)
                getSchedules()
            }).catch(e => {
                navigate('/')
            })
        }).catch(e => {
            alert('Servidor Indisponivel')
        })
    }


    useEffect(() => {
        getSchedules()
    }, [])


    const submitForm = (event) => {
        event.preventDefault()
        const anosValues = anos.map(item => item.value)
        const mesesValues = meses.map(item => item.value)
        const codigosValues = codigos.map(item => item.value)
        fetch(`${BASE_URL_API}/api/schedule`, {
            method: 'post',
            body: JSON.stringify({
                date: fields.date,
                servidor: fields.servidor,
                codigos: codigosValues,
                anos: anosValues,
                meses: mesesValues
            }),
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }).then(e => {
            if (e.status === 200) {
                alert('Dados salvo com sucesso')
                getSchedules()
            }
        }).catch(e => {
            alert('Servidor Indisponivel')
        })
    }

    const handleForm = (event) => {
        setFields({
            ...fields,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    return (
        <>
            <div className="m-3 overflow-x-scrool overflow-y-hidden">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Agendador</h1>
                    <div>
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modal">Add</button>
                    </div>
                </div>
                <table className="table table-bordered ">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Data</th>
                            <th scope="col">Servidor</th>
                            <th scope="col">Códigos</th>
                            <th scope="col">Anos</th>
                            <th scope="col">Meses</th>
                            <th scope="col">Remover</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableSchedule.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{item.id}</th>
                                <td>{item.date}</td>
                                <td>{item.servidor}</td>
                                <td onClick={(event) => {
                                    if (event.currentTarget.textContent.length === 10) {
                                        event.currentTarget.textContent = item.codigos
                                    } else {
                                        event.currentTarget.textContent = item.codigos.slice(0, 10)
                                    }
                                }}>{item.codigos.slice(0, 10)}</td>
                                <td onClick={(event) => {
                                    if (event.currentTarget.textContent.length === 10) {
                                        event.currentTarget.textContent = item.anos
                                    } else {
                                        event.currentTarget.textContent = item.anos.slice(0, 10)
                                    }
                                }}>{item.anos.slice(0, 10)}</td>
                                <td onClick={(event) => {
                                    if (event.currentTarget.textContent.length === 10) {
                                        event.currentTarget.textContent = item.meses
                                    } else {
                                        event.currentTarget.textContent = item.meses.slice(0, 10)
                                    }
                                }}>{item.meses.slice(0, 20)}</td>
                                <td className="text-center">
                                    <button className="btn btn-danger" onClick={removeSchedule} value={item.id}>X</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>

            </div>
            <div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Agendamento</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form action="" className="form-row m-4 align-items-center" onSubmit={submitForm}>

                                <div className="form-group col-3">
                                    <label htmlFor="servidor">Data:</label>
                                </div>

                                <div className="form-group col-9">
                                    <input type="datetime-local" onChange={handleForm} value={fields.date} name="date" id="date" />
                                </div>


                                <div className="form-group col-3">
                                    <label htmlFor="servidor">Servidor:</label>
                                </div>

                                <div className="form-group col-9">
                                    <select className="form-control" onChange={handleForm} name="servidor" id="servidor">
                                        <option value="tactusSP">Tactus SP</option>
                                        <option value="tactusBH">Tactus BH</option>
                                    </select>
                                </div>

                                <div className="form-group col-3">
                                    <label htmlFor="servidor">Codigos:</label>
                                </div>
                                <div className="form-group col-9">
                                    <MultiSelect options={codigoOptions} id="codigos" value={codigos} onChange={setCodigos} labelledBy="Selecione" name="codigos" />
                                </div>

                                <div className="form-grop col-3">
                                    <label htmlFor="anos">Selecione o ano:</label>
                                </div>

                                <div className="form-group col-9">
                                    <MultiSelect options={anosOptions} id="anos" value={anos} onChange={setAnos} labelledBy="Selecione" />
                                </div>

                                <div className="form-grop col-3">
                                    <label htmlFor="mes">Selecione o mês:</label>
                                </div>

                                <div className="form-grop col-9">
                                    <MultiSelect options={mesesOptions} id="meses" value={meses} onChange={setMeses} labelledBy="Selecione" />
                                </div>

                                <button type="submit" className="btn btn-primary mt-4">Enviar</button>


                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Schedule