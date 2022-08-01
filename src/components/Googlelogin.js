import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../utils/refreshToken'

const clientId = "342463351002-hndh110aofjbjc8u24f18irijsfrsdef.apps.googleusercontent.com";

const Googlelogin = () => {
    const onSuccess = (res) => {
        console.log('[Login Success] currentUser: ', res.profileObj);

        refreshTokenSetup(res);
    };

    const onFailure = (res) => {
        console.log('[Login Failed] res: ', res);
    }

  return (
    <div>
        <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            style={{ marginTop: '10px' }}            
            isSignedIn={true}
        />
    </div>
  )
}

export default Googlelogin