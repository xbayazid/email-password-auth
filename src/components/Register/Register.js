import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import app from "../../firebase/firebase.init";

const auth = getAuth(app);

const Register = () => {
    const [passwordError, setPasswordError] = useState('');
    const handleRegister = event =>{
        event.preventDefault();
        const email= event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);
        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
          setPasswordError('Please provide at least two uppercase');
          return
        }
        if(password.length < 6){
          setPasswordError('Password should be at least 6 characters');
          return;
        }
        
        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
          const user = result.user;
          console.log(user);
        })
        .catch(error =>{
          console.log('error', error);
        })
    }

  return (
    <div className="w-50 mx-auto mt-5">
        <h3 className="text-danger mb-4 fst-italic">Please Register!</h3>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" required />
        </Form.Group>
        <Button variant="danger" type="submit">Register</Button>
      </Form>
    </div>
  );
};

export default Register;
