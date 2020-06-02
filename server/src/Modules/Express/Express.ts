import { booster } from '@booster-ts/core';
import express = require("express");
import { Express } from 'express';

@booster()
export class ExpressModule {

    private app: Express;

    constructor() {
        this.app = express();
    }

    /**
     * init
     */
    public init(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.app.listen(process.env.PORT || 3000, () => {
                this.app.use(express.json());
                resolve();
            })
            .once('error', (error) => {
                reject(error);
            });
        });
    }

    /**
     * getApp
     */
    public getApp(): Express {
        return this.app;
    }

}