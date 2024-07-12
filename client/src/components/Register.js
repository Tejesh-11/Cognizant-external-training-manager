import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';

function Register() {
  const { register, handleSubmit,formState:{errors} } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);

  const options = ["Java", "Python", "SQL", ".Net", "Angular", "React"];
   
  function uploadPic(e) {
    setFile(e.target.files[0]);
  }

  axios.defaults.withCredentials=true;
  const onRegister = async (userObj) => {
    const formData = new FormData();
    formData.append("userObj", JSON.stringify(userObj));
    formData.append("pic", file);

    try {
      
      const res = await axios.post("https://externaltrainer-backend.vercel.app/user-api/user", formData);

      if (res.status === 201) {
        toast.success("Registered Successfully !");
        navigate("/login");
      } else if (res.status === 200) {
        setError(res.data.message);
      } else {
        setError("Registration Failed..");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {error.length !== 0 && <p className="fs-1 text-center text-danger">{error}</p>}
      <form className="w-50 mx-auto text-white mb-3 p-3 mt-4" onSubmit={handleSubmit(onRegister)}>
        <div>
          <h1 className="text-white text-center">Trainer Registration</h1>
          <div className="mb-4">
            <label htmlFor="username" className="form-label">
              Username
            </label>&emsp;&emsp; {errors.username && <b className="text-white ms-3">{errors.username.message}</b>}
            <input type="text" {...register("username",{required:"* Username is Required"})} className="form-control" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Create Password
            </label>&emsp;&emsp;  {errors.password && <b className="text-white ms-3">{errors.password.message}</b>}
            <input type="password" {...register("password",{required:"* Password is Required"})} className="form-control mb-4" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="form-label">
              Email
            </label>&emsp;&emsp; {errors.email && <b className="text-white ms-3">{errors.email.message}</b>}
            <input type="email" {...register("email",{required:"* Email is Required"})} className="form-control mb-4" />
          </div>
          <div className="mb-4">
            <label htmlFor="skills" className="form-label">
              Skills
            </label>&emsp;&emsp; {errors.skills && <b className="text-white ms-3">{errors.skills.message}</b>}
            <div>
              {options.map((option, index) => (
                <div key={index} className="form-check form-check-inline">
                  <input type="radio" {...register("skills",{required:"*Required"})} value={option} id={option} className="form-check-input" />
                  <label htmlFor={option} className="form-check-label">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
         
          <div className="mb-4">
            <label htmlFor="experience" className="form-label">
              Experience
            </label>
            <input type="text" {...register("experience")} className="form-control mb-4" placeholder="In years" />
          </div>
          <div className="mb-4">
            <label htmlFor="phno" className="form-label">
              Contact No
            </label>
            <input type="tel" {...register("phno")} className="form-control mb-4"/>
          </div>
          <div className="mb-4">
            <label htmlFor="profile-pic" className="form-label">
              Profile Image
            </label>
            <input id="profile-pic" type="file" name="pic" className="form-control mb-4" onChange={uploadPic} />
          </div>
        </div>
        <button type="submit" className="btn btn-success text-white d-block mx-auto">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
