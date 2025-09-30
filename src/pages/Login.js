
import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore.js";
import axios from 'axios';



function Login() {

    const navigate = useNavigate();

    const loginStore = useAuthStore((state) => state.login);

    const [Login, setLogin] = useState({ id: "", pw: "" });

    const handleSignin = () => {

        axios.post("http://10.5.5.12/auth/login", Login)
            .then(res => {

                loginStore(res.data.loginId);
                console.log("로그인 성공:", res.data.loginId);
               
                navigate("/lobby");
            })
            .catch(err => {
                console.error("로그인 실패:", err);
            });


    }

    const handleLogin = (e) => {
        const { name, value } = e.target
        setLogin(prev => ({ ...prev, [name]: value }))
    }




    return (


        <table border={1}>

            <thead>
                <tr>
                    <th>로그인</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        아이디<input type='text' placeholder=' ID 를 입력해주세요' name='id' onChange={handleLogin} value={Login.id} /> <br></br>
                        비밀번호<input type='password' placeholder='PW 를 입력해주세요' name='pw' onChange={handleLogin} value={Login.pw} />
                    </td>
                </tr>
                <tr>
                    <td><button onClick={handleSignin}>로그인</button>

                        <Link to="/signup"><button>회원가입</button></Link>
                        <button onClick={() => { axios.get("http://10.5.5.12/auth/test") }}>test</button>
                    </td>
                </tr>


            </tbody>

        </table>

    )

}

export default Login;