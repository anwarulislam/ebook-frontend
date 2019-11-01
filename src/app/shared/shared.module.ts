import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingComponent } from './layout/loading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { DataService } from '../core/services';
import { SeoService } from '../core/services/seo.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoadingComponent,
        AlertComponent
    ],
    exports: [
        LoadingComponent,
        FormsModule,
        ReactiveFormsModule,
        AlertComponent
    ],
    providers: [
        DataService,
        SeoService
    ]
})
export class SharedModule { }