import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCompass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}
  public faCompass = faCompass;

  ngOnInit(): void {
    if (!sessionStorage.getItem('sid')) {
      this.router.navigate(['login']);
    }
  }

  logoutProcess() {
    if (confirm('Do you want to logout?')) {
      for (let i = 0; i < 1000; i++) {
        window.clearInterval(i);
      }
      sessionStorage.removeItem('sid');
      sessionStorage.removeItem('email');
      this.router.navigate(['login']);
    }
  }
}
