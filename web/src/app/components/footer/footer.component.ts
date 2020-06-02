import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    private authorsList = ['Hugo', 'Julien', 'Nicolas', 'Thibault-Alexandre'];
    private authors = '';

    constructor() { }

    ngOnInit() {
        this.authorsList.sort(() => Math.random() - 0.5);
        for (let i = 0; i < this.authorsList.length; i++) {
            this.authors += this.authorsList[i];
            if (i < this.authorsList.length - 1)
                this.authors += ', ';
        }
        this.authors += ' and the Open-Source community';
    }

}
