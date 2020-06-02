import { IApplet } from './IApplet';

export interface IReaction extends IApplet {
    execute(reactionInfo: unknown, idUser?: string): Promise<void>;
}