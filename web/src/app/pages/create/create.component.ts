import { Component, OnInit } from '@angular/core';
import { BuilderService } from 'src/app/provider/builder/builder.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { parseTemplate } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AuthService } from 'src/app/provider/auth.service';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

    private currentState: CREATE_STATE = CREATE_STATE.INIT;

    constructor(
        private builder: BuilderService,
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private firebase: FirebaseApp,
        private afAuth: AngularFireAuth,
        private angularFireMessaging: AngularFireMessaging,
        private authService: AuthService
    ) {
        route.queryParams
        .subscribe((params: Params) => {
            for (const state of Object.keys(CREATE_STATE)) {
                if (params.hasOwnProperty(CREATE_STATE[state]))
                    this.currentState = state as CREATE_STATE;
            }
            if (this.currentState === CREATE_STATE.IF_DATA && this.builder.getActionFormResponses() === null)
                this.currentState = CREATE_STATE.IF;
            if (this.currentState === CREATE_STATE.ELSE_DATA && this.builder.getReactionFormResponses() === null)
                this.currentState = CREATE_STATE.ELSE;
        });
    }

    ngOnInit() {
    }

    setState(state: CREATE_STATE) {
        const queryParams = {};

        queryParams['' + state.toString()] = '';
        this.router.navigate(['.'], { relativeTo: this.route, queryParams});
    }

    chooseAction(index: number) {
        this.builder.setAction(index);
        this.setState(CREATE_STATE.IF_CHOOSE);
    }

    chooseActionTrigger(index: number) {
        this.builder.setActionTrigger(index);
        this.setState(CREATE_STATE.IF_DATA);
    }

    chooseReaction(index: number) {
        this.builder.setReaction(index);
        this.setState(CREATE_STATE.ELSE_CHOOSE);
    }

    chooseReactionTrigger(index: number) {
        this.builder.setReactionTrigger(index);
        this.setState(CREATE_STATE.ELSE_DATA);
    }

    public canValidate(): boolean {
        if (this.currentState.toLowerCase() === CREATE_STATE.IF_DATA.toLowerCase()
            && this.builder.getActionFormResponses() !== null) {
            for (const key of Object.keys(this.builder.getActionFormResponses()))
                if (this.builder.getActionFormResponses()[key].length === 0)
                    return false;
        } else if (this.currentState.toLowerCase() === CREATE_STATE.ELSE_DATA.toLowerCase()
            && this.builder.getReactionFormResponses() !== null) {
            for (const key of Object.keys(this.builder.getReactionFormResponses()))
                if (this.builder.getReactionFormResponses()[key].length === 0)
                    return false;
        } else
            return false;
        return true;
    }

    trackByFn(index, item) {
        return index;
    }


    public sendData() {
        this.firebase.auth().currentUser.getIdToken(true)
        .then((idToken) => {
            return this.http.put('/subscribe/', {
                    actionName: this.builder.actionForm[this.builder.actionTriggerId].slugName,
                    actionData: this.builder.actionFormResponses,
                    reactionName: this.builder.reactionForm[this.builder.reactionTriggerId].slugName,
                    reactionData: this.builder.reactionFormResponses,
                }, {
                    headers: {
                        authorization: idToken
                    }
                }).toPromise();
        })
        .then((body) => {
            this.router.navigateByUrl('/');
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

enum CREATE_STATE {
    INIT = '',
    IF = 'if',
    IF_CHOOSE = 'if_choose',
    IF_DATA = 'if_data',
    ELSE = 'else',
    ELSE_CHOOSE = 'else_choose',
    ELSE_DATA = 'else_data'
}
