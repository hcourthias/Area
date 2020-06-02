import { booster } from '@booster-ts/core';
import { inject } from '../../injector';
import { IAction } from '../../Interface/IAction';
import { IForm } from '../../Interface/IForm';
import cron = require("node-cron");
import { Dispatcher } from '../../Modules/Dispatcher/Dispatcher';

interface IData {
    hour: string;
    minute: string;
}

@booster({
    serviceName: "Time",
    name: "EveryDayAt",
    type: "action"
})
export class EveryDayAtAction implements IAction {

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
            this.dispatcher.dispatchAction('EveryDayAt', {
                hour: time.getHours().toString().padStart(2, '0'),
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
        return "Every Day At";
    }

    /**
     * getDescription
     * @description Action Description
     */
    public getDescription(): string {
        return "This Trigger fires every single day at a specific time set by you.";
    }

    /**
     * getForm
     * @description get Action form
     */
    public getForm(): Promise<Array<IForm>> {
        return Promise.resolve([{
            selectionBox: {
                name: 'hour',
                title: 'Time',
                values: [
                    "00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"
                ]
            }
        }, {
            selectionBox: {
                name: 'minute',
                title: "",
                values: [
                    "00", "15", "30", "45"
                ]
            }
        }]);
    }

    /**
     * subscribe
     * @description Subscribe a new user to applets
     */
    public subscribe(): Promise<void> {
        return Promise.resolve();
    }

}

inject.register("EveryDayAtAction", EveryDayAtAction);