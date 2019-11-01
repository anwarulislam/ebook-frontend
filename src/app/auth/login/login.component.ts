import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoadingComponent } from "./../../shared/layout/loading.component";
import { AuthService } from "./../../core/services/auth.service";
import { AlertService } from "./../../core/services/alert.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  submitForm() {
    if (this.userForm.valid) {
      this.login();
    }
  }

  login() {
    LoadingComponent.display = true;
    this.auth.login(this.userForm.value).subscribe(
      (data: any) => {
        if (data.status == 201) {
          this.auth.createSession(data.body.accessToken);
          location.reload();
          LoadingComponent.display = false;
        }
      },
      () => {
        LoadingComponent.display = false;
        this.alert.error("Wrong credentials");
      }
    );
  }
}
