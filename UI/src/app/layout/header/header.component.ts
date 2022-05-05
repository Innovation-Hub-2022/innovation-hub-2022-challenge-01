import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/web-api/services/cognito.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public userName = '';
  public tokenDetails: any;
  public token: any;

  constructor(public cognitoService: CognitoService, private router: Router) {
    this.getUser();
  }

  public ngOnInit(): void {
    console.log('Token: ', localStorage.getItem('token'));

    this.token = localStorage.getItem('token');

    if (this.token) {
      const base64Url = this.token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      this.tokenDetails = JSON.parse(atob(base64));

      console.log(this.tokenDetails);
    }
  }

  public logout() {
    window.location.assign(environment.logout);
  }

  public getUser() {
    this.cognitoService
      .getUser()
      .then(
        (x) =>
          (this.userName =
            x?.attributes.family_name + ' ' + x?.attributes.given_name)
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
