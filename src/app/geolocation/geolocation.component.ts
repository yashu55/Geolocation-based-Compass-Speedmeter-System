import { Component, OnInit } from '@angular/core';
import { faCompass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css'],
})
export class GeolocationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  public faCompass = faCompass;
}
