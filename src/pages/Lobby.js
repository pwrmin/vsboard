
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import useAuthStore from "../store/authStore.js";

function Lobby() {
    const navigate = useNavigate();

    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const deletelogin = useAuthStore((state) => state.deletelogin);

    const handleLogout = () => {
        logout();            // Zustand store 초기화
        navigate("/");       // 로그인 페이지로 이동
    };



    const handleDeleteLogin = () => {

        axios.delete(`http://10.5.5.12/auth/${user}`, { withCredentials: true }).then(res => {
            deletelogin();
            navigate("/");

        })

    }

    const handleMypage = () => {
        // Zustand store 초기화
        navigate("/mypage");       // 로그인 페이지로 이동
    };

    const handleBoard = () => {
        navigate("/board");
    };

    return (
        <table border={1}>
            <>
                <thead>
                    <tr>
                        <th>
                            로그인 성공
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><button onClick={handleBoard}>게시판</button></td>
                        <td><button onClick={handleMypage}>마이페이지</button></td>
                        <td><button onClick={handleLogout}>로그아웃</button></td>
                        <td><button onClick={handleDeleteLogin}>회원탈퇴</button></td>
                    </tr>
                </tbody>
            </>
        </table>

    )
}

export default Lobby;

