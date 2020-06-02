import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-action-card',
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.scss']
})
export class ActionCardComponent implements OnInit {

  @Input()
  public url: string;

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
