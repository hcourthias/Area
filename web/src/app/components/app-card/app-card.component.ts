import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-app-card',
    templateUrl: './app-card.component.html',
    styleUrls: ['./app-card.component.scss']
})
export class AppCardComponent implements OnInit {

    @Input()
    public title: string;

    @Input()
    public id: string;

    @Input()
    public author: string;

    @Input()
    public downloads: string;

    @Input()
    public color: string;

    constructor() { }

    ngOnInit() {
    }

}
