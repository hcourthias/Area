import request = require("superagent");
import { BASE_URL, firebase } from "../env";

describe('Info route', () => {

    let token = '';

    beforeAll((done) => {
        firebase.auth().signInWithEmailAndPassword('test1@mail.com', 'password')
        .then((user) => {
            return user.user.getIdToken();
        })
        .then((userToken) => {
            token = userToken;
            done();
        });
    })

    describe('About', () => {

        it("Should get Server Info", (done) => {
            request.get(`${BASE_URL}/about.json`)
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.body.client.host).toBeDefined();
                expect(response.body.server).toBeDefined();
                expect(response.body.server.services).toBeDefined();
                done();
            });
        });

    });

    describe("Actions", () => {

        it("Should get server's action list", (done) => {
            const serviceName = 'random';

            request.get(`${BASE_URL}/actions/${serviceName}`)
            .set('Authorization', token)
            .then((response) => {
                expect(response.status).toBe(200);
                done();
            });
        });

    });

    describe('Reactions', () => {
        
        it("Should get server' reaction list", (done) => {
            const serviceName = "random";

            request.get(`${BASE_URL}/reactions/${serviceName}`)
            .set('Authorization', token)
            .then((response) => {
                expect(response.status).toBe(200);
                done();
            })
        });

    })
    

})
