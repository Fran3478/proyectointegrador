const {Favorite} = require("../DB_connection")

const postFav = async (req, res) => {
    const {id, name, origin, status, image, species, gender} = req.body
    try {
        if(!name || !origin || !status || !image || !species || !gender) {
            return res.status(401).send("Faltan datos")
        }
        await Favorite.findOrCreate({where: {id, name, origin, status, image, species, gender}})
        const favorites = await Favorite.findAll()
        return res.json(favorites)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
module.exports = postFav