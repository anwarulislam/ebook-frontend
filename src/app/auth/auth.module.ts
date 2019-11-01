import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../core/services/auth.service';
import { AuthGuard } from '../core/guard/auth.guard';
import { LoggedGuard } from '../core/guard/logged.guard';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule
    ],
    declarations: [
        LoginComponent
    ],
    bootstrap: [
        // LoginComponent
    ],
    providers: [
        AuthService,
        AuthGuard,
        LoggedGuard
    ]
})
export class AuthModule { }


///superb job done thank you :)