import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@app/core/services/auth.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '@app/core/guard/auth.guard';
import { SharedModule } from '@app/shared/shared.module';
import { LoggedGuard } from '@app/core/guard/logged.guard';

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