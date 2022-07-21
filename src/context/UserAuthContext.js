import { createContext } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth'
import { auth } from '../firebase'
import { useEffect, useState, useContext } from 'react'

const userAuthContext = createContext()

export function UserAuthContextProvider({ children }) {
  //state for manage login or not
  const [user, setUser] = useState('')
  const [number, setNumber] = useState("");
  // for signup
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  // for login
  function logIn(email, password) {
    console.log('Email', password)
    return signInWithEmailAndPassword(auth, email, password)
  }
  //for logout
  function logOut() {
    return signOut(auth)
  }
  // login with google
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleAuthProvider)
  }
  // forget password
  function forgetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }
  // for RecaptchaVerifier
  function setUpRecaptcha(number){
    const recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  // for context api
  return (
    <userAuthContext.Provider
      value={{ user, signUp, logIn, logOut, googleSignIn, forgetPassword, setUpRecaptcha}}
    >
      {children}
    </userAuthContext.Provider>
  )
}

export function useUserAuth() {
  return useContext(userAuthContext)
}
