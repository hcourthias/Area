import { IAppletInfo } from "./IApplet";

export interface IArea {
    idUser: string;
    user: string;
    action: IAppletInfo;
    reaction: IAppletInfo;
    dateAdded: number;
}
