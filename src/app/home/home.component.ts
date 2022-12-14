import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(public userservice: UserService) {}

  ngOnInit(): void {}

  showLogin() {
    var isLogin: boolean = this.userservice.getIsLogin();
    var needLogin: boolean = !isLogin && !this.userservice.getShowRegister();
    return needLogin;
  }

  showRegister() {
    return this.userservice.getShowRegister();
  }

  showSearch() {
    return this.userservice.getShowSearch();
  }

  showResults() {
    return this.userservice.getShowResults();
  }

  showDetails() {
    return this.userservice.getShowDetails();
  }
}
