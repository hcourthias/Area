import { booster } from '@booster-ts/core';
import { inject } from '../../injector';
import { IForm } from '../../Interface/IForm';
import { IReaction } from '../../Interface/IReaction';
import { Firebase, firebase } from '../../Modules/Firebase/Firebase';
import request = require("superagent");
import { INotification, INotificationData } from './INotification';
import { isArray } from 'util';


@booster({
    serviceName: "Notification",
    name: "Notification",
    type: "reaction"
})
export class NotificationReaction implements IReaction {

    private db: firebase.firestore.Firestore;

    constructor(
        firebase: Firebase
    ) {
        this.db = firebase.getApp().firestore();
    }

    /**
     * init
     * @description Init Action
     */
    public init(): Promise<void> {
        return Promise.resolve();
    }

    /**
     * getName
     * @description Get Action Name
     */
    public getName(): string {
        return "Notification";
    }

    /**
     * getDescription
     * @description Action Description
     */
    public getDescription(): string {
        return "Send A Notification";
    }

    /**
     * getForm
     * @description get Action form
     */
    public getForm(): Promise<Array<IForm>> {
        return Promise.resolve([{
            input: {
                title: 'Title',
                name: 'title',
                regex: undefined
            }
        }, {
            input: {
                title: 'Content',
                name: 'content',
                regex: undefined
            }
        }]);
    }

    /**
     * listener
     * @description Action Call Back
     */
    public execute(data: INotificationData, idUser: string): Promise<void> {
        return this.db.collection('/User').where('idUser', '==', idUser)
        .get()
        .then((snapshots) => {
            if (snapshots.empty)
                return Promise.resolve();
            const user = snapshots.docs[0].data().Notification as INotification;
            const requests = [];
            if (user.firebase && isArray(user.firebase))
                requests.push(...this.sendFirebaseNotification(user, data));
            if (user.expo && isArray(user.expo))
                requests.push(...this.sendExpoNotification(user, data));
            return Promise.all(requests)
            .then(() => {
                return Promise.resolve();
            });
        });
    }

    private sendFirebaseNotification(user: INotification, data: INotificationData): Promise<unknown>[] {
        const requests: Array<Promise<unknown>> = [];
        user.firebase.forEach((token) => {
            requests.push(
                firebase.messaging().sendToDevice(token, {
                    notification: {
                        title: data.title,
                        body: data.content
                    }
                })
            );
        });
        return requests;
    }

    private sendExpoNotification(user, data): Promise<unknown>[] {
        const requests: Array<Promise<request.Response>> = [];
        user.expo.forEach((token) => {
            requests.push(
                new Promise<request.Response>((resolve, reject) => {
                    request.post(`https://exp.host/--/api/v2/push/send`)
                    .set('host', 'exp.host')
                    .set('accept', 'application/json')
                    .set('accept-encoding', 'gzip, deflate')
                    .set('content-type', 'application/json')
                    .send({
                        title: data.title,
                        to: token,
                        body: data.content,
                        sound: "default",
                        channelId: "pushChannel",
                        priority: "high",
                        _displayInForeground: true
                    }).end((err, res) => {
                        if (err) reject(err);
                        else resolve(res);
                    });
                })
            );
        });
        return requests;
    }

}

inject.register("NotificationReaction", NotificationReaction);