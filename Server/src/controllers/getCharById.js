const axios = require('axios')
const URL = "https://rickandmortyapi.com/api/character/"

async function getCharById(req, res) {
    const {idChar} = req.params
    try {
        const {data} = await axios(`${URL}${idChar}`)
        if(data.error) {
            return res.status(404).send(data.error)
        }
        const {id, name, gender, species, origin, image, status} = data
        const character = {
            id: Number(id),
            name,
            gender,
            species,
            origin,
            image,
            status
        }
        return res.status(200).json(character)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getCharById
}