import { booster } from '@booster-ts/core';
import { inject } from '../../injector';
import { IReaction } from '../../Interface/IReaction';
import { IForm } from '../../Interface/IForm';
import { ISendMail } from './ISendMail';
import { createTransport } from 'nodemailer';
import Mail = require('nodemailer/lib/mailer');
import { mailConfig } from '../../config/email';
import { ErrorModule } from '@booster-ts/error-module';

@booster({
    serviceName: "Mail",
    name: "SendMail",
    type: "reaction"
})
export class SendMailAction implements IReaction {

    private transporter: Mail;

    constructor(
        private error: ErrorModule
    ) { }

    /**
     * init
     * @description Init Action
     */
    public init(): Promise<void> {
        this.transporter = createTransport(mailConfig);
        return Promise.resolve();
    }

    /**
     * getName
     * @description Get Action Name
     */
    public getName(): string {
        return "SendMail";
    }

    /**
     * getDescription
     * @description Action Description
     */
    public getDescription(): string {
        return "SendMail Action";
    }

    /**
     * getForm
     * @description get Action form
     */
    public getForm(): Promise<Array<IForm>> {
        return Promise.resolve([{
            input: {
                name: 'email',
                title: 'Email',
                //eslint-disable-next-line
                regex: `^[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$`
            }
        }, {
            input: {
                name: 'title',
                title: 'Title',
                regex: null
            }
        }, {
            input: {
                name: 'content',
                title: 'Content',
                regex: null
            }
        }]);
    }

    /**
     * listener
     * @description Action Call Back
     */
    public execute(reactionInfo: ISendMail): Promise<void> {
        return this.transporter.sendMail({
            from: '"Area" <area2020epi@gmail.com>',
            to: reactionInfo.email, // list of receivers
            subject: reactionInfo.title,
            text: reactionInfo.content,
        })
        .catch((error) => {
            this.error.createError('99', 'Email failed to execute', {}, error);
            /** Skip Errors */
            return Promise.resolve();
        });
    }

}

inject.register("SendMailAction", SendMailAction);