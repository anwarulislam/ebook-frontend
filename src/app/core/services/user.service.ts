import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class UserService {
    name: string = ""
    username: string = ""
    email: string = ""

    constructor(private http: HttpClient) {
    }

    public getUser() {
        return {
            name: this.name,
            username: this.username,
            email: this.email,
        };
    }

    public setUser(user: any) {
        this.name = user.name
        this.username = user.username
        this.email = user.email
    }
    public resetUser() {
        this.name = undefined
        this.username = undefined
        this.email = undefined
    }

    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        // window.alert(errorMessage);
        return throwError('errorMessage');
    }
}