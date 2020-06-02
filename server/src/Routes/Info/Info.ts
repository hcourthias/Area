import { booster } from '@booster-ts/core';
import { Request, Response, Express } from 'express';
import { ExpressModule } from '../../Modules/Express/Express';
import { inject } from '../../injector';
import { InfoModule } from '../../Modules/Info/Info';
import { Firebase } from '../../Modules/Firebase/Firebase';
import { IError } from '../../Interface/IError';

@booster()
export class InfoRoute {

    private app: Express;

    constructor(
        express: ExpressModule,
        private info: InfoModule,
        private firebase: Firebase
    ) {
        this.app = express.getApp();
        this.app.get('/actions/:name', this.getActions.bind(this));
        this.app.get('/reactions/:name', this.getReactions.bind(this));
        this.app.get('/about.json', this.getAbout.bind(this));
    }

    private getAbout(req: Request, res: Response): void {
        const services = this.info.getAbout();
        const result = {
            client: {
                host: req.headers['x-forwarded-for'] || req.connection.remoteAddress
            },
            server: {
                signature: "overlord",
                /** Prevent ESLint Error */
                "current_time": parseInt((Date.now() / 1000).toFixed(0)),
                services
            }
        };
        res.status(200).send(result);
    }

    private getActions(req: Request, res: Response): void {
        const serviceName = req.params.name;
        const token = req.headers.authorization;
        this.firebase.validateToken(token)
        .then((user) => {
            return this.info.getActions(serviceName, user.uid);
        })
        .then((actions) => {
            res.status(200).send({
                code: "00",
                text: `Actions for ${serviceName} Service`,
                data: {
                    actions
                }
            });
        })
        .catch((error: IError) => {
            res.status(error.httpResponse).send({
                code: error.code,
                text: error.why
            });
        });
    }

    private getReactions(req: Request, res: Response): void {
        const serviceName = req.params.name;
        const token = req.headers.authorization;
        this.firebase.validateToken(token)
        .then((user) => {
            return this.info.getReactions(serviceName, user.uid);
        })
        .then((reactions) => {
            res.status(200).send({
                code: "00",
                text: `Reactions for ${serviceName} Service`,
                data: {
                    reactions
                }
            });
        })
        .catch((error: IError) => {
            res.status(error.httpResponse).send({
                code: error.code,
                text: error.why
            });
        });
    }

}

inject.register("InfoRoute", InfoRoute);
