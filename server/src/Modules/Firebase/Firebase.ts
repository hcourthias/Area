import { booster } from '@booster-ts/core';
import { ErrorModule } from '@booster-ts/error-module';
import firebase = require("firebase-admin");

@booster()
export class Firebase {

    /** Firebase Info */
    private serviceAccount = require("../../../area-3e80d-firebase-adminsdk-x2u3s-3943147a78.json");
    /** Firebase App */
    private app: firebase.app.App;

    constructor(
        private error: ErrorModule
    ) { }

    /**
     * init
     * @description Init Firebase App
     */
    public init(): Promise<void> {
        this.app = firebase.initializeApp({
            credential: firebase.credential.cert(this.serviceAccount),
            databaseURL: "https://area-3e80d.firebaseio.com"
        });
        return Promise.resolve();
    }

    public validateToken(token: string): Promise<firebase.auth.UserRecord> {
        if (!token)
            return Promise.reject(this.error.createError("02", "ValidateToken"));
        return this.app.auth().verifyIdToken(token)
        .then((validation) => {
            return this.app.auth().getUser(validation.uid);
        })
        .catch((error) => {
            return Promise.reject(this.error.createError("02", "ValidateToken", {}, error));
        });
    }

    public getApp(): firebase.app.App {
        return this.app;
    }

}

export { firebase };