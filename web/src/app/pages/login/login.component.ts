import { Component, OnInit, Input } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from 'src/app/provider/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    @Input()
    public email = '';
    @Input()
    public password = '';

    public mailError = false;
    public passwordError = false;
    public textError = '';

    public connecting = false;

    constructor(
        private auth: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.queryParams
        .subscribe(params => {
            this.email = params.email;
        });
    }

    public login() {
        if (!this.email || !this.password) {
            this.textError = 'The email or the password field is empty';
            this.mailError = true;
            this.passwordError = true;
            return;
        }
        this.mailError = false;
        this.passwordError = false;
        this.textError = '';
        this.connecting = true;
        this.auth.login(this.email, this.password)
        .then((user) => {
            this.connecting = false;
            this.router.navigateByUrl('/home');
            location.reload();            
        })
        .catch((err) => {
            this.connecting = false;
            this.textError = err.message;
            if (err.code === 'auth/invalid-email' || err.code === 'auth/user-not-found') {
                this.mailError = true;
            } else if (err.code === 'auth/wrong-password') {
                this.passwordError = true;
            }
            console.log(err);
        });
    }

    public connectViaGoogle() {
        this.auth.loginViaGoogle()
        .then((user) => {
            console.log('Success');
            console.log(user);
            localStorage.setItem('google', JSON.stringify(user));
        })
        .catch((err) => {
            console.log('Error');
            console.log(err);
        });
    }
}
