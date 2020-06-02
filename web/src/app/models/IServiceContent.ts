import { IService } from './IService';
import { IApplet } from './IApplet';

export interface IServiceContent extends IService {
    description: string;
    apps: IApplet[];
}
