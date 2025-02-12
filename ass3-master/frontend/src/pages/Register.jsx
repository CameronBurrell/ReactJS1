import PropTypes from 'prop-types';
import React from 'react';
import BigButton from '../components/BigButton';
import ErrorModal from '../components/ErrorModal';

const Register = (props) => {
  const [registerEmail, setEmail] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [confirmPwd, setConfirmPwd] = React.useState('');
  const [registerName, setName] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  const registerBtn = async () => {
    if (pwd !== confirmPwd) {
      setOpen(true)
      setErrorMsg('Passwords do not match!')
    } else {
      setOpen(false)
      const response = await fetch('http://localhost:5005/user/auth/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: registerEmail,
          password: pwd,
          name: registerName,
        })
      });
      const data = await response.json();
      if (data.error) {
        setOpen(true)
        setErrorMsg(data.error)
      } else {
        props.setTokenFn(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('ownerEmail', registerEmail);
      }
    }
  };

  return (
    <>
      <ErrorModal state={open} set={setOpen} msg={errorMsg}> </ErrorModal>
      Email: <input type="text" id="regEmailTesting" onChange={(event) => setEmail(event.target.value)} value={registerEmail} /><br />
      Password: <input type="text" id="regPasswordTesting" onChange={(event) => setPwd(event.target.value)} value={pwd} /><br />
      Confirm Password: <input type="text" id="regConfirmPasswordTesting"onChange={(event) => setConfirmPwd(event.target.value)} value={confirmPwd} /><br />
      Name: <input type="text" id="regNameTesting" onChange={(event) => setName(event.target.value)} value={registerName} /><br />
      <BigButton id="regButtonSubmit" onClick={registerBtn}>Register</BigButton>
    </>
  );
}

export default Register;

Register.propTypes = {
  setTokenFn: PropTypes.func,
};
