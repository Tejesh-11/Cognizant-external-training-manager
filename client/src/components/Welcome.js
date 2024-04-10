import React from 'react'
import { useSelector} from "react-redux";

function Welcome() {

  const currentUser = useSelector((state) => state.login.currentUser);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-8 col-sm-12 mt-4'>
          <h1 className='mb-3'>Hello, {currentUser.username}</h1>
          <p className='mt-4'>As the newest addition to our team, your leadership is a valuable asset. Dive into the dropdown, explore the batches, and get ready to guide us toward new heights. If you have any questions or need assistance, our support team is just a message away.<br></br>Here's to a successful journey together!</p>
        </div>
        <div className='col-md-4 col-sm-12'>
          <div className="card mb-3" style={{width:"280px"}}>
            <div className="card-header">MANAGER ID  <span className="ms-3 spinner-grow text-success spinner-grow-sm"></span></div>
            <img className="card-img-top img-thumbnail" src="https://i.pinimg.com/474x/83/60/f6/8360f6e8e6167d545b0c34de7490cc1e.jpg" alt="Card"/>
            <div className="card-body">
                <h4 className="card-title">{currentUser.username}</h4>
                <p className="card-text">ID:2308387<br/>Email: 2308387@cognizant.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
