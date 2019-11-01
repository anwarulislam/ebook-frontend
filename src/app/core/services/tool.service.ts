import * as jwt_decode from 'jwt-decode';

export class ToolService {

  public static getDecodedToken(token: any) {
    return jwt_decode(token);
  }
  
}
