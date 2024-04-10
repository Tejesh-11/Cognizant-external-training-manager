import React from 'react';
import { useSelector } from 'react-redux';
import {Outlet,Navigate} from 'react-router-dom';


function Protected({children}){
    const {loginStatus}=useSelector((state=>state.login))
    return(
        loginStatus ? <Outlet/>:<Navigate to='/login'/>
    )
}

export default Protected;