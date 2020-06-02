import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/provider/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { IService } from 'src/app/models/IService';
import { AngularFirestore } from '@angular/fire/firestore';
import { IAction } from 'src/app/models/IAction';
import { FirebaseApp, FirebaseDatabase } from '@angular/fire';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public services: IService[] = [];

    constructor(
        private auth: AuthService,
        private router: Router,
        private afs: AngularFirestore,
        private firebase: FirebaseApp
    ) {
        this.afs.collection('/Area').valueChanges()
        .subscribe((data: Array<IService>) => {
            if (this.firebase.auth().currentUser.uid !== null) {
                this.services = data.filter((val: any) => val.idUser === this.firebase.auth().currentUser.uid);
            }
        });

    }

    ngOnInit() {

    }

    trackByFn(index, item) {
        return index;
    }
}
