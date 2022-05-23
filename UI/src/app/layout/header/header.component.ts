import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/web-api/services/cognito.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public userName = '';
  public tokenDetails: any;
  public token: any;

  constructor(public cognitoService: CognitoService, private router: Router) {
    this.getUser();
  }

  public logout() {
    window.location.assign(environment.logout);
  }

  public getUser() {
    this.cognitoService
      .getUser()
      .then(
        (x) =>{
          (this.userName =
            x.attributes.email)}
      )
      .catch((error) => {
        console.log('getUser ' + error);
      });
  }

  public isShow = true;

  public onClose() {
    this.isShow = false;
  }
}
