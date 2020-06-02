import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router/testing';

describe('AuthGuardService', () => {
    let authSpy;

    beforeEach(() => {
        authSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);

        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            providers: [
                AuthGuardService,
                { provide: AuthService, useValue: authSpy },
                { provide: Router, useClass: {navigate(a) {}} }
            ]
        });
    });

    it('should be created', () => {
        const service: AuthGuardService = TestBed.get(AuthGuardService);
        expect(service).toBeTruthy();
    });

    it('should only authorize logged users', () => {
        const service: AuthGuardService = TestBed.get(AuthGuardService);
        authSpy.isAuthenticated.and.returnValue(true);
        
    });
});
