const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })
    
    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "VIVA",
                email: "viva@viva.com.br",
                whatsapp: "47000000000",
                city: "NORTE",
                uf: "NT"
            })
        
        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
        // console.log(response.body)
    })

    afterAll(async () => {
        await connection.destroy()
    })
})