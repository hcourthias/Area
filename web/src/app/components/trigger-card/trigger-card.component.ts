import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-trigger-card',
    templateUrl: './trigger-card.component.html',
    styleUrls: ['./trigger-card.component.scss']
})
export class TriggerCardComponent implements OnInit {

    @Input()
    public description: string;

    @Input()
    public title: string;

    @Input()
    public id: string;

    @Input()
    public color: string;


    constructor() { }

    ngOnInit() {
    }

}
