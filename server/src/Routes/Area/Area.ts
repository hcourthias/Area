import { booster } from '@booster-ts/core';
import { Request, Response, Express } from 'express';
import { ExpressModule } from '../../Modules/Express/Express';
import { Dispatcher } from '../../Modules/Dispatcher/Dispatcher';
import { inject } from '../../injector';
import { Firebase } from '../../Modules/Firebase/Firebase';
import { IError } from '../../Interface/IError';
import { IAppletInfo } from '../../Interface/IApplet';

@booster()
export class AreaRoute {

    private app: Express;

    constructor(
        express: ExpressModule,
        private dispatcher: Dispatcher,
        private firebase: Firebase
    ) {
        this.app = express.getApp();
        this.app.put('/subscribe', this.subscribe.bind(this));
    }

    private subscribe(req: Request, res: Response): void {
        const actionName = req.body.actionName;
        const actionData = req.body.actionData;
        const reactionName = req.body.reactionName;
        const reactionData = req.body.reactionData;
        const token = req.headers.authorization;
        const actionInfo: IAppletInfo = {
            name: actionName,
            data: actionData
        };
        const reactionInfo: IAppletInfo = {
            name: reactionName,
            data: reactionData
        };

        this.firebase.validateToken(token)
        .then((user) => {
            return this.dispatcher.subscribeArea(user , actionInfo, reactionInfo);
        })
        .then(() => {
            res.status(200).send({
                code: "00",
                text: "Area Was added to account"
            });
        })
        .catch((error: IError) => {
            res.status(error.httpResponse)
            .send({
                code: error.code,
                text: error.why
            });
        });
    }

}

inject.register("AreaRoute", AreaRoute);