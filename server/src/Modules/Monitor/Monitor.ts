import { booster } from '@booster-ts/core';
import { Firebase, firebase } from '../Firebase/Firebase';
import { ErrorModule } from '@booster-ts/error-module';
import { IError } from '../../Interface/IError';

@booster()
export class Monitor {

    private db: firebase.firestore.Firestore;

    constructor(
        private firebase: Firebase,
        private error: ErrorModule
    ) {
        this.db = this.firebase.getApp().firestore();
    }

    public init(): Promise<void> {
        this.error.use(this.reportError.bind(this));
        return Promise.resolve();
    }

    private reportError(error: IError): void {
        error['time'] = Date.now();
        try {
            error.systemError = JSON.stringify(error.systemError);
        } catch (e) { console.log(e); }
        this.db.collection('Error').doc().create(error).catch(console.error);
    }

}