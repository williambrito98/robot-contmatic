const { join, parse } = require('path')
require('dotenv').config({
    path: join(parse(__dirname).dir, '.env')
})
const axios = require('axios').default
const connection = require('./database/connection');

(async () => {
    setInterval(async () => {
    let scheduleForRunning = {}
    const dateNow = new Date().toLocaleString()

    const conn = connection()
    const result = await conn.withSchema(process.env.DB_SCHEMA).table('schedule')
    const schedules = result.map(item => {
        return {
            id: item.id,
            date: new Date(item.date).toLocaleString(),
            servidor: item.servidor,
            codigos: item.codigos,
            anos: item.anos,
            mes: item.meses
        }
    })
    schedules.forEach(item => {
        if (dateNow === item.date) {
            scheduleForRunning = item
        }
    })

    await conn.destroy()
    if (Object.keys(scheduleForRunning).length === 0) {
        return
    }

    console.log(scheduleForRunning)

    const responseLogin = await axios.post(`${process.env.BASI_URL_API}/api/login`, JSON.stringify({
        email: 'william@gmail.com',
        password: '1234'
    }), {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const token = responseLogin.data.token

    const reponseRunning = await axios.post(`${process.env.BASI_URL_API}/api/run`,
        JSON.stringify(scheduleForRunning), {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    })

    }, 1000)

})()