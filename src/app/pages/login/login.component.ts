import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleSigninButtonModule, SocialLoginModule } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

}
