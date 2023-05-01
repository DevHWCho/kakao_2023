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
    if(e.target.value !==""){
      e.target.classList.remove('on');
      e.target.parentElement.classList.remove('error');
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

  function onFocus(e) {
    e.target.classList.add('on');
  }

  function onBlur(e) {
    if(e.target.value === ""){
      e.target.classList.remove('on');
      e.target.parentElement.classList.add('error');
    }
  }

  return (
    <>
    <form onSubmit={onSubmit} className='aContainer'> 
      <div className='email_container'>
        <input name='email' type='email' placeholder='이메일' required value={email} 
        onChange={onChange} 
        onFocus={onFocus}
        onBlur={onBlur}
        className='authInput emailInput'/>
        <div className='email_error'>정확한 이메일 주소를 입력하세요.</div>
      </div>
  
      <div className='pw_container'>
        <input name='password' type='password' placeholder='비밀번호' required value={password} 
        onChange={onChange}  
        onFocus={onFocus}
        onBlur={onBlur}
        className='authInput pwInput' />
        <div className='pw_error'>비밀번호는 4~60자 사이여야 합니다.</div>
      </div>
      

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