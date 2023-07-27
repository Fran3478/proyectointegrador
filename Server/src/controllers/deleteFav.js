const {Favorite} = require("../DB_connection")

const deleteFav = async (req, res) => {
    const {id} = req.params
    try {
        if(!id) {
            return res.status(404).send("No encontrado")
        }
        await Favorite.destroy({where:{id}})
        const favorites = await Favorite.findAll()
        return res.json(favorites)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
module.exports = deleteFav