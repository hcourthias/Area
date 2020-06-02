import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient } from '@angular/common/http';
import { FirebaseDatabase, FirebaseApp, AngularFireModule } from '@angular/fire';
import * as a from 'angularfire2';
import { AngularFirestore } from '@angular/fire/firestore';
import { RecursiveTemplateAstVisitor } from '@angular/compiler';
import { IAction } from 'src/app/models/IAction';
import { MessagingService } from '../messaging/messaging.service';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class BuilderService {

    private actions: Array<IAction>; // List of actions
    public actionForm: any = null; // Action form
    public actionFormResponses: any = null; // Actions responses (to send to the backend)
    public currentAction: IAction; // Current action to display
    private currentActionTriggers: any[];
    private actionId: number; // Id of the action
    public actionTriggerId: number; // Id of the trigger

    private reactions: Array<IAction>;
    public reactionForm: any = null;
    public reactionFormResponses: any = null;
    public currentReaction: IAction;
    private reactionId: number;
    public reactionTriggerId: number;

    constructor(
        private http: HttpClient,
        private afs: AngularFirestore,
        private firebase: FirebaseApp,
        private messagingService: MessagingService,
        private angularFireMessaging: AngularFireMessaging,
        private authService: AuthService
    ) {
        this.afs.collection('/Services').valueChanges()
        .subscribe((data: Array<IAction>) => {
            const actions = [];
            const reactions = [];

            for (const service of data) {
                if (service.type === 'action')
                    actions.push(service);
                else
                    reactions.push(service);
            }
            this.actions = actions;
            this.reactions = reactions;
            console.log(data);
        });

    }

    public getActionFormResponses(): any {
        return this.actionFormResponses;
    }

    public getReactionFormResponses(): any {
        return this.reactionFormResponses;
    }

    public clear(): void {
    }

    public getActions() {
        return this.actions;
    }

    public setAction(id: number): void {
        this.actionId = id;
        this.currentAction = this.actions[id];
        this.firebase.firestore().collection('User')
        // tslint:disable-next-line: no-string-literal
        .where('idUser', '==', this.authService['afAuth'].auth.currentUser.uid)
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                return this.authService.loginViaGithub();
            } else {
                if (snapshot.docs[0].data().Github)
                    return Promise.resolve();
                return this.authService.loginViaGithub();
            }
        })
        .then(() => {
            return this.firebase.auth().currentUser.getIdToken();
        })
        .then((token) => {
            return this.http.get(`/actions/${this.actions[id].name}`, {
                headers: {Authorization: token}}).toPromise();
        })
        .then((body: any) => {
            this.actionForm = body.data.actions;
        })
        .catch((err) => {
            console.log(err);
        });
    }

    public setReaction(id: number): void {
        this.reactionId = id;
        this.currentReaction = this.reactions[id];
        this.firebase.auth().currentUser.getIdToken(true)
        .then((token) => {
            return this.http.get(`/reactions/${this.reactions[id].name}`, {
                headers: {Authorization: token}}).toPromise();
        })
        .then((body: any) => {
            console.log(body);
            this.reactionForm = body.data.reactions;
        })
        .catch((err) => {
            console.log(err);
        });
    }

    public getAction(): number {
        return this.actionId;
    }

    public setActionTrigger(id: number) {
        this.actionTriggerId = id;
        this.actionFormResponses = {};
        for (const field of this.actionForm[id].form) {
            if (field.hasOwnProperty('selectionBox'))
                this.actionFormResponses[field.selectionBox.name] = '';
            else if (field.hasOwnProperty('input'))
                this.actionFormResponses[field.input.name] = '';
        }
    }

    public setReactionTrigger(id: number) {
        this.reactionTriggerId = id;
        this.reactionFormResponses = {};
        for (const field of this.reactionForm[id].form) {
            if (field.hasOwnProperty('selectionBox'))
                this.reactionFormResponses[field.selectionBox.name] = '';
            else if (field.hasOwnProperty('input'))
                this.reactionFormResponses[field.input.name] = '';
        }
    }
}
