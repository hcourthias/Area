import { booster } from '@booster-ts/core';
import { inject } from '../../injector';
import { IApplet } from '../../Interface/IApplet';
import firebase = require("firebase-admin");
import { Firebase } from '../Firebase/Firebase';

@booster()
export class InfoModule {

    private db: firebase.firestore.Firestore;
    private services = [];

    constructor(
        private firebase: Firebase
    ) {
        this.db = this.firebase.getApp().firestore();
    }

    /**
     * init
     */
    public init(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.collection('/Services').get()
            .then((snapshot) => {
                snapshot.forEach((service) => {
                    this.services.push(service.get('name'));
                });
                resolve();
            }).catch(reject);
        });
    }

    /**
     * getAbout
     */
    public getAbout(): unknown {
        const services = [];
        for (const service of this.services) {
            const serviceInformation = {
                name: service,
                actions: [],
                reactions: []
            };
            const containers = inject.getContainerByValue<IApplet, {type: string}>('serviceName', service);
            for (const container of containers)
                if (container.data.type === "action" || container.data.type === "reaction")
                    serviceInformation[`${container.data.type}s`].push({
                        name: container.class.getName(),
                        description: container.class.getDescription()
                    });
            services.push(serviceInformation);
        }
        return services;
    }

    /**
     * getActions
     */
    public getActions(service: string, idUser: string): Promise<unknown> {
        return this.getApplet(service, idUser, 'action');
    }

    /**
     * getReactions
     */
    public getReactions(service: string, idUser: string): Promise<unknown> {
        return this.getApplet(service, idUser, 'reaction');
    }

    private async getApplet(service: string, idUser: string, type: 'action' | 'reaction'): Promise<unknown> {
        const containers = inject.getContainerByValue<IApplet, {type: string; name: string}>('serviceName', service);
        const applets = [];

        for (const container of containers) {
            if (container.data.type !== type)
                continue;
            applets.push({
                slugName: container.data.name,
                name: container.class.getName(),
                description: container.class.getDescription(),
                form: await container.class.getForm(idUser)
            });
        }
        return applets;
    }

}