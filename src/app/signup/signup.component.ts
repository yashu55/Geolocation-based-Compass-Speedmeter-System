import { Component, OnInit } from '@angular/core';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  public faUserPlus = faUserPlus;
}
