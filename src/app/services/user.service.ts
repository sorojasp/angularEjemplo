import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public httpClient: HttpClient
  ) { }

public getUsers(){
  return this.httpClient.get('https://jsonplaceholder.typicode.com/posts');
}

}
