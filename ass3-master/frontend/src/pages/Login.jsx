import React from 'react';
import PropTypes from 'prop-types';
import BigButton from '../components/BigButton';

const Login = (props) => {
  const [loginEmail, setEmail] = React.useState('');
  const [pwd, setPwd] = React.useState('');

  const loginBtn = async () => {
    const response = await fetch('http://localhost:5005/user/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: loginEmail,
        password: pwd,
      })
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      props.setTokenFn(data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('ownerEmail', loginEmail);
    }
  };

  return (
    <>
      Email: <input id="emailLoginTest" type="text" onChange={(event) => setEmail(event.target.value)} value={loginEmail} /><br />
      Password: <input id="passwordLoginTest" type="text" onChange={(event) => setPwd(event.target.value)} value={pwd} /><br />
      <BigButton id="loginButtonTest" onClick={loginBtn}>Login</BigButton>
    </>
  );
}

export default Login;

Login.propTypes = {
  setTokenFn: PropTypes.func,
};
