import React from "react";

function Home() {
  return (
    <div className="row text-center  mt-2">
      <div className="col-md-6 mt-4 ">
        <img id="home"
          src="https://img.freepik.com/premium-vector/informative-banner-meeting-discussion-cartoon_81522-4285.jpg?size=626&ext=jpg&ga=GA1.1.1329127673.1704303799&semt=ais"
          alt=""
          style={{maxWidth:'100%',height:'auto'}}
        />
      </div>
      <div className="col-md-6" style={{fontFamily:'Apple Chancery, cursive'}}>
        <p className="container  mt-3 fs-5 ">
          <b className="mb-2 text-success">
            Welcome to Cognizant External Training Manager
          </b>
          <br />
          Empowering Excellence in Training Delivery
          Your Gateway to Seamless Training Management
          <br />
          <br />
          As the dedicated hub for Cognizant's external trainers, this platform is designed to
          streamline and elevate your trainers allocation management experience.
          <br />
          <br />
      
          <br />
          <br />
          Here's to a successful journey together!
        </p>
      </div>
    </div>
  );
}

export default Home;