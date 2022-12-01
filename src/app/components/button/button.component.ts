import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input()
  title!: string;
  @Input()
  leftIcon!: string;
  @Input()
  rightIcon!: string;
  @Input()
  backgroundColor!: string;
  @Input()
  fontColor!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
