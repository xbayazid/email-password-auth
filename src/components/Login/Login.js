import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import app from "../../firebase/firebase.init";
import loginImg from '../../login.webp';

const auth = getAuth(app);

const Login = () => {
    const [success, setSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        setSuccess(false);

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(true);
            })
            .catch(error => {
                console.error('error', error)
            })

    }

    const handleEmailBlur = event => {
        const email = event.target.value;
        setUserEmail(email);
        console.log(email);
    }

    const handleForgetPassword = () => {
        if (!userEmail) {
            alert('Please enter your email address.')
            return;
        }
        sendPasswordResetEmail(auth, userEmail)
            .then(() => {
                alert('Password Reset email sent. Please check your email.')
            })
            .catch(error => {
                console.error(error);
            })
    }
  return (
    <div>
        <Container className="d-flex mt-5">
        <div className="w-50 mx-auto mt-5 bg register">
      <form onSubmit={handleSubmit}>
      <h3 className="text-danger fst-italic">Please Login!</h3>
      <div className="mb-3 w-50 mt-4">
        <label htmlFor="formGroupExampleInput" className="form-label">Email Address </label>
        <input onBlur={handleEmailBlur} type="email" name="emil" className="form-control" id="formGroupExampleInput"
          placeholder="Enter your email" required/>
      </div>
      <div className="mb-3 w-50">
        <label htmlFor="formGroupExampleInput2" className="form-label">Password</label>
        <input type="password" name="password" className="form-control" id="formGroupExampleInput2" placeholder="Password" required
        />
      </div>
      <Button variant="danger" type="submit">Login</Button>
      </form>
      {success && <p>Successfully login to the account</p>}
      <p className="mt-3 link"><small>New to this website? Please <Link to='/register'>Register</Link></small></p>
      <p className="link"><small>Forget Password? <button type="button" onClick={handleForgetPassword} className="btn btn-link">Reset Password</button></small></p>
    </div>
    <div className="w-50">
        <img className="img-fluid w-100" src={loginImg} alt="" />
    </div>
        </Container>
    </div>
  );
};

export default Login;
