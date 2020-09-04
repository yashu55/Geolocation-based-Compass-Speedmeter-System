import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public faUser = faUser;
  public uiInvalidCredential = false;
  public responseVar = '';

  public fbFormGroup: FormGroup = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern(
          '^[a-zA-Z0-9_\\.]+@[a-zA-Z0-9_\\.]+(\\.[a-zA-Z0-9_\\.]+)+$'
        ),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(
          '^(?=.*[\\d])(?=.*[a-z])(?=.*[A-Z])(?!.*[\\s]).{6,12}$'
        ),
        //  Validators.pattern('^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$'),
      ],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  async submitForm() {
    const data = this.fbFormGroup.value;
    // ajax call
    const url = 'http://localhost:3000/auth-user';
    try {
      const result: any = await this.http.post(url, data).toPromise();
      if (result.opr) {
        sessionStorage.setItem('sid', 'true');
        sessionStorage.setItem('email', data.email);
        //Session expiring code
        // setTimeout(() => {
        //   sessionStorage.removeItem('email');
        //   sessionStorage.removeItem('sid');
        //   alert('Session Expired!!');
        //   this.router.navigate(['login']);
        // }, 1000000);

        this.router.navigate(['home']);
      } else if (result.opr === false) {
        this.responseVar = 'Invalid email or password!!';
        this.uiInvalidCredential = true;
        this.fbFormGroup.reset();
      }
    } catch (err) {
      this.responseVar =
        ':-( Unable to connect to server. Please try again later.';
      this.uiInvalidCredential = true;
      this.fbFormGroup.reset();
    }

    return false;
  }
}
