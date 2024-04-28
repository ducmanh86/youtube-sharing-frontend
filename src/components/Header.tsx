import viteLogo from '/vite.svg'
import {useState} from "react";
import * as authApis from "../apis/auth.api.ts";
import * as videoApis from "../apis/video.api.ts";
import {useStateContext} from "../context/ContextProvider.tsx";

const Header = () => {
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const {user, setUser, setToken} = useStateContext();


  const onLogout = (ev: any) => {
    ev.preventDefault()

    authApis.logout().then(() => {
      setUser();
      setToken();
    });
  }

  const onLogin = (ev: any) => {
    ev.preventDefault()

    authApis.login({email, password})
      .then((data: any) => {
        setToken(data.token);
        setUser(data.user);
      })
      .catch((err) => {
        if (err.status !== 422) {
          alert('Contact system administrator for problem!');
        } else if (err.errors.password) {
          alert('Login info is not correct!');
        } else {
          authApis.register({email, password, firstName: 'A', lastName: 'A'})
            .then(() => authApis.login({email, password}))
            .then((data: any) => {
              setToken(data.token);
              setUser(data.user);
            })
        }
      })
      .finally(() => {
        setEmail('');
        setPassword('');
      })
  }

  const onShare = (ev: any) => {
    ev.preventDefault()

    if (!videoUrl || !videoUrl.startsWith('https://www.youtube.com/watch?v=')) {
      return alert('Youtube video url is invalid!');
    }

    videoApis.share({videoUrl})
      .then(() => {
        alert('Video is shared!');
      })
      .catch((err) => {
        if (err.status === 422) {
          alert('Youtube video url is invalid!');
        } else {
          alert('Contact system administrator for problem!');
        }
      })
      .finally(() => {
        setVideoUrl('');
      })
  }

  const handleVideoUrlChange = (ev: any) => {
    setVideoUrl(ev.target.value);
  }

  const handleEmailChange = (ev: any) => {
    setEmail(ev.target.value);
  }

  const handlePasswordChange = (ev: any) => {
    setPassword(ev.target.value);
  }

  let profilePart: any;
  if (user) {
    profilePart = <div>
      Welcome {user.email} &nbsp; &nbsp;
      <button onClick={onLogout} className="btn-logout">Logout</button>
      <br/>
      <form>
        <label htmlFor="videoUrl">Youtube Video Url: </label>
        <input id="videoUrl" type="text" value={videoUrl} onChange={handleVideoUrlChange}/> &nbsp; &nbsp;
        <button type="submit" onClick={onShare} onSubmit={onShare} className="btn-share">Share A Video</button>
      </form>
    </div>
  } else {
    profilePart = <div>
      <form>
        <label htmlFor="email">Email: </label>
        <input id="email" type="text" value={email} onChange={handleEmailChange}/> &nbsp; &nbsp;
        <label htmlFor="password">Password: </label>
        <input id="password" type="password" value={password} onChange={handlePasswordChange}/> &nbsp; &nbsp;
        <button type="submit" onClick={onLogin} onSubmit={onLogin} className="btn-login">Login/Register</button>
      </form>
    </div>
  }

  return (
    <header>
      <div className="react">
        <a href="/">
          <img src={viteLogo} className="logo" alt="Logo"/>
          Billiard Videos Sharing
        </a>
      </div>

      {profilePart}
      <hr/>
    </header>
  )
};

export default Header;
