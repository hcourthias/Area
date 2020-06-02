import { Component, OnInit } from '@angular/core';
import { Router, Event, ActivationStart } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MessagingService } from '../app/provider/messaging/messaging.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    public message: any;

    constructor(
        router: Router,
        title: Title,
        private messagingService: MessagingService
    ) {
        router.events.subscribe((event: Event) => {
            if (event instanceof ActivationStart) {
                if (event.snapshot.data.hasOwnProperty('title'))
                    title.setTitle(event.snapshot.data.title);
                else
                    title.setTitle('AREA');
            }
        });
    }

    ngOnInit() {
      this.messagingService.receiveMessage();
      // this.message 
      this.message = this.messagingService.currentMessage;
    }
}
