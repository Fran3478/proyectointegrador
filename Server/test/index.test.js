const app = require('../src/app');
const session = require('supertest');
const agent = session(app);

const props = ["id", "name", "species", "gender", "status", "origin", "image"]
const email = "franciscohv95@gmail.com"
const password = "asd123"
const character1 = {id:1,name:"Rick Sanchez",gender:"Male",species:"Human",origin:"Earth (C-137)",image:"https://rickandmortyapi.com/api/character/avatar/1.jpeg",status:"Alive"}
const character2 = {id:2,name:"Morty Smith",gender:"Male",species:"Human",origin:"unknown",image:"https://rickandmortyapi.com/api/character/avatar/2.jpeg",status:"Alive"}

describe("Test de RUTAS", () => {
    describe("GET /rickandmorty/character/:id", () => {
        it("Responde con status: 200", async () => {
            await agent.get('/rickandmorty/character/1').expect(200);
        })
        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
            const response = await agent.get('/rickandmorty/character/1')
            props.forEach((prop) => expect (response.body).toHaveProperty(prop))
        })
        it("Si hay un error responde con status: 500", async () => {
            await agent.get('/rickandmorty/character/1000').expect(500);
        })
    })
    describe("GET /rickandmorty/login", () => {
        it("Sending correct credentials, shuld return access = true", async () => {
            const response = await agent.get(`/rickandmorty/login?email=${email}&password=${password}`)
            expect(response.body.access).toBeTruthy()
        })
        it("Sending incorrect credentials, shuld return access = false", async () => {
            const response = await agent.get("/rickandmorty/login?email=foo@foo.com&password=foofoo")
            expect(response.body.access).toBeFalsy()
        })
    })
    describe("POST /rickandmorty/fav", () => {
        it("The object should be returned in an array", async () => {
            const response = await agent.post('/rickandmorty/fav').send(character1)
            expect(response.body).toContainEqual(character1)
        })
        it("The array should contain the new object and the previous one", async () => {
            const response = await agent.post('/rickandmorty/fav').send(character2)
            expect(response.body.length).toBe(2)
            expect(response.body).toContainEqual(character1)
            expect(response.body).toContainEqual(character2)
        })
    })
    describe("DELETE /rickandmorty/fav/:id", () => {
        it("When sended id doesn't match, should return an array with previous objects", async () => {
            const response = await agent.delete("/rickandmorty/fav/3")
            expect(response.body.length).toBe(2)
            expect(response.body).toContainEqual(character1)
            expect(response.body).toContainEqual(character2)
        })
        it("If the id match, should return an array without the object matched", async () => {
            const response = await agent.delete("/rickandmorty/fav/1")
            expect(response.body.length).toBe(1)
            expect(response.body).not.toContainEqual(character1)
        })
    })
})