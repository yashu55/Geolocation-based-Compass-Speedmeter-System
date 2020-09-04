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
    if (!sessionStorage.getItem('sid')) {
      this.router.navigate(['login']);
    }
    try {
      const url = 'http://localhost:3000/details';
      let data3: any = {};
      data3.email = this.email;
      console.log(data3);
      let result: any = await this.http.post(url, data3).toPromise();
      result = result[0];
      this.firstname = result.firstname;
      this.lastname = result.lastname;
      this.mobile = result.mobile;
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
    let data = this.fbFormGroup.value;
    data.email = this.email;
    console.log(data);
    const url = 'http://localhost:3000/updatepassword';
    try {
      const result: any = await this.http.post(url, data).toPromise();
      console.log(result);
      if (result.message) {
        alert('Password Reset Successfully.');
        this.fbFormGroup.reset();
      } else if (!result.message) {
        this.fbFormGroup.reset();
        this.responseVar = 'Incorrect old password entred!!';
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

  async delAcc() {
    if (confirm('Do you really want to delete the account?')) {
      let data2: any = {};
      data2.email = this.email;
      console.log(data2);
      const url = 'http://localhost:3000/deleteaccount';
      try {
        const result: any = await this.http.post(url, data2).toPromise();
        console.log(result);
        if (result.message) {
          alert('Account Deleted.Thanks for using our service!!:-)');
          this.fbFormGroup.reset();
          sessionStorage.removeItem('sid');
          for (let i = 0; i < 100; i++) {
            window.clearInterval(i);
          }
          sessionStorage.removeItem('email');
          sessionStorage.removeItem('intervalID');
          sessionStorage.clear();
          this.router.navigate(['login']);
        } else if (!result.message) {
          this.fbFormGroup.reset();
          this.responseVar = 'Unable to delete account. Try again later';
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
}
