/*import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public loginS: LoginService) { }
  ngOnInit(): void {
  }
  public logout() {
    this.loginS.signOut();
  }
}*/


import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public loginS: LoginService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  public logout() {
    this.loginS.signOut();
    this.cdr.detectChanges(); // Forzar la actualización de la vista
  }
}
