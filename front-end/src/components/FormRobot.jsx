import React, { useEffect, useState } from "react";
import { MultiSelect } from 'react-multi-select-component'
import { useNavigate } from "react-router";
import { BASE_URL_API, codigoOptions, anosOptions, mesesOptions } from '../variables'
import Console from "./Console";


const FormRobot = ({ token }) => {

    const [codigos, setCodigos] = useState([])
    const [anos, setAnos] = useState([])
    const [meses, setMes] = useState([])
    const [servidor, setServidor] = useState('tactusSP')
    const [consoleRobot, setConsole] = useState(false)

    const handleServidor = (event) => {
        setServidor(event.currentTarget.value)
    }

    const handleForm = (event) => {
        event.preventDefault()
        const anosValues = anos.map(item => item.value)
        const mesesValues = meses.map(item => item.value)
        const codigosValues = codigos.map(item => item.value)
        fetch(`${BASE_URL_API}/api/run`, {
            method: 'post',
            body: JSON.stringify({
                servidor: servidor,
                codigo: codigosValues,
                anos: anosValues,
                mes: mesesValues
            }),
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }).then(e => {
            if (e.status === 200) {
                alert('Dados salvo com sucesso')
                setConsole(true)
            }
        }).catch(e => {
            alert('Servidor Indisponivel')
        })
    }

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${BASE_URL_API}/api/statusRobot`, {
            method: 'GET',
            headers: {
                'x-access-token': token
            }
        }).then(json => {
            json.json().then(res => {
                if (res.status === 'rodando') {
                    setConsole(true)
                }
            }).catch(e => {
                navigate('/')
            })
        }).catch(e => {
            alert('Erro no servidor')
        })
    }, [])

    return consoleRobot ? <Console token={token} /> : (
        <form action="" className="form-row m-4 align-items-center" onSubmit={handleForm}>

            <div className="form-group col-2">
                <label htmlFor="servidor">Servidor:</label>
            </div>

            <div className="form-group col-10">
                <select className="form-control" onChange={handleServidor} name="servidor">
                    <option value="tactusSP">Tactus SP</option>
                    <option value="tactusBH">Tactus BH</option>
                </select>
            </div>

            <div className="form-group col-2">
                <label htmlFor="servidor">Codigos:</label>
            </div>
            <div className="form-group col-10">
                <MultiSelect options={codigoOptions} id="servidor" value={codigos} onChange={setCodigos} labelledBy="Selecione" />
            </div>

            <div className="form-grop col-2">
                <label htmlFor="anos">Selecione o ano:</label>
            </div>

            <div className="form-group col-10">
                <MultiSelect options={anosOptions} id="anos" value={anos} onChange={setAnos} labelledBy="Selecione" />
            </div>

            <div className="form-grop col-2">
                <label htmlFor="mes">Selecione o mês</label>
            </div>

            <div className="form-grop col-10">
                <MultiSelect options={mesesOptions} id="mes" value={meses} onChange={setMes} labelledBy="Selecione" />
            </div>

            <button type="submit" className="btn btn-primary mt-4">Enviar</button>


        </form>
    )
}

export default FormRobot