import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseApp } from 'angularfire2';
import { MessagingService } from './messaging/messaging.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    public userData: any = null;
    public accessToken = '';

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        public afs: AngularFirestore,
        public ngZone: NgZone,
        public firebase: FirebaseApp,
        private messagingService: MessagingService
    ) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                this.messagingService.requestPermission();
            } else {
                localStorage.setItem('user', null);
            }
        });
    }

    public loginViaGoogle() {
        return new Promise<any>((resolve, reject) => {
            const provider = new firebase.auth.GoogleAuthProvider();

            provider.addScope('profile');
            provider.addScope('email');
            firebase.auth().signInWithPopup(provider)
            .then((result: firebase.auth.UserCredential) => {
                this.router.navigate(['home']);
                // @ts-ignore
                localStorage.setItem('google', result.credential.accessToken);
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    public loginViaGithub() {
        return new Promise<any>((resolve, reject) => {
            const provider = new firebase.auth.GithubAuthProvider();
            provider.addScope('admin:repo_hook, repo');
            this.afAuth.auth.signInWithPopup(provider)
            .then((result) => {
                // @ts-ignore
                this.SaveGithubToken(result.credential.accessToken)
                .then(resolve)
                .catch(reject);
                localStorage.setItem('github', JSON.stringify(result));
                resolve(result);
            })
            .catch((err) => {
                if (err && err.credential && err.credential.accessToken)
                    this.SaveGithubToken(err.credential.accessToken)
                    .then(resolve)
                    .catch(reject);
                reject(err);
            });
        });
    }

    private SaveGithubToken(token) {
        return this.firebase.firestore().collection('User')
        .where('idUser', '==', this.afAuth.auth.currentUser.uid)
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                return this.firebase.firestore()
                    .collection('User')
                    .doc()
                    .set({
                    idUser: this.afAuth.auth.currentUser.uid,
                    // tslint:disable-next-line: no-string-literal
                    Github: { access_token: token }
                    });
            } else {
                return this.firebase.firestore()
                .collection('User')
                .doc(snapshot.docs[0].id)
                .update({
                    idUser: this.afAuth.auth.currentUser.uid,
                    // tslint:disable-next-line: no-string-literal
                    Github: { access_token: token }
                });
            }
        });
    }

    /**
     * Login the user
     * @param email user's email
     * @param password user's password
     */
    public login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((result) => {
            this.ngZone.run(() => {
                this.router.navigate(['home']);
            });
        });
    }

    /**
     * Register the user
     * @param email user's email
     * @param password user's password
     */
    public register(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    }

    /**
     * Check if the user is authenticated
     */
    get isAuthenticated(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user !== null) ? true : false;
    }

    /**
     * Disconnect the user
     */
    public disconnect() {
        return this.afAuth.auth.signOut()
            .then(() => {
                localStorage.removeItem('user');
                this.userData = null;
                localStorage.removeItem('google');
                this.router.navigate(['']);
        });
    }
}
