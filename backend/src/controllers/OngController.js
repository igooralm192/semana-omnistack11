const connection = require('../database/connection')
const generateUniqueId = require('../utils/generateUniqueId')

module.exports = {
    index: async (req, res) => {
        return res.json(await connection('ongs').select('*'))
    },

    create: async (req, res) => {
        const { name, email, whatsapp, city, uf } = req.body
    
        const id = generateUniqueId()
    
        await connection('ongs').insert({ id, name, email, whatsapp, city, uf })
    
        return res.json({ id })
    }
}