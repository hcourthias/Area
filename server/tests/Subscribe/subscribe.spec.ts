import { firebase, BASE_URL } from "../env";
import request = require("superagent");

describe('Subscribe', () => {

    let token = '';

    beforeAll((done) => {
        firebase.auth().signInWithEmailAndPassword('test1@mail.com', 'password')
        .then((user) => {
            return user.user.getIdToken();
        })
        .then((userToken) => {
            token = userToken;
            console.log(token);
            done();
        });
    })
    
    describe('Time', () => {
        
        it("Should return Error on undefined token", (done) => {

            request.put(`${BASE_URL}/subscribe`)
            .send({
                "actionName": "EveryDayAt",
                "actionData": {
                    "hour": "00",
                    "minute": "00"
                },
                "reactionName": "SendMail",
                "reactionData": {
                    "content": "Random mail",
                    "mail": "area2020epi",
                    "title": "Random Title"
                }
            })
            .end((error, res) => {
                expect(res.body.code).toBe("02");
                done();
            });
        });

        it("Should return Error on incorrect token", (done) => {

            request.put(`${BASE_URL}/subscribe`)
            .set('Authorization', 'random')
            .send({
                "actionName": "EveryDayAt",
                "actionData": {
                    "hour": "00",
                    "minute": "00"
                },
                "reactionName": "SendMail",
                "reactionData": {
                    "content": "Random mail",
                    "mail": "area2020epi",
                    "title": "Random Title"
                }
            })
            .end((error, res) => {
                expect(res.body.code).toBe("02");
                done();
            });
        });

        it("Should return Error on incorrect Data", (done) => {

            request.put(`${BASE_URL}/subscribe`)
            .set('Authorization', token)
            .send({
                "actionName": "Time",
                "actionData": {
                    "hour": "00",
                    "minute": "00"
                },
                "reactionName": "SendMail",
                "reactionData": {
                    "content": "Random mail",
                    "mail": "area2020epi",
                    "title": "Random Title"
                }
            })
            .end((error, res) => {
                expect(res.body.code).toBe("04");
                done();
            });
        });


        it("Subscribe EveryDayAt", (done) => {

            request.put(`${BASE_URL}/subscribe`)
            .set('Authorization', token)
            .send({
                "actionName": "EveryDayAt",
                "actionData": {
                    "hour": "00",
                    "minute": "00"
                },
                "reactionName": "SendMail",
                "reactionData": {
                    "content": "Random mail",
                    "mail": "area2020epi",
                    "title": "Random Title"
                }
            })
            .then((res) => {
                expect(res.body.code).toBe("00");
                done();
            });

        });

    });
    
})
