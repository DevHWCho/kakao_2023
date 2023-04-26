import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { authService } from '../fireB';
// import "styles/authForm.scss";

function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onChange = (e) => { 
    console.log('e.target.name->', e.target.name);
    console.log(e);
    const {target:{name, value}} = e; 
    if(name === 'email'){
      setEmail(value);
    }else if(name === 'password'){
      setPassword(value);
    }
  }
 
  const onSubmit = async(e) => {
    e.preventDefault(); 
    try {
      let data;
      if(newAccount){
        data = await createUserWithEmailAndPassword(authService, email, password); 
      }else {
        data = await signInWithEmailAndPassword(authService, email, password); 
      }
      console.log('data->',data);
    } catch (error) {
      console.log('error->',error);
      setError(error.message);
    }
  }
  const toggleAccount = () => setNewAccount(prev => !prev);

  return (
    <>
    <form onSubmit={onSubmit} className='aContainer'> 
      <input name='email' type='email' placeholder='이메일' required value={email} onChange={onChange} className='authInput emailInput'/>

      <input name='password' type='password' placeholder='비밀번호' required value={password} onChange={onChange}  className='authInput pwInput' />

      <input type='submit' value={newAccount ? "계정 만들기" : "로그인"} className='authInput authSubmit'/>{error && <span className='authError'>{error}</span>}
    </form>
    <div className='authSwitchBg'>
      <span onClick={toggleAccount} className='authSwitch'>
        {newAccount ? "로그인" : "계정 만들기"}
      </span>
    </div>
    </>
  )
}

export default AuthForm