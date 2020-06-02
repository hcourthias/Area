import { Component, OnInit, Input } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/provider/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    @Input()
    public email = '';
    @Input()
    public password = '';

    @Input()
    public passwordRepeat = '';

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

    public register() {
        if (this.email.length === 0 || this.password.length === 0)
            return;
        if (this.password !== this.passwordRepeat) {
            this.textError = 'The passwords must match';
            this.passwordError = true;
            return;
        }
        this.mailError = false;
        this.passwordError = false;
        this.textError = '';
        this.connecting = true;
        this.auth.register(this.email, this.password)
        .then((user) => {
            this.connecting = false;
            this.router.navigateByUrl('/home');
        })
        .catch((err) => {
            this.connecting = false;
            this.textError = err.message;
            if (err.code === 'auth/invalid-email') {
                this.mailError = true;
            } else if (err.code === 'auth/weak-password') {
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
