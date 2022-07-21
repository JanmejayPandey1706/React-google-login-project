import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";


const Login = () => {
    // set email
    const [email, setEmail] = useState("");
    // set password 
    const [password, setPassword] = useState("");
    // error throw
    const [error, setError] = useState("");
    // password shown state
    const [passwordShown, setPasswordShown] = useState(false)
    // context data
    const { logIn, googleSignIn, forgetPassword } = useUserAuth();
    const navigate = useNavigate();
    
    // handle the login form
    const handleSubmit = async(e) =>{
        e.preventDefault();
        setError("");
        try{
            await logIn(email, password);
            navigate("/home");
        }catch(err){
            setError(err.message)
        }
    }
    // handle the google sign
    const handleGoogleSignIn = async(e) =>{
      e.preventDefault();
      try{
        await googleSignIn();
        navigate("/home")
      }catch(err){
        setError(err.message)
      }
    }
    
    // handle Eye button
    const handleEye = (e) =>{
      setPasswordShown(!passwordShown)
      // console.log(passwordShown)
    }
    

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Firebase Auth Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form  onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type={passwordShown === false ?  "password" : "text"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span style={{cursor:"pointer"}} onClick={handleEye}>
            { passwordShown === false ? "iii" : "nnn" }
            
            </span>
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Log In
            </Button>
          </div>
        </Form>
        <hr />
        <div>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
        <Link to="/phonesignup">
        <div className="d-grid gap-2 mt-3">
            <Button variant="success" type="Submit">
              Sign in with phone Number
            </Button>
          </div>
          </Link>
      </div>
      <div className="p-4 box mt-3 text-center">
        Don't have an account? <Link to="/signup">Sign up</Link>
        
      </div>
    </>
  );
};

export default Login;