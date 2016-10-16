import {Component} from '@angular/core';
import {RestService} from '../services/rest-service';

@Component({
  selector: 'search',
  templateUrl: 'search.html',
  providers: [RestService]
})
export class Search {
  private keyword: string;
  public results: Array<any> = [];

  constructor(private restService: RestService) {
  }

  searchUser() {
    let url = 'users?scope=search&q=' + this.keyword;
    this.restService.all(url, {}, {})
      .subscribe(response => {
        this.results.push(response.json()['data']);
      });
  }

}
