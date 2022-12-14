import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { restaurant } from '../restaurant';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  checkbox: boolean = false;
  constructor(public userservice: UserService, private http: HttpClient) {}

  ngOnInit(): void {}

  submit() {
    var keyword = document.getElementById('keyword') as HTMLInputElement;
    var distance = document.getElementById('distance') as HTMLInputElement;
    var location = document.getElementById('location') as HTMLInputElement;
    if (keyword.value === '') {
      return;
    }
    if (!this.checkbox && location.value == '') {
      return;
    }
    var key = keyword.value;
    var dis = '10693';
    if (distance.value != '') {
      dis = (Number(distance.value) * 1069.344).toFixed(0);
    }
    var loc = location.value;
    this.userservice.setShowResults(true);
    this.userservice.setShowDetails(false);

    //get location
    if (this.checkbox) {
      this.http
        .get('https://ipinfo.io/?token=82c7a7579b5335')
        .subscribe((data) => {
          var info: any = data;
          var sep = info.loc.split(',');
          var lat = sep[0];
          var lng = sep[1];
          this.http
            .get(
              'http://54.208.32.181/search/' +
                lat +
                '/' +
                lng +
                '/' +
                key +
                '/Food' +
                '/' +
                dis
            )
            .subscribe((data) => {
              var response: any = data;
              console.log(response);
              this.userservice.setSearchResults(response);
            });
        });
    } else {
      this.http
        .get(
          'https://maps.googleapis.com/maps/api/geocode/json?address=' +
            loc +
            '&key=AIzaSyBvDQydqKm-PpmaqIhB6dUMuCtPOXm6HF0'
        )
        .subscribe((data) => {
          var response: any = data;
          var lat = response.results[0].geometry.location.lat;
          var lng = response.results[0].geometry.location.lng;
          this.http
            .get(
              'http://54.208.32.181/search/' +
                lat +
                '/' +
                lng +
                '/' +
                key +
                '/Food' +
                '/' +
                dis
            )
            .subscribe((data) => {
              var response: any = data;
              this.userservice.setSearchResults(response);
            });
        });
    }
  }
  clear() {
    var keywordItem = document.getElementById('keyword') as HTMLInputElement;
    var distanceItem = document.getElementById('distance') as HTMLInputElement;
    var loactionItem = document.getElementById('location') as HTMLInputElement;
    var checkbox = document.getElementById('auto-detect') as HTMLInputElement;
    keywordItem.value = '';
    distanceItem.value = '';
    loactionItem.value = '';
    checkbox.checked = false;
    loactionItem.disabled = false;
    this.userservice.setShowResults(false);
    this.userservice.setShowDetails(false);
  }

  checkBox() {
    var auto = document.getElementById('auto-detect') as HTMLInputElement;
    this.checkbox = auto.checked;
    var location = document.getElementById('location') as HTMLInputElement;

    if (!auto.checked) {
      location.disabled = false;
    }
    if (auto.checked) {
      location.disabled = true;
    }
  }
}
