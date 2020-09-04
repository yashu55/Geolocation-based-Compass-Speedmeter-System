import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { faKey } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent implements OnInit {
  public faKey = faKey;
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

  public fbFormGroup: FormGroup = this.fb.group(
    {
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
        ],
      ],
    },
    {
      validator: this.MustMatch('password', 'cpassword'),
    }
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  async Forgotpass() {
    const data = this.fbFormGroup.value;
    const url = 'http://localhost:3000/forgotpassword';
    try {
      const result: any = await this.http.post(url, data).toPromise();
      if (result.message) {
        alert('Password Reset Successfully.');
        this.fbFormGroup.reset();
        this.router.navigate(['login']);
      } else if (!result.message) {
        this.fbFormGroup.reset();
        this.responseVar = 'Invaid Credentials!! Please try again.';
        this.uiInvalidCredential = true;
        this.errorDiv = false;
      }
    } catch (err) {
      this.fbFormGroup.reset();
      console.log('Unable to connect to server');
      this.responseVar =
        ':-( Unable to connect to server. Please try again later.';
      this.uiInvalidCredential = true;
      this.errorDiv = false;
    }

    return false;
  }
}
