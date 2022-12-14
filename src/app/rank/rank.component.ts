import { Component, OnInit } from '@angular/core';
import { voting } from 'src/app/home/voting';
import { UserService } from 'src/app/user.service';
import { Apollo, gql } from 'apollo-angular';

const VOTING = gql`
  query restaurantList($number: Int!) {
    restaurantList(number: $number) {
      name
      vote_number
      image_url
    }
  }
`;

const VOTE = gql`
  mutation voteUpdate($restaurant: String!) {
    voteUpdate(restaurant: $restaurant)
  }
`;

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css'],
})
export class RankComponent implements OnInit {
  constructor(public userservice: UserService, private apollo: Apollo) {}

  ngOnInit(): void {}
  //name = `The first restaurant in voting list`;

  showVotingList(): voting[] {
    var votinglist = this.userservice.getVotingList();
    /*if (votinglist == null) {
      this.apollo
        .query({
          query: VOTING,
          variables: {
            number: 10,
          },
        })
        .subscribe((response) => {
          var data: any = response;
          var list = data.data.restaurantList;
          var votings: voting[] = [];
          for (var i = 0; i < 10; i++) {
            var restaurant = list[i];
            var oneVoting: voting = {
              name: restaurant.name,
              numbers: restaurant.vote_number,
              url: restaurant.image_url,
            };
            votings[i] = oneVoting;
          }
          this.userservice.setVotingList(votings);
        });
      votinglist = this.userservice.getVotingList();
    }*/
    /*var voting1: voting = {
      name: 'McDounald',
      numbers: 21,
    };
    var voting2: voting = {
      name: 'KFC',
      numbers: 20,
    };
    var voting3: voting = {
      name: 'Popeyes',
      numbers: 2,
    };
    var votinglist = [];
    votinglist.push(voting1);
    votinglist.push(voting2);
    votinglist.push(voting3);*/
    return votinglist;
  }

  getVotings() {
    this.apollo
      .query({
        query: VOTING,
        variables: {
          number: 10,
        },
      })
      .subscribe((response) => {
        var data: any = response;
        var list = data.data.restaurantList;
        var votings: voting[] = [];
        for (var i = 0; i < 10; i++) {
          var restaurant = list[i];
          var oneVoting: voting = {
            name: restaurant.name,
            numbers: restaurant.vote_number,
            url: restaurant.image_url,
          };
          votings[i] = oneVoting;
        }
        this.userservice.setVotingList(votings);
      });
  }

  vote(idx: number) {
    if (this.userservice.getUsername() != null) {
      var unvalid = this.userservice.getIsVoted();
      if (unvalid) {
        alert('You already voted!');
        return;
      }
      this.apollo
        .mutate({
          mutation: VOTE,
          variables: {
            restaurant: this.showVotingList()[idx].name,
          },
        })
        .subscribe((response) => {
          var data: any = response;
          var message = data.data.voteUpdate;
          if (message === 'update successful') {
            this.userservice.setIsVoted(true); //local set voted
            this.userservice.toVote(idx); //local set voting numbers
            alert('Successfully Voted! Thank you!');
          } else if (message === 'restaurant not found') {
            alert(
              'Restaurant not found! Please contact custmer service for more infomation!'
            );
          } else if (message === 'update fail') {
            alert('Whoops! Something wrong happens, please try agian later!');
          }
        });
    } else {
      alert('Please Log in to vote!');
      return;
    }

    //need to add database voted and voting numbers
  }
}
