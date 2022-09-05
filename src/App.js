import './App.css';
import app from './firebase.init';
import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, OAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';


const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({})
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const fbProvider = new FacebookAuthProvider();
  const mircroProvider = new OAuthProvider('microsoft.com');

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.error('error', error)
      })
  };
  
  const handleGithubSignIn = () =>{
    signInWithPopup(auth,githubProvider)
    .then(result =>{
      const user = result.user;
      setUser(user)
      console.log(user);
    })
    .catch(error =>{
      console.error('error',error)
    })
  }

  const handleFbSignIn = () =>{
    signInWithPopup(auth,fbProvider)
    .then(result =>{
      const user = result.user;
      console.log(user)
      setUser(user)
    })
    .catch(error =>{
      console.error('error', error.message)
    })
  }

  const handleMcSignIn = () =>{
    signInWithPopup(auth,mircroProvider)
    .then(result => {
      const user = result.user;
      console.log(user)
    })
    .catch(error =>{
      console.error('error',error.message)
    })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
      .catch(error => {
        setUser({})
      })
  }
  return (
    <div className="App">
      {
        user.displayName? <button onClick={handleSignOut}>Sign out</button>
          : <>
            <button onClick={handleGoogleSignIn}>Google sign in</button>
            <button onClick={handleGithubSignIn}>Github sign in</button>
             <button onClick={handleFbSignIn}>Facebook sign in</button>
             <button onClick={handleMcSignIn}>Microsoft sign in</button>
          </>
      }
      <h2>Name: {user.displayName}</h2>
      <h4>Email: {user.email}</h4>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
