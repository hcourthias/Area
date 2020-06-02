import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
// import { ServiceComponent } from './pages/service/service.component';
import { AppCardComponent } from './components/app-card/app-card.component';
import { CreateComponent } from './pages/create/create.component';

import { AngularFireStorageModule } from '@angular/fire/storage';
import { ActionCardComponent } from './components/action-card/action-card.component';
import { FormCardComponent } from './components/form-card/form-card.component';
import { TriggerCardComponent } from './components/trigger-card/trigger-card.component';

import { DownloadComponent } from './pages/download/download.component';

import { AngularFireMessagingModule } from '@angular/fire/messaging';

export function playerFactory() {
    return player;
}

@NgModule({
    declarations: [
        AppComponent,
        WelcomeComponent,
        NavbarComponent,
        WelcomeComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        FooterComponent,
        ExploreComponent,
        ServiceCardComponent,
        // ServiceComponent,
        AppCardComponent,
        CreateComponent,
        ActionCardComponent,
        FormCardComponent,
        TriggerCardComponent,
        DownloadComponent
    ],
    imports: [
        AngularFireMessagingModule,
        AngularFireModule.initializeApp(environment.firebase) as ModuleWithProviders<AngularFireModule>,
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule,
        FormsModule,
        FlexLayoutModule,
        LottieModule.forRoot({ player: playerFactory }),
        MatCardModule,
        MatButtonModule,
        MatDividerModule,
        MatSelectModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
