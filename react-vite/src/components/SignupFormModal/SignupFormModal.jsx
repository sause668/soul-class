import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignupStudent, thunkSignupTeacher } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [type, setType] = useState("teacher");
  const [primaryGrade, setPrimaryGrade] = useState("");
  const [primarySubject, setPrimarySubject] = useState("");
  const [grade, setGrade] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = (type === 'teacher') ? 
      await dispatch(
        thunkSignupTeacher({
          email,
          username,
          password,
          firstName,
          lastName,
          type,
          primaryGrade,
          primarySubject
        })
      ):
      await dispatch(
        thunkSignupStudent({
          email,
          username,
          password,
          firstName,
          lastName,
          type,
          grade
        })
      );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className='formCon'>
      <h1 className='inputTitle'>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className='inputCon'>
          <label>
            <p className='labelTitle'>Email</p>
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
        {/* Username */}
        <div className='inputCon'>
          <label>
            <p className='labelTitle'>
              Username
            </p>
          </label>
          <input
            className='formInput'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errors.username && <p className='labelTitle error'>{errors.username}</p>}
        </div>
        {/* First Name */}
        <div className='inputCon'>
          <label>
            <p className='labelTitle'>
              First Name
            </p>
          </label>
          <input
            className='formInput'
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          {errors.firstName && <p className='labelTitle error'>{errors.firstName}</p>}
        </div>
        {/* Last Name */}
        <div className='inputCon'>
          <label>
            <p className='labelTitle'>Last Name</p>
          </label>
          <input
            className='formInput'
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          {errors.lastName && <p className='labelTitle error'>{errors.lastName}</p>}
        </div>
        {/* Type */}
        <div className='inputCon'>
          <label>
            <p className='labelTitle'>Type</p>
          </label>
          <select name="type" id="type" 
            value={type} 
            onChange={(e) => setType(e.target.value)}
          >
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
          {errors.type && <p className='labelTitle error'>{errors.type}</p>}
        </div>
        {type === 'teacher' && (<>
          {/* Primary Subject */}
          <div className='inputCon' hidden=''>
            <label>
              <p className='labelTitle'>Primary Subject</p>
            </label>
            <input
              className='formInput'
              type="text"
              value={primarySubject}
              onChange={(e) => setPrimarySubject(e.target.value)}
              required
            />
            {errors.primarySubject && <p className='labelTitle error'>{errors.primarySubject}</p>}
          </div>
          {/* Primary Grade */}
          <div className='inputCon'>
            <label>
              <p className='labelTitle'>Primary Grade</p>
            </label>
            <input
              className='formInput'
              type="text"
              value={primaryGrade}
              onChange={(e) => setPrimaryGrade(e.target.value)}
              required
            />
            {errors.primaryGrade && <p className='labelTitle error'>{errors.primaryGrade}</p>}
          </div>
        </>)}
        {type === 'student' && (<>
          {/* Grade */}
          <div className='inputCon'>
            <label>
              <p className='labelTitle'>Grade</p>
            </label>
            <input
              className='formInput'
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
            />
            {errors.grade && <p className='labelTitle error'>{errors.grade}</p>}
          </div>
        </>)}
        {/* Password */}
        <div className='inputCon'>
          <label>
            <p className='labelTitle'>Password</p>
          </label>
          <input
            className='formInput'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className='labelTitle error'>{errors.password}</p>}
        </div>
        {/* Confirm Password */}
        <div className='inputCon'>
          <label>
            <p className='labelTitle'>Confirm Password</p>
          </label>
          <input
            className='formInput'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && (
            <p className='labelTitle error'>{errors.confirmPassword}</p>
          )}
        </div>
        <button 
          className='submitButton'
          type="submit"
          // disabled={
          //   (!email.length ||
          //   !username.length ||
          //   !firstName.length ||
          //   !lastName.length ||
          //   !password.length ||
          //   !confirmPassword.length)
          // }
          >Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
