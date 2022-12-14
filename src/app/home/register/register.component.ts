import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { Apollo, gql } from 'apollo-angular';

const USER_CREATE = gql`
  mutation userCreate($username: String!, $password: String!) {
    userCreate(username: $username, password: $password) {
      message
      username
      is_voted
      total_reservations
      reservations {
        restaurant
        date
      }
    }
  }
`;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(public userservice: UserService, private apollo: Apollo) {}

  ngOnInit(): void {}

  register() {
    var pin1 = document.getElementById('password') as HTMLInputElement;
    var pin2 = document.getElementById('password2') as HTMLInputElement;
    var username = document.getElementById('username') as HTMLInputElement;
    if (pin1.value != pin2.value) {
      alert('Two passwords not match, please check');
      return;
    } else {
      var pin = pin1.value;
      var name = username.value;
      this.apollo
        .mutate({
          mutation: USER_CREATE,
          variables: {
            username: name,
            password: pin,
          },
        })
        .subscribe((response) => {
          console.log(response);
          var data: any = response;
          console.log(data);
          var message = data.data.userCreate.message;
          if (message === 'success') {
            alert('Registered! Please login to find more info on our website!');
          } else {
            alert('Failed! Username already used!');
          }
        });
    }
  }

  back() {
    this.userservice.setShowRegister(false);
  }
}
