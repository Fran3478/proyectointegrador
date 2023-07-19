const axios = require('axios')
const URL = "https://rickandmortyapi.com/api/character/"

function getCharById(req, res) {
    const {id} = req.params
    axios(`${URL}${id}`).then(({data}) => {
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
    })
    .catch((error) => {
        return res.status(500).send(error.message)
    })
}

module.exports = {
    getCharById
}


// function getCharById(res, id) {
//     axios(API_URL + id).then(({data}) => {
//         const character = {
//             id: data.id,
//             name: data.name,
//             gender: data.gender,
//             species: data.species,
//             origin: data.origin,
//             image: data.image,
//             status: data.status
//         }
//         res.writeHead(200, {"Content-Type": "application/json"})
//         return res.end(JSON.stringify({character}))
//     }).catch((error) => {
//         res.writeHead(404, {"Content-Type": "text/plain"})
//         return res.end('Not found')
//     })
// }

// module.exports = {
//     getCharById
// }