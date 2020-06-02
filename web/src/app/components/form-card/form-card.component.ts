import { Component, OnInit, Input } from '@angular/core';
import { BuilderService } from 'src/app/provider/builder/builder.service';

@Component({
    selector: 'app-form-card',
    templateUrl: './form-card.component.html',
    styleUrls: ['./form-card.component.scss']
})
export class FormCardComponent implements OnInit {


    @Input()
    public form: any;

    @Input()
    public formResponse: any;

    public inputValue: any = {};

    constructor(
        private builder: BuilderService
    ) { }

    ngOnInit() {
    }

    /**
     * Check if the component is a selection box
     */
    public isSelectComponent(element: object): boolean {
        return element.hasOwnProperty('selectionBox');
    }

    /**
     * Check if the component is an input
     */
    public isInputComponent(element: object): boolean {
        return element.hasOwnProperty('input');
    }

    public trackByFn(index, item) {
        return index; // or item.id
    }

    public onKey(event: any, index: number) {
        const regexStr = this.form.form[index].input.regex;
        if (!regexStr)
            return;
        const regex = new RegExp(regexStr);

        if (regex) {
            if (regex.test(this.formResponse[index]))
                console.log("regex ok")
            else
                console.log("regex pas ok");
            // this.builder.
        }
    }
}
