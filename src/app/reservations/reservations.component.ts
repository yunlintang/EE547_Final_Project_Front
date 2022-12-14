import { Component, OnInit } from '@angular/core';
import { booking } from 'src/app/booking';
import { UserService } from 'src/app/user.service';
import { Apollo, gql } from 'apollo-angular';

const CANCEL = gql`
  mutation reservationDelete(
    $restaurant: String!
    $username: String!
    $date: String!
  ) {
    reservationDelete(restaurant: $restaurant, username: $username, date: $date)
  }
`;

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
})
export class ReservationsComponent implements OnInit {
  constructor(public userservice: UserService, private apollo: Apollo) {}

  ngOnInit(): void {}

  showReservationList(): booking[] {
    var restaurants = this.userservice.getReservation();
    return restaurants;
  }

  getNoUser() {
    if (this.userservice.getUsername() != null) {
      return true;
    }
    return false;
  }

  cancel(idx: number) {
    //this.userservice.cancelReservation(idx); //local cancel
    //need to add database cancel
    //alert('Reservation cancelled');
    this.apollo
      .mutate({
        mutation: CANCEL,
        variables: {
          restaurant: this.showReservationList()[idx].name,
          username: this.userservice.getUsername(),
          date: this.showReservationList()[idx].date,
        },
      })
      .subscribe((response) => {
        var data: any = response;
        var message = data.data.reservationDelete;
        if (message === 'delete success') {
          this.userservice.cancelReservation(idx);
          alert('Reservation cancelled');
        } else if (message === 'no record') {
          alert('Whoops! Something wrong happens, please try agian later!');
        }
      });
  }
}
