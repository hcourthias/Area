import { IApplet } from "./IApplet";

export interface IAction extends IApplet {
    subscribe(data: unknown, idUser: string): Promise<void>;
}