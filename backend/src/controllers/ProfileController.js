const connection = require('../database/connection')

module.exports = {
    index: async (req, res) => {
        const ong_id = req.headers.authorization

        return res.json(
            await connection('incidents')
                .where('ong_id', ong_id)
                .select('*')
        )
    }
}