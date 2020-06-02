import { booster } from '@booster-ts/core';
import { inject } from '../../injector';
import { IAction } from '../../Interface/IAction';
import { IForm } from '../../Interface/IForm';
import { Express, Request, Response } from 'express';
import { ExpressModule } from '../../Modules/Express/Express';
import { Firebase, firebase } from '../../Modules/Firebase/Firebase';
import { Octokit } from '@octokit/rest';
import { ErrorModule } from '@booster-ts/error-module';
import { RepositoryInfo, IGithubNewRelease } from './IGithubNewRelease';
import { Dispatcher } from '../../Modules/Dispatcher/Dispatcher';

@booster({
    serviceName: "Github",
    name: "GithubNewRelease",
    type: "action"
})
export class GithubNewReleaseAction implements IAction {

    private server: Express;
    private db: firebase.firestore.Firestore;

    constructor(
        express: ExpressModule,
        firebase: Firebase,
        private error: ErrorModule,
        private dispatcher: Dispatcher
    ) {
        this.server = express.getApp();
        this.db = firebase.getApp().firestore();
    }
    /**
     * init
     * @description Init Action
     */
    public init(): Promise<void> {
        this.server.post('/github/newrelease', this.listener.bind(this));
        return Promise.resolve();
    }

    /**
     * getName
     * @description Get Action Name
     */
    public getName(): string {
        return "Any new Release Published";
    }

    /**
     * getDescription
     * @description Action Description
     */
    public getDescription(): string {
        return "This Trigger fires every time a release is published on a specific repo";
    }

    /**
     * getForm
     * @description get Action form
     */
    public getForm(idUser: string): Promise<Array<IForm>> {
        return this.getToken(idUser)
        .then((token) => {
            const kit = new Octokit({
                auth: `token ${token}`
            });
            // eslint-disable-next-line @typescript-eslint/camelcase
            return kit.repos.list({per_page: 100, type: 'all'});
        })
        .then((result) => {
            if (result.status !== 200)
                return Promise.reject(this.error.createError('02', 'Github GetForm', {}, result));
            const repos = result.data as Array<RepositoryInfo>;
            const bareRepos = [];
            for (const repo of repos)
                bareRepos.push(repo.full_name);
            return bareRepos;
        })
        .then((repos) => {
            return [{
                selectionBox: {
                    name: 'repo',
                    title: "Repository",
                    values: repos
                }
            }] as Array<IForm>;
        })
        .catch((error) => {
            return Promise.reject(this.error.createError('02', 'Github GetForm', {}, error));
        });
    }

    private getToken(idUser: string): Promise<string> {
        return this.db.collection('/User').where('idUser', '==', idUser)
        .get()
        .then((snapshots) => {
            if (snapshots.empty)
                return Promise.reject(this.error.createError('04', 'Failed to find Github Oauth'));
            const user = snapshots.docs[0].data().Github;
            if (!user)
                return Promise.reject(this.error.createError('04', 'Failed to find Github Oauth'));
            return user.access_token;
        });
    }

    /**
     * listener
     * @description Action Call Back
     */
    public subscribe(data: IGithubNewRelease, idUser: string): Promise<void> {
        return this.getToken(idUser)
        .then((token) => {
            const kit = new Octokit({
                auth: `token ${token}`
            });
            const parsedRepo = data.repo.split('/');
            return kit.repos.createHook({
                repo: parsedRepo[1],
                owner: parsedRepo[0],
                name: 'web',
                active: true,
                events: ['release'],
                config: {
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    content_type: 'json',
                    url: `https://area.cap.famille4.com/github/newrelease`,
                    secret: idUser
                },
            });
        })
        .then(() => {
            return Promise.resolve();
        })
        .catch((error) => {
            this.error.createError('04', 'Failed to find Github Oauth', {}, error);
            return Promise.resolve();
        });
    }

    private listener(req: Request, res: Response): void {
        const id = req.body.repository.full_name;
        if (req.body.action === 'published')
            this.dispatcher.dispatchAction('GithubNewRelease', { repo: id }).catch(console.log);
        res.sendStatus(200);
    }

}

inject.register("GithubNewReleaseAction", GithubNewReleaseAction);