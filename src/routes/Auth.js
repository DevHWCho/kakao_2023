import 'styles/Auth.scss';
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
// import { async } from '@firebase/util';
import { authService } from "../fireB";
import AuthForm from "../components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
library.add(fas, faTwitter, faGoogle, faGithub);

function Auth() {
  const onSocialClick = async (e) => {
    console.log('e.target.name->',e.target.name);
    const {target:{name}} = e;
    let provider;
    if(name === "google"){
      provider = new GoogleAuthProvider();
    }else if(name === "github"){
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    console.log('data->',data);
  }

  return (
    <div className='authContainer'>
      <header className='login_header'>
        <h1>
          MESSENGER
        </h1>
      </header>
      {/* <FontAwesomeIcon icon="fa-brands fa-twitter" size='3x' color={"#04aaff"} style={{marginBottom:30}} /> */}
      <AuthForm />
      <div className='authBtns'> 
        <button name='google' onClick={onSocialClick} className='authBtn googleBtn'>
          Google 계정으로 로그인&nbsp;&nbsp;&nbsp;&nbsp;
          <span className='googleLogo'>
            <FontAwesomeIcon icon="fa-brands fa-google" />
          </span>
        </button>
        <button name='github' onClick={onSocialClick} className='authBtn githubBtn'>
          Github 계정으로 로그인&nbsp;&nbsp;&nbsp;&nbsp;
          <span className='githubLogo'>
            <FontAwesomeIcon icon="fa-brands fa-github" />
          </span>
        </button>
      </div>
    </div>
  )
}

export default Auth