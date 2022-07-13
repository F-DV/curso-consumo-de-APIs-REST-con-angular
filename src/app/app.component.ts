import { Component } from '@angular/core';
import { Product } from './models/product.model';
import { AuthService } from './services/auth.service';
import { FilesService } from './services/files.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';
  imgRta = '';

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private fileService: FilesService
    ){}

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }
  createUser(){
    this.usersService.create({
      name: 'Sebas',
      email: 'sebas@mail.com',
      password: '1212'
    })
    .subscribe(rta => {
      console.log(rta)
    })
  }
  loginn(){
    this.authService.login('sebas@mail.com','1212')
    .subscribe(rta => {
      console.log(rta.access_token);
      this.token = rta.access_token;
    });
  }

  getProfile(){
    this.authService.getProfile()
    .subscribe(profile => {
      console.log(profile);
    });
  }

  downLoadPdf(){
    this.fileService.getFile(
      'my-pdf',
      'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
      'application/pdf')
      .subscribe()
  }

  onUpLoad(event: Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file){
      this.fileService.upLoadFile(file)
      .subscribe(rta =>{
        this.imgRta = rta.location;
      });
    }
  }
}
