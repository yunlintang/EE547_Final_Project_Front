import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css'],
})
export class NavigateComponent implements OnInit {
  @Output() featureSelected = new EventEmitter<string>();
  constructor(public userservice: UserService) {}

  ngOnInit(): void {}

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  showLogout() {
    return this.userservice.getIsLogin();
  }
  logout() {
    this.userservice.logout();
  }
}
