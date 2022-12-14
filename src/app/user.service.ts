import { Injectable } from '@angular/core';
import { booking } from './booking';
import { restaurant } from './home/restaurant';
import { voting } from './home/voting';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private username: any;
  private isLogin: boolean = false;
  private reservations: booking[] = [];
  private isVoted: boolean = false;
  private showRegister: boolean = false;
  private showSearch: boolean = false;
  private showResults: boolean = false;
  private showDetails: boolean = false;
  private searchResults: restaurant[] = [];
  private resultsId: string[] = [];
  private votinglist: voting[] = [];
  private isNoResult: boolean = false;
  constructor() {}

  getIsLogin() {
    return this.isLogin;
  }

  getIsVoted() {
    return this.isVoted;
  }

  getUsername() {
    return this.username;
  }

  getReservation() {
    return this.reservations;
  }

  getShowRegister() {
    return this.showRegister;
  }

  getShowSearch() {
    return this.showSearch;
  }

  getShowResults() {
    return this.showResults;
  }

  getShowDetails() {
    return this.showDetails;
  }

  getSearchResulst() {
    return this.searchResults;
  }

  getResultsId() {
    return this.resultsId;
  }

  setIsLogin(isLogin: boolean) {
    this.isLogin = isLogin;
  }

  setUsername(username: string) {
    this.username = username;
  }

  setReservations(bookings: booking[]) {
    this.reservations = bookings;
  }

  setVotingList(votings: voting[]) {
    this.votinglist = votings;
  }

  getVotingList() {
    return this.votinglist;
  }

  getIsNoResult() {
    return this.isNoResult;
  }

  setIsVoted(isVoted: boolean) {
    this.isVoted = isVoted;
  }

  setShowRegister(showRegister: boolean) {
    this.showRegister = showRegister;
  }

  setShowSearch(showSearch: boolean) {
    this.showSearch = showSearch;
  }

  setShowResults(showResults: boolean) {
    this.showResults = showResults;
  }

  setShowDetails(showDeatils: boolean) {
    this.showDetails = showDeatils;
  }

  setSearchResults(data: any) {
    var num = data.total;
    this.isNoResult = num == 0 ? true : false;
    var len = data.businesses.length;
    var total = len > 10 ? 10 : len;
    for (var i = 0; i < total; i++) {
      var single = data.businesses[i];
      let restaurant = {
        name: single.name,
        rate: single.rating,
        img: single.image_url,
        address:
          single.location.display_address[0] +
          ', ' +
          single.location.display_address[1],
        price: single.price,
        phone: single.display_phone,
        url: single.url,
      };
      this.searchResults[i] = restaurant;
    }
  }

  setResultsId(ids: string[]) {
    this.resultsId = ids;
  }

  addReservation(aBooking: booking) {
    this.reservations.push(aBooking);
  }

  cancelReservation(idx: number) {
    this.reservations.splice(idx, 1);
  }

  setVoted(status: boolean) {
    this.isVoted = status;
  }

  toVote(idx: number) {
    this.votinglist[idx].numbers += 1;
  }

  logout() {
    this.username = null;
    this.isLogin = false;
    this.reservations = [];
    this.isVoted = false;
    this.showDetails = false;
    this.showSearch = false;
    this.showResults = false;
    this.showDetails = false;
    this.searchResults = [];
    this.resultsId = [];
    this.votinglist = [];
    this.isNoResult = false;
  }
}
