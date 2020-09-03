import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public faUserPlus = faUserPlus;
  public uiInvalidCredential = false;

  public fbFormGroupSignup = this.form.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zAZ0-9]+@[a-zAZ0-9]+$'),
      ],
    ],
    password: ['', Validators.required],
    mobile: ['', Validators.required],
  });

  constructor(
    private form: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  async registerHere() {
    const data = this.fbFormGroupSignup.value;
    console.log(data);
    const url = 'http://localhost:3000/adduser';
    try {
      const result: any = await this.http.post(url, data).toPromise();
      if (result.message) {
        this.uiInvalidCredential = true;
        this.fbFormGroupSignup.reset();
      } else {
        this.fbFormGroupSignup.reset();

        throw new Error();
      }
    } catch (err) {
      this.fbFormGroupSignup.reset();
      console.log('Unable to connect to server');
    }

    return false;
  }
}
