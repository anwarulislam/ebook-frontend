import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataService } from '@app/core/services';
import { LoadingComponent } from './layout/loading.component';
import { SeoService } from '@app/core/services/seo.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';

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