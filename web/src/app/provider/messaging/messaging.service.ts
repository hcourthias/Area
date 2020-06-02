import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import { FirebaseApp } from 'angularfire2';
import { AuthService } from '../auth.service';
@Injectable({
  providedIn: 'root'
})
export class MessagingService {
    currentMessage = new BehaviorSubject(null);

    constructor(
        private angularFireMessaging: AngularFireMessaging,
        private firebase: FirebaseApp,
        // private authService: AuthService
    ) {
        this.angularFireMessaging.messaging.subscribe((_messaging) => {
            _messaging.onMessage = _messaging.onMessage.bind(_messaging);
            _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        });
    }

    requestPermission() {
        this.angularFireMessaging.requestToken.subscribe((token) => {
            console.log("Token notif:");
            console.log(token);
            console.log(JSON.parse(localStorage.getItem('user')));
            this.firebase.firestore().collection('User')
            .where('idUser', '==', JSON.parse(localStorage.getItem('user')).uid)
            .get()
            .then(snapshot => {
                const tmp = [];
                console.log(tmp);

                if (snapshot.empty) {
                    tmp.push(localStorage.getItem('token_notif'));
                    return this.firebase.firestore()
                        .collection('User')
                        .doc()
                        .set({
                        idUser: JSON.parse(localStorage.getItem('user')).uid,
                        Notification: { firebase: tmp }
                        });
                } else {
                    if (
                        snapshot.docs[0].data().Notification &&
                        snapshot.docs[0].data().Notification.firebase
                    )
                        tmp.push(...snapshot.docs[0].data().Notification.firebase);
                    if (!tmp.includes(localStorage.getItem('token_notif'))) tmp.push(localStorage.getItem('token_notif'));
                    return this.firebase.firestore()
                        .collection('User')
                        .doc(snapshot.docs[0].id)
                        .update({
                            idUser: JSON.parse(localStorage.getItem('user')).uid,
                            Notification: { firebase: tmp }
                        });
                }
            });
            localStorage.setItem('token_notif', token);
        }, (err) => {
            console.error('Unable to get permission to notify.', err);
        });
    }

    receiveMessage() {
        this.angularFireMessaging.messages.subscribe((payload) => {
            console.log("new message received. ", payload);
            this.currentMessage.next(payload);
        });
    }
}
