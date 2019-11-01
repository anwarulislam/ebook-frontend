import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '@env/environment';


@Injectable()
export class JwtService {

  getToken(): String {
    let token = window.localStorage['token'];
    // console.log(token)
    if (token) {
      return this.decryptData(token).privateKey;
    } else {
      return ''
    }
  }

  saveToken(token: String) {
    window.localStorage['token'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('token');
  }

  encryptData(data) {

    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), environment.esk).toString();
    } catch (e) {
      //console.log(e);
    }
  }

  decryptData(data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, environment.esk);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      //console.log(e);
    }
  }



}