const crypto = require('crypto')

const connection = require('../database/connection')

module.exports = {
    index: async (req, res) => {
        return res.json(await connection('ongs').select('*'))
    },

    create: async (req, res) => {
        const { name, email, whatsapp, city, uf } = req.body
    
        const id = crypto.randomBytes(4).toString('HEX')
    
        await connection('ongs').insert({ id, name, email, whatsapp, city, uf })
    
        return res.json({ id })
    }
}