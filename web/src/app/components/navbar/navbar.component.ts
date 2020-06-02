import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/provider/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor(
        private auth: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    public disconnect() {
        this.auth.disconnect()
        .then(() => {
            this.router.navigate(['']);
        })
        .catch((err) => {
            console.log(err);
        });
    }

}
