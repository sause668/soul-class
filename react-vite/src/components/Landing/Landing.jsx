import { useState } from "react";
import { useDispatch } from "react-redux";
import "./Landing.css";
import { thunkLogin } from "../../redux/session";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SignupFormModal from "../SignupFormModal";

function Landing() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      // closeModal();
    }
  };

  const demoTeacher = async () => {
    const serverResponse = await dispatch(
      thunkLogin({
        email: 'ssnape@soulacademy.com',
        password: 'password',
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      // closeModal();
    }
  }

  const demoStudent = async () => {
    const serverResponse = await dispatch(
      thunkLogin({
        email: 'hpotter@soulacademy.com',
        password: 'password',
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      // closeModal();
    }
  }

  return (
    <>
      <div id="landingCon">
        <div id="titleSide">
          <div id="titleCon">
            <h1 id="titleMain">Soul Academy</h1>
            <h2 id="titleSub">Learning with Soul</h2>
          </div>
        </div>
        <div id="loginSide">
          <div id="loginCon" className="whiteBox">
            <form id="loginForm" onSubmit={handleSubmit}>
              {/* Email */}
              <div className='inputCon'>
                <label htmlFor='email'>
                  <p className='labelTitle'>
                    Email
                  </p>
                </label>
                <input
                  className='formInput'
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors.email && <p className='labelTitle error'>{errors.email}</p>}
              </div>
              {/* Password */}
              <div className='inputCon'>
                <label htmlFor='password'>
                  <p className='labelTitle'>
                    Password
                  </p>
                </label>
                <input
                  className='formInput'
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {errors.password && <p className='labelTitle error'>{errors.password}</p>}
              </div>
              <div className='submitCon'>
                <button 
                  className='submitButton btnLanding'
                  type="submit" 
                  // disabled={(credential.length < 4 || password.length < 4)}
                >Log In</button>
                
              </div>
              
            </form>
            <OpenModalButton
              buttonText={'Sign Up'}
              modalComponent={<SignupFormModal/>}
              cssClasses={'signupButton btnLanding'}
            />
            {/* <div id="demoCon" className="lightBlueBox">
              <button 
                className="demoButton"
                onClick={demoTeacher}
              >Demo Teacher</button>
              <button 
                className="demoButton"
                onClick={demoStudent}
              >Demo Student</button>
            </div> */}
          </div>
          <div id="demoCon" className="whiteBox">
              <button 
                className="demoButton"
                onClick={demoTeacher}
              >Demo Teacher</button>
              <button 
                className="demoButton"
                onClick={demoStudent}
              >Demo Student</button>
            </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
