import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public title: string;
  public subtitle: string;
  public email: string;

  constructor() {
    this.title = 'Jorge Muñoz';
    this.subtitle = 'Web Developer';
    this.email = 'jorgedev@yopmail.com';
  }

  ngOnInit(): void {
  }

}
