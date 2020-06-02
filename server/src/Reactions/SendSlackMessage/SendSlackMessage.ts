import { booster } from '@booster-ts/core';
import { inject } from '../../injector';
import { IForm } from '../../Interface/IForm';
import { ExpressModule } from '../../Modules/Express/Express';
import { Express, Request, Response } from 'express';
import request = require("superagent");
import { IReaction } from '../../Interface/IReaction';
import { Firebase, firebase } from '../../Modules/Firebase/Firebase';
import { ISendSlackMessage, ISlackInfo } from './ISendSlackMessage';
import { slackConfig } from '../../config/slack';
import { ErrorModule } from '@booster-ts/error-module';

@booster({
    serviceName: "Slack",
    name: "SendSlackMessage",
    type: "reaction"
})
export class SendSlackMessageReaction implements IReaction {

    private server: Express;
    private db: firebase.firestore.Firestore;

    constructor(
        express: ExpressModule,
        firebase: Firebase,
        private error: ErrorModule
    ) {
        this.server = express.getApp();
        this.db = firebase.getApp().firestore();
    }

    /**
     * init
     * @description Init Action
     */
    public init(): Promise<void> {
        this.server.get('/slack/oauth/authorize/proxy/expo', (req: Request, res: Response) => {
            res.redirect(`https://auth.expo.io/@tam-epicture/area?code=${req.query.code}`);
        });
        this.server.get('/github/oauth/authorize/proxy/firebase', (req: Request, res: Response) => {
            res.redirect(`https://auth.expo.io/@tam-epicture/area?code=${req.query.code}`);
        });
        this.server.get('/slack/oauth/authorize', this.convert.bind(this));
        return Promise.resolve();
    }

    private convert(req: Request, res: Response): void {
        request.get('https://slack.com/api/oauth.v2.access').query({
            ...slackConfig,
            // eslint-disable-next-line @typescript-eslint/camelcase
            redirect_uri: req.query.redirect_uri,
            code: req.query.code
        })
        .end((error, result) => {
            if (error || result.body.ok === false) {
                this.error.createError('99', 'Slack failed to convert code', {}, result.body);
                res.status(500).send({
                    code: '99',
                    text: 'SLACK Error',
                    data: result.body
                });
            } else {
                res.send({
                    code: "00",
                    text: "OK",
                    data: result.body
                });
            }
        });
    }

    /**
     * getName
     * @description Get Action Name
     */
    public getName(): string {
        return "Send Slack Message";
    }

    /**
     * getDescription
     * @description Action Description
     */
    public getDescription(): string {
        return "This Reaction will send direct message to you.";
    }

    /**
     * getForm
     * @description get Action form
     */
    public getForm(): Promise<Array<IForm>> {
        return Promise.resolve([{
            input: {
                name: 'content',
                regex: null,
                title: 'Message'
            }
        }]);
    }

    /**
     * listener
     * @description Action Call Back
     */
    public execute(data: ISendSlackMessage, idUser: string): Promise<void> {
        return this.db.collection('/User').where('idUser', '==', idUser)
        .get()
        .then((snapshots) => {
            if (snapshots.empty)
                return Promise.resolve();
            const user = snapshots.docs[0].data() as ISlackInfo;
            return request.post(`https://slack.com/api/chat.postMessage`)
            .set('Authorization', `Bearer ${user.access_token}`)
            .send({
                channel: user.authed_user.id,
                text: data.content || "Area2020"
            })
            .then(() => {
                return Promise.resolve();
            })
            .catch((error) => {
                this.error.createError('99', 'Slack failed to execute', {}, error);
                return Promise.resolve();
            });
        });
    }

}

inject.register("SendSlackMessageReaction", SendSlackMessageReaction);
