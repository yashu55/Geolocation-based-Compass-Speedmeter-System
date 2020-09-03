import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public faUser = faUser;
  public uiInvalidCredential = false;

  public fbFormGroup = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zAZ0-9]+@[a-zAZ0-9]+$'),
      ],
    ],
    password: ['', Validators.required],
  });

  abc = 'form-control';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  async submitForm() {
    const data = this.fbFormGroup.value;
    console.log(data);
    // ajax call
    const url = 'http://localhost:3000/auth-user';
    try {
      const result: any = await this.http.post(url, data).toPromise();
      if (result.opr) {
        sessionStorage.setItem('sid', 'true');
        this.router.navigate(['geolocation']);
      } else {
        this.uiInvalidCredential = true;
      }
    } catch (err) {
      this.uiInvalidCredential = true;
    }

    return false;
  }
}
