import { Component, OnInit, Input } from '@angular/core';
import { IService } from 'src/app/models/IService';
import { FirebaseApp } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
    selector: 'app-service-card',
    templateUrl: './service-card.component.html',
    styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent implements OnInit {

    @Input()
    public service: IService;

    @Input()
    public cardId: number;

    public ifText = '';
    public thenText = '';
    public author = '';

    constructor(
        private firebase: FirebaseApp,
        private afs: AngularFirestore
    ) { }

    ngOnInit() {
        const actionName: string = this.service.action.name;
        const reactionName: string = this.service.reaction.name;

        console.log(actionName);
        console.log(this.service);
        if (actionName === 'EveryHourAt')
            this.ifText = `If Every Hour At ${this.service.action.data.minute} minutes past the hour, `;
        if (actionName === 'EveryDayOfTheWeek')
            this.ifText = `If Every day of the week at ${this.service.action.data.hour}:${this.service.action.data.minute} AM on ${this.service.action.data['Day of the week']}, `;
        if (actionName === 'EveryDayAt')
            this.ifText = `If Every day at ${this.service.action.data.hour}:${this.service.action.data.minute}, `;
        if (actionName === 'GithubNewFork')
            this.ifText = `If There is a new fork on the repository ${this.service.action.data.repo}, `;
        if (actionName === 'GithubNewIssue')
            this.ifText = `If There is a new issue on the repository ${this.service.action.data.repo}, `;
        if (actionName === 'GithubNewPullRequest')
            this.ifText = `If There is a new pull request on the repository ${this.service.action.data.repo}, `;
        if (actionName === 'FXOver')
            this.ifText = `If the currency ${this.service.action.data.currency} is over ${this.service.action.data.value}, `;
        if (actionName === 'FXUnder')
            this.ifText = `If the currency ${this.service.action.data.currency} is under ${this.service.action.data.value}, `;
        if (reactionName === 'SendMail')
            this.thenText = `else Send email from ${this.service.reaction.data.email}`;
        if (reactionName === 'SendSlackMessage')
            this.thenText = `else Post a message to a Slack channel`;
        if (reactionName === 'Notification')
            this.thenText = `else Send a notification`;
        this.author = this.firebase.auth().currentUser.displayName;
    }

    public delete() {
        this.firebase.firestore()
        .collection('Area')
        .where('user', '==', this.service.user)
        .get()
        .then((querySnapshot) => {
            let i = 0;

            querySnapshot.forEach((doc) => {
                if (i === this.cardId)
                    this.firebase.firestore().collection('Area')
                    .doc(doc.id)
                    .delete()
                    .then(() => {
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                i++;
            });
        })
        .catch((error) => {
            console.log(error);
        });

    }
}
