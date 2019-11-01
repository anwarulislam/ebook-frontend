import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isCollapsed: boolean = false

  isLogged: boolean;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.isLogged = this.auth.isAuthenticated()
    console.log(this.auth.isAuthenticated())
  }

}
