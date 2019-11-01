import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterRouteChange = true;

    constructor(private router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = true;
                } else {
                    // clear alert message
                    this.clear();
                }
            }
        });
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    success(message: string, keepAfterRouteChange = true, t = 3000) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: 'success', text: message });
        this.clearAwait(t)
    }

    error(message: string, keepAfterRouteChange = true, t = 3000) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: 'error', text: message });
        this.clearAwait(t)
    }

    clear() {
        // clear by calling subject.next() without parameters
        this.subject.next();
    }

    clearAwait(t) {
        setTimeout(() => {
            this.clear()
        }, t || 3000);
    }

    public markTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsTouched();

            if (control.controls) {
                this.markTouched(control);
            }
        });
    }
}