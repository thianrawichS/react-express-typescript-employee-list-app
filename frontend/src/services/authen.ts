import HttpService from './http';
import { NavigateFunction } from 'react-router-dom';
import { SERVER_API_URL } from '../configs/serverApiUrl';

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
