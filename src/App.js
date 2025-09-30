
import './App.css';
import Signup from "./pages/signup.js";
import Login from "./pages/Login.js";
import { Routes, Route, Link } from "react-router-dom";
import axios from 'axios';


axios.defaults.withCredentials = true; // 0930 request를 보낼때 세션 키가 있는 경우, 담아서 리퀘스트 



function App() {

  return (
    <>
      <div className="container">

        <Routes>
          <Route path="/*" element={<Login />} />
          <Route path="/signup/*" element={<Signup />} />
        </Routes>

      </div>
    </>

  );
}

export default App;
