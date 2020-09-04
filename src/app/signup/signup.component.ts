import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public responseVar = '';
  public errorDiv = true;
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  public fbFormGroupSignup: FormGroup = this.form.group(
    {
      firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
          Validators.pattern('^[a-zA-Z]+$'),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[a-zA-Z]+$'),
        ],
      ],
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
      securityquestion: ['', Validators.required],
      answer: ['', [Validators.required, Validators.maxLength(30)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern(
            '^(?=.*[\\d])(?=.*[a-z])(?=.*[A-Z])(?!.*[\\s]).{8,20}$'
          ),
          //  Validators.pattern('^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$'),
        ],
      ],
      cpassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern(
            '^(?=.*[\\d])(?=.*[a-z])(?=.*[A-Z])(?!.*[\\s]).{8,20}$'
          ),
          //   Validators.pattern('^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$'),
        ],
      ],
      mobile: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('[0-9]{10}'),
          //   Validators.pattern('^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$'),
        ],
      ],
    },
    {
      validator: this.MustMatch('password', 'cpassword'),
    }
  );
  constructor(
    private form: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  async registerHere() {
    const data = this.fbFormGroupSignup.value;
    // console.log(data);
    const url = 'http://localhost:3000/adduser';
    try {
      const result: any = await this.http.post(url, data).toPromise();
      if (result.message) {
        alert('Welcome:-)\nYou have registered successfully!!');
        this.fbFormGroupSignup.reset();
        this.router.navigate(['login']);
      } else if (result.message == 'registered') {
        this.fbFormGroupSignup.reset();
        this.responseVar = 'Email address is already registered!!';
        this.uiInvalidCredential = true;
        this.errorDiv = false;
      }
    } catch (err) {
      this.fbFormGroupSignup.reset();
      console.log('Unable to connect to server');
      this.responseVar =
        ':-( Unable to connect to server. Please try again later.';
      this.uiInvalidCredential = true;
      this.errorDiv = false;
    }

    return false;
  }
}
