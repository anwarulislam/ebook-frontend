import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptor';

import {
    DataService
} from './services';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
        DataService
    ],
    declarations: []
})
export class CoreModule { }
