import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';

import { ToolService } from './tool.service';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { LoadingComponent } from '@app/shared/layout/loading.component';
import { environment } from '@env/environment.prod';

@Injectable()
export class AuthService {
    static token: string;
    static AUTH_TOKEN = 'token';
    static = 'token';
    expiredTimer: any;

    public sessionCreated = new BehaviorSubject('');
    public sessionDeleted = new BehaviorSubject('');
    redirectUrl: string;

    constructor(
        private router: Router,
        private userService: UserService,
        private http: HttpClient
    ) {
        let token = localStorage.getItem(AuthService.AUTH_TOKEN)
        if (token && token !== 'null') {
            this.createSession(token);
        }
    }

    public getToken() {
        let token = localStorage.getItem(AuthService.AUTH_TOKEN)
        return token
    }

    public login(user) {
        let temp_token = btoa(`${user.username}|${user.password}`)
        return this.http.post(`${environment.api_url}auth/login/`, { user: temp_token }, { observe: 'response' })
    }

    public createSession(token: any) {
        AuthService.token = token;
        // console.log('token: ', token);
        localStorage.setItem(AuthService.AUTH_TOKEN, token);
        const _currentTime = moment(new Date())
            .toDate()
            .valueOf();
        const decodedToken = ToolService.getDecodedToken(AuthService.token);
        this.userService.setUser(decodedToken);
        const _expiredTime = moment
            .unix(decodedToken.exp)
            .toDate()
            .valueOf();
        const _expiredInMillisecs = _expiredTime - _currentTime;
        if (this.expiredTimer) {
            clearTimeout(this.expiredTimer);
            this.expiredTimer = undefined;
        }
        try {
            this.expiredTimer = setTimeout(() => {
                try {
                    this.deleteSession();
                    this.userService.resetUser();
                } catch (err) {
                    console.log('deleteSession error on session timeout: ', err);
                }
                console.log('session expired ... auto logout!');
                this.router.navigateByUrl('/login');
            }, _expiredInMillisecs);
        } catch (err) {
            console.log('expiredTimer err: ', err);
        }
        this.sessionCreated.next(token);
    }

    public deleteSession() {
        AuthService.token = undefined;
        localStorage.removeItem(AuthService.AUTH_TOKEN);
        this.sessionDeleted.next(new Date().toString());
    }

    public logout() {
        LoadingComponent.display = true;
        this.http.post(`${environment.api_url}auth/logout`, {}).subscribe(
            res => {
                this.deleteSession();
                this.userService.resetUser();
                location.reload()
                this.router.navigate(['/login']);
                LoadingComponent.display = false;
            },
            () => {
                this.deleteSession();
                this.userService.resetUser();
                location.reload()
                this.router.navigate(['/login']);
                LoadingComponent.display = false;
            }
        );
    }

    public isTokenExpired() {
        if (!AuthService.token) {
            return true;
        }
        const decodedUser = ToolService.getDecodedToken(AuthService.token);
        const expirationTime = moment
            .unix(decodedUser.exp)
            .toDate()
            .valueOf();
        const currentTime = moment(new Date())
            .toDate()
            .valueOf();
        if (currentTime >= expirationTime) {
            return true;
        }
        return false;
    }

    public isAuthenticated() {
        return !this.isTokenExpired();
    }
}
