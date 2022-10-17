import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import app from "../../firebase/firebase.init";
import './Register.css';
import registerImg from '../../register.webp';

const auth = getAuth(app);

const Register = () => {
    const [passwordError, setPasswordError] = useState('');
    const [success, setSuccess] = useState(false);
    const handleRegister = event =>{
        event.preventDefault();
        setSuccess(false);
        const form = event.target;
        const email= form.email.value;
        const password = form.password.value;
        console.log(email, password);
        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
          setPasswordError('Please provide at least two uppercase');
          return
        }
        if(password.length < 6){
          setPasswordError('Password should be at least 6 characters');
          return;
        }
        setPasswordError('');

        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
          const user = result.user;
          console.log(user);
          setSuccess(true);
          form.reset();
        })
        .catch(error =>{
          console.log('error', error);
          setPasswordError(error.message);
        })
    }

  return (
    <div>
      <Container className="d-flex mt-5">
      <div className="w-50 mx-auto mt-5 bg register">
        <h3 className="text-danger mb-4 fst-italic">Please Register!</h3>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter your email" required />
        </Form.Group>

        <Form.Group className="mb-3 w-50" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" required />
        </Form.Group>
        <p className="text-danger">{passwordError}</p>
        {success && <p className="text-success">User created Successfully</p>}
        <Button variant="danger" type="submit">Register</Button>
      </Form>
      <p className="mt-3 link"><small>Already have an account? Please <Link to='/login'>Login</Link></small></p>
    </div>
    <div className="w-50">
      <img className="img-fluid" src={registerImg} alt="" />
    </div>
      </Container>
    </div>
  );
};

export default Register;
