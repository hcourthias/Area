import { Component, OnInit, Input } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from 'src/app/provider/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

    @Input()
    public email = '';

    public options: AnimationOptions = {
        path: '../../../assets/animations/welcome.json',
        autoplay: true,
        loop: true
    }; // 50 à 218

    constructor(
        private auth: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    public connectViaGoogle() {
        this.auth.loginViaGoogle()
        .catch((err) => {
            console.log('Error');
            console.log(err);
        });
    }

    public connectViaFacebook() {

    }

    public dispatchUser() {
        this.auth.login(this.email, '')
        .then((user) => {
        })
        .catch((err) => {
            if (err.code === 'auth/wrong-password') {
                this.router.navigate(['/login'], { queryParams: { email: this.email} });
            } else {
                this.router.navigate(['/register'], { queryParams: { email: this.email} });
            }
        });

    }
}
