import HttpService from './http';
import { NavigateFunction } from 'react-router-dom';

const SERVER_API_URL: string = 'http://localhost:3000';

class AuthService {
  public static async authenUser (navigate: NavigateFunction) {
    const authenData = await HttpService.authenUserToken(SERVER_API_URL + '/authen/user');
    if (!authenData || authenData.signIn === false) {
      localStorage.clear();
      navigate('/login');
    } else if (authenData.signIn) {
      navigate('/employee');
    }
  }
}

export default AuthService;
