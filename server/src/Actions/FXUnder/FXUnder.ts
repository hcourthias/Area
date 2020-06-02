import { booster } from '@booster-ts/core';
import { inject } from '../../injector';
import { IAction } from '../../Interface/IAction';
import { IForm } from '../../Interface/IForm';
import cron = require("node-cron");
import request = require("superagent");
import { firebase, Firebase } from '../../Modules/Firebase/Firebase';
import { IArea } from '../../Interface/IArea';
import { IReaction } from '../../Interface/IReaction';
import { ErrorModule } from '@booster-ts/error-module';

interface IFXUnder {
    currency: string;
    value: number;
}

@booster({
    serviceName: "FX",
    name: "FXUnder",
    type: "action"
})
export class FXUnderAction implements IAction {

    private cron: cron.ScheduledTask;
    private db: firebase.firestore.Firestore;
    
    constructor(
        firebase: Firebase,
        private error: ErrorModule
    ) {
        this.db = firebase.getApp().firestore();
    }

    /**
     * init
     * @description Init Action
     */
    public init(): Promise<void> {
        this.cron = cron.schedule('0 0 */2 * * *', () => {
            request.get('https://api.exchangeratesapi.io/latest')
            .end((error, result) => {
                if (error)
                    return this.error.createError('99', 'FXUnderAPI', {}, {error, result});
                this.db.collection('/Area').get()
                .then((snapshots) => {
                    if (snapshots.empty)
                        return;
                    snapshots.forEach((snapshot) => {
                        const area = snapshot.data() as IArea;
                        if (area.action.name === 'FXUnder') {
                            const data = area.action.data as IFXUnder;
                            if (result.body.rates[data.currency] < data.value) {
                                const reaction = inject.getByValue<IReaction>('name', area.reaction.name)[0];
                                if (reaction && reaction.execute)
                                    reaction.execute(area.reaction.data, area.idUser);
                            }
                        }
                    });
                });
            });
        });
        return Promise.resolve();
    }

    /**
     * getName
     * @description Get Action Name
     */
    public getName(): string {
        return "FX Under";
    }

    /**
     * getDescription
     * @description Action Description
     */
    public getDescription(): string {
        return "Action that triggers when a currency is under a certain value";
    }

    /**
     * getForm
     * @description get Action form
     */
    public getForm(): Promise<Array<IForm>> {
        const form: Array<IForm> = [{
            selectionBox: {
                title: 'Currency',
                name: 'currency',
                values: [
                    "CAD",
                    "HKD",
                    "ISK",
                    "PHP",
                    "DKK",
                    "HUF",
                    "CZK",
                    "AUD",
                    "RON",
                    "SEK",
                    "IDR",
                    "INR",
                    "BRL",
                    "RUB",
                    "HRK",
                    "JPY",
                    "THB",
                    "CHF",
                    "SGD",
                    "PLN",
                    "BGN",
                    "TRY",
                    "CNY",
                    "NOK",
                    "NZD",
                    "ZAR",
                    "USD",
                    "MXN",
                    "ILS",
                    "GBP",
                    "KRW",
                    "MYR"
                ]
            }
        }, {
            input: {
                name: 'value',
                title: "Under",
                // eslint-disable-next-line no-useless-escape
                regex: '/^\d*\.?\d*$/'
            }
        }];
        return Promise.resolve(form);
    }

    /**
     * listener
     * @description Action Call Back
     */
    public subscribe(): Promise<void> {
        return Promise.resolve();
    }

}

inject.register("FXUnderAction", FXUnderAction);