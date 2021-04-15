import { Component, OnInit } from '@angular/core';
import {UserService } from './../../services/user.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {ImageServiceService} from './../../services/images/image-service.service'


class ImageSnippet {
  constructor(public src: string, 
    public file: File) {}

    pending: boolean = false;
    status: string = 'init';
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public color: ThemePalette = 'primary';
  public mode: ProgressSpinnerMode = 'determinate';
  public value_ = 50;
  public selectedFile: ImageSnippet;
  

  constructor(
    public userService: UserService, 
    private imageService: ImageServiceService
  ) { }

  ngOnInit(): void {
  }

  public getService(){

    this.userService.getUsers().subscribe(resp=>{
      console.log(resp);
    },err=>{
      console.log(err);
    })
    
  }

  public   processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.imageService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
        console.log(res);
        },
        (err) => {
          console.log(err);
        
        })
    });

    reader.readAsDataURL(file);
  }

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }



}
