import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import loginImg from '../../login.webp';

const Login = () => {
    const handleSubmit = event =>{
         event.preventDefault();
         const form = event.target;
         const email = form.email;
         const password = form.password;

    }
  return (
    <div>
        <Container className="d-flex mt-5">
        <div className="w-50 mx-auto mt-5 bg register">
      <form onSubmit={handleSubmit}>
      <h3 className="text-danger fst-italic">Please Login!</h3>
      <div className="mb-3 w-50 mt-4">
        <label for="formGroupExampleInput" className="form-label">Email Address </label>
        <input type="email" name="emil" className="form-control" id="formGroupExampleInput"
          placeholder="Enter your email" required/>
      </div>
      <div className="mb-3 w-50">
        <label for="formGroupExampleInput2" className="form-label">Password</label>
        <input type="password" name="password" className="form-control" id="formGroupExampleInput2" placeholder="Password" required
        />
      </div>
      <Button variant="danger" type="submit">Login</Button>
      </form>
      <p className="mt-3 link"><small>New to this website? Please <Link to='/register'>Register</Link></small></p>
    </div>
    <div className="w-50">
        <img className="img-fluid w-100" src={loginImg} alt="" />
    </div>
        </Container>
    </div>
  );
};

export default Login;
