import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';


function App() {

    const [Login,setLogin] = useState({ id: "", pw: "" });

    const handleSignin = () =>{

    axios.post("http://10.5.5.12/auth/login", Login)
  .then(res => {
    
    console.log("로그인 성공:", res.data);
  })
  .catch(err => {
    console.error("로그인 실패:", err);
  });
     
    }

    const handleLogin = (e) => {
      const {name , value} = e.target
      setLogin(prev => ({...prev, [name]:value}))
    }

  return (
    <div className="container">
      갱갱갱
    </div>
  );
}

export default App;
