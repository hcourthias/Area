import { booster } from '@booster-ts/core';
import { inject } from '../../injector';
import { IAction } from '../../Interface/IAction';
import { IForm } from '../../Interface/IForm';
import cron = require("node-cron");
import { Dispatcher } from '../../Modules/Dispatcher/Dispatcher';

@booster({
    serviceName: "Time",
    name: "EveryHourAt",
    type: "action"
})
export class EveryHourAtAction implements IAction {

    private cron: cron.ScheduledTask;

    constructor(
        private dispatcher: Dispatcher
    ) {}

    /**
     * init
     * @description Init Action
     */
    public init(): Promise<void> {
        this.cron = cron.schedule('*/15 * * * *', () => {
            const time = new Date;
            this.dispatcher.dispatchAction('EveryHourAt', {
                // minute: '15'
                minute: time.getMinutes().toString().padStart(2, '0')
            });
        });
        return Promise.resolve();
    }

    /**
     * getName
     * @description Get Action Name
     */
    public getName(): string {
        return "Every hour at";
    }

    /**
     * getDescription
     * @description Action Description
     */
    public getDescription(): string {
        return "This Trigger fires once an hour at :00, :15, :30, or :45 minutes past the hour.";
    }

    /**
     * getForm
     * @description get Action form
     */
    public getForm(): Promise<Array<IForm>> {
        return Promise.resolve([{
            selectionBox: {
                name: 'minute',
                title: 'Minutes past the hour',
                values: [
                    '00',
                    '15',
                    '30',
                    '45'
                ]
            }
        }]);
    }

    /**
     * listener
     * @description Action Call Back
     */
    public subscribe(): Promise<void> {
        return Promise.resolve();
    }

}

inject.register("EveryHourAtAction", EveryHourAtAction);