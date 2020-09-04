import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  faAddressBook,
  faTrash,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-accountdetails',
  templateUrl: './accountdetails.component.html',
  styleUrls: ['./accountdetails.component.css'],
})
export class AccountdetailsComponent implements OnInit {
  public uiInvalidCredential = false;
  public responseVar = '';
  public errorDiv = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}
  public faAddressBook = faAddressBook;
  public faTrash = faTrash;
  public faWrench = faWrench;

  public firstname = 'NA';
  public lastname = 'NA';
  public email = sessionStorage['email'] || 'NA';
  public mobile = 'NA';

  async ngOnInit() {
    try {
      const url = 'http://localhost:3000/details';
      const result: any = await this.http.post(url, this.email).toPromise();
    } catch (err) {}
  }

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
      opassword: [
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

  async Updatepass() {
    const data = this.fbFormGroup.value;
    const url = 'http://localhost:3000/updatepassword';
    try {
      const result: any = await this.http.patch(url, data).toPromise();
      if (result.message) {
        alert('Password Reset Successfully.');
        this.fbFormGroup.reset();
        this.router.navigate(['login']);
      } else if (result.message == 'failure') {
        this.fbFormGroup.reset();
        this.responseVar = 'There was some failure while updating';
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

  async delAcc() {}
}
