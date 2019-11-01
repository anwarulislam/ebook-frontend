import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean;

  constructor(private auth: AuthService, public user: UserService) { }

  ngOnInit() {
    this.isLogged = this.auth.isAuthenticated()
  }

  logout() {
    this.auth.logout()
  }
}
