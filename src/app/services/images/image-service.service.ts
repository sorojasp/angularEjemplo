import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(private http: HttpClient) { }

  public uploadImage(image: File){
    const formData = new FormData();

    formData.append('image', image);

    return this.http.post('https://www.realmadrid.com/en', formData);
  }

  
}
