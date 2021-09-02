import React, { useState } from 'react';

const useInput = init => {
  const [value, setValue] = useState(init);
  const onChange = e => {

    setValue(e.target.value);
  };
  // return the value with the onChange function instead of setValue function
  return [value, onChange];
};


const Login = props => {
  const [signUp, setSignUp] = useState(false)
  const [username, setUsername] = useInput('')
  const [password, setPassword] = useInput('')

  function signMeUp() {
    if (signUp === false) {
      return <p> Don't have an account?<button id='loginStuff' className="primary" type="submit" onClick={(e) => setSignUp(true)}>SignUp</button></p>
    }
  }

  const loggingIn = (e) => {
    e.preventDefault()
    if (signUp === true) {
      props.signUp(username, password)
    } else {
      props.login(username, password)
    }
  }

  const oauthloggingin = (e) => {
    e.preventDefault();
    console.log("in oauthloggingin");
    props.oauth();
  }


  return (
    <div className="login">
      <form >
        Username:
        <input
          id="Username"
          value={username}
          onChange={setUsername}
          required />
        Password:
        <input
          id="Password"
          value={password}
          onChange={setPassword}
          type="password"
          required />
        <button id='loginStuff' className="primary" type="submit" onClick={loggingIn}>{signUp === true ? "Sign Up" : "Login"}</button>
      </form>

      <form action="">
        <a href='https://github.com/login/oauth/authorize?client_id=cc2dbad7a4bd537315f1&redirect_uri=http://localhost:8080/user/oauth'>Sign in with Github</a>
        {/* <button onClick={oauthloggingin}>Sign in with Github</button> */}
      </form>

      {signMeUp()}

    </div>
  )
};

export default Login;