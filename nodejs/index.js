require('dotenv').config()
const express = require('express')

const sequelize = require('./db')
const models = require('./models/models')
const app = express()


const PORT = process.env.PORT || 8080


// Чобы отправлять запросы с браузера
const cors = require('cors')
app.use(cors())


// Чтобы приложение могло парсить json формат
app.use(express.json())


// app.get('/', (req, res) => {
//     res.status(200).json({message: 'WOrk'})
// })

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
