
import './App.css';
import Signup from "./pages/signup.js";
import Login from "./pages/Login.js";
import Lobby from "./pages/Lobby.js";
import Mypage from "./pages/Mypage.js";
import Board from "./pages/Board/Board.js";
import BoardWrite from "./pages/Board/BoardWrite.js";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import useAuthStore from "./store/authStore.js";
import { useEffect } from "react";





function App() {

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const userId = sessionStorage.getItem("loginId");

  useEffect(() => {
    if (userId) {
      login(userId); // 앱 시작 시 로그인 상태 복원
      
    }
  }, [login, userId]);

  axios.defaults.withCredentials = true;  // 0930 request를 보낼때 세션 키가 있는 경우, 담아서 리퀘스트 

  const loginStore = useAuthStore((state) => state.isLogin);


  return (


    <div className="container">
      {!loginStore ? (
        <>
          <Routes>
            <Route path="/*" element={<Login />} />
            <Route path="/signup/*" element={<Signup />} />
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/board" element={<Board/>} />
            <Route path="/boardwrite" element={<BoardWrite/>} />
          </Routes>
        </>

      )}

    </div >

  );
}

export default App;
