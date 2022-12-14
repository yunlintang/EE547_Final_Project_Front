import { Component, OnInit } from '@angular/core';
import { booking } from 'src/app/booking';
import { UserService } from 'src/app/user.service';
import { restaurant } from '../restaurant';
import { Apollo, gql } from 'apollo-angular';

const RESERVE = gql`
  mutation reservationCreate(
    $restaurant: String!
    $username: String!
    $date: String!
  ) {
    reservationCreate(restaurant: $restaurant, username: $username, date: $date)
  }
`;

@Component({
  selector: 'app-result',

  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  today: Date = new Date();
  constructor(public userservice: UserService, private apollo: Apollo) {}

  ngOnInit(): void {}

  isNoResults(): boolean {
    return this.userservice.getIsNoResult();
  }
  showResultsTab(): restaurant[] {
    var restaurants = this.userservice.getSearchResulst();
    return restaurants;
  }

  reserve(name: string, i: number) {
    var idx = i + '';
    var date = document.getElementById(idx) as HTMLInputElement;
    console.log(date.value);
    if (date.value === '') {
      alert('Please choose a reservation date!');
      return;
    }
    var dates = date.value.split('/');
    var final_date = dates[0] + '-' + dates[1] + '-' + dates[2];
    console.log(name);
    var reservation: booking = {
      name: name,
      date: final_date,
    };
    this.apollo
      .mutate({
        mutation: RESERVE,
        variables: {
          restaurant: name,
          username: this.userservice.getUsername(),
          date: final_date,
        },
      })
      .subscribe((response) => {
        console.log(response);
        var data: any = response;
        var message = data.data.reservationCreate;
        if (message === 'success') {
          this.userservice.addReservation(reservation);
          alert('Reservation successed!');
        } else if (message === 'Reservation already exist') {
          alert('Failed! You have the same reservation!');
        }
      });
  }
}
