import { booster } from '@booster-ts/core';
import { inject } from '<%= source %>/injector';
import { IReaction } from '<%= source %>/Interface/IReaction';
import { IForm } from '<%= source %>/Interface/IForm';

@booster({
    serviceName: "",
    name: "<%= name %>",
    type: "reaction"
})
export class <%= name %>Reaction implements IReaction {

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
        return "<%= name %>";
    }

    /**
     * getDescription
     * @description Action Description
     */
    public getDescription(): string {
        return "<%= name %> Action";
    }

    /**
     * getForm
     * @description get Action form
     */
    public getForm(idUser: string): Array<IForm> {
        return [];
    }

    /**
     * excute
     * @description Reaction Call Back
     */
    public execute(reactionInfo: any): Promise<void> {
        return Promise.resolve();
    }

}

inject.register("<%= name %>Reaction", <%= name %>Reaction);