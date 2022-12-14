import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/user.service';
import { booking } from 'src/app/booking';
import { Apollo, gql } from 'apollo-angular';

const LOGIN = gql`
  query user($username: String!, $password: String!) {
    user(username: $username, password: $password) {
      username
      message
      is_voted
      reservations {
        restaurant
        username
        date
      }
      total_reservations
    }
  }
`;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: any;
  password: any;
  notMatch: boolean = false;
  noRecord: boolean = false;
  noInput: boolean = false;
  constructor(
    private http: HttpClient,
    private userservice: UserService,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {}

  submit() {
    this.notMatch = false;
    this.noRecord = false;
    this.noInput = false;
    var usernameItem = document.getElementById('username') as HTMLInputElement;
    var passwordItem = document.getElementById('password') as HTMLInputElement;
    if (usernameItem.value === '' || passwordItem.value === '') {
      console.log('empty');
      this.noInput = true;
      return;
    } else {
      var pin: string = passwordItem.value;
      var user: string = usernameItem.value;
      this.apollo
        .query({
          query: LOGIN,
          variables: {
            username: user,
            password: pin,
          },
        })
        .subscribe((response) => {
          console.log(response);
          var data: any = response;
          var message = data.data.user.message;
          var res = data.data.user;
          if (message === 'success') {
            var is_voted: boolean = res.is_voted;
            this.userservice.setIsVoted(is_voted);
            var total: number = res.total_reservations;
            var bookings: booking[] = [];
            var reservations = res.reservations;
            for (var i = 0; i < total; i++) {
              var reservation = reservations[i];
              var oneBooking: booking = {
                name: reservation.restaurant,
                date: reservation.date,
              };
              bookings[i] = oneBooking;
            }
            this.userservice.setUsername(user);
            this.userservice.setReservations(bookings);
            this.userservice.setIsLogin(true);
            this.userservice.setShowSearch(true);
          } else if (message === 'not match') {
            this.notMatch = true;
          } else {
            this.noRecord = true;
          }
        });
    }
  }

  register() {
    this.userservice.setShowRegister(true);
  }
  getNoInput() {
    console.log(this.noInput);
    return this.noInput;
  }

  getNotMatch() {
    return this.notMatch;
  }

  getNoRecords() {
    return this.noRecord;
  }
}
