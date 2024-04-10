import { useEffect,useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLoginLifeCycle } from "../redux/slices/userLoginSlice";


function Login() {
  let { register, handleSubmit,formState:{errors} } = useForm();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [loginType,setLoginType]=useState("trainer");
  const {currentUser,loginStatus,errorMessage,isPending,} = useSelector(state=>state.login)
  
  const handleLoginTypeChange = (e) => {
    setLoginType(e.target.value);
  };
  
  const onUserLogin = (userCred) => {
    if(loginType==="trainer")
    {
      dispatch(userLoginLifeCycle({...userCred,userType:loginType}));
    }
    else if(loginType==="coach")
    {
      dispatch(userLoginLifeCycle({...userCred,userType:loginType}));
    }
   
  };
  
  
  //navigate to user-profile when userLogin status is changed to true
  useEffect(()=>{
    if(loginStatus===true){
      
      if(loginType==="trainer"){
        navigate('/trainer-login');
      }
      else if(loginType==="coach"){
        navigate('/coach-login');
      }
    }
  },[loginStatus])



  return (
    <div>
      {errorMessage.length!=0&&<p className="text-danger text-center fs-3">{errorMessage}</p>}
      <form
        className="w-50 mx-auto text-white mb-3 p-3 mt-4"
        onSubmit={handleSubmit(onUserLogin)}>
        
        <div className="d-flex">
        
            <input type="radio" name="loginType" value="trainer"
              checked={loginType === "trainer"}
              onChange={handleLoginTypeChange}/>
              <label>Trainer</label>&ensp;
        &ensp;&ensp;&ensp;

      
            <input
              type="radio" name="loginType" value="coach"
              checked={loginType === "coach"}
              onChange={handleLoginTypeChange}/>
              <label>Coach</label>&ensp;
        </div>
        
    
        <div>
        {loginType==="trainer" ? (
          <h1 className="text-white text-center">Trainer Login</h1>
        ):(
          <h1 className="text-white text-center">HR Coach Login</h1>
        )}
          
       
          <div className="mb-4">
          <label htmlFor="username" className="form-label text-white">Username</label>
          <div className="input-group mb-3">
          <span className="input-group-text"><i className="bi bi-person-badge-fill"></i></span>
          <input id="username" name="username" type="text"{...register("username",{required:"* Username is Required"})} className="form-control" autoComplete="off"/><br></br>
          {errors.username && <b className="text-danger ms-3">{errors.username.message}</b>}
          </div>
        </div>


   
        {/* password */}
        <div className="mb-4">
          <label htmlFor="password" className="form-label text-white">Password</label>
          <div className="input-group mb-3">
            <span className="input-group-text"><i className="bi bi-key-fill"></i></span>
          <input id="password" name="password" type="password" {...register("password",{required:"* Password is Required"})} className="form-control" autoComplete="off"/><br></br>
          {errors.password && <b className="text-danger ms-3">{errors.password.message}</b>}
          </div>
        </div>

        </div>

        <button className="btn btn-success text-white d-block mx-auto">Login</button>
      </form>
    
    </div>
  );
}

export default Login;
