import React from 'react';
import { Link, hashHistory } from 'react-router'
import firebaseApp from './firebase/Firebase';

const signout = () => {
  firebaseApp.auth().signOut().then(() => {
    console.log("sign out succesful");
    hashHistory.push('/login');
  }, (error) => {
    console.log("an error happened");
  });
};

const Navbar = ({ loggedin }) =>
  <div className="Navbar">
    <Link to="/"><button className="btn btn-default">Home</button></Link>
    <Link to="/dashboard"><button className="btn btn-default dash-btn">Dashboard</button></Link>
    <Link to="/referrals"><button className="btn btn-default dash-btn">Referrals</button></Link>
    { loggedin && <button className="btn btn-default" onClick={signout}>Logout</button> }
    { !loggedin && <Link to="/login"><button className="btn btn-default">login</button></Link> }
    { !loggedin && <Link to="/signup"><button className="btn btn-default">Sign up</button></Link>}
  </div>

export default Navbar;
