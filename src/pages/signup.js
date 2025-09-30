
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';




function Signup() {

    const navigate = useNavigate();

    const [Assign, setAssign] = useState(
        { id: "", pw: "", name: "", phone: "", email: "", zipcode: "", address1: "", address2: "" });



    const handlechangeInput = (e) => {

        setAssign(prev => ({ ...prev, [e.target.name]: e.target.value }));

    }

    const handleInput = () => {

        axios.post("http://10.5.5.13/auth/assign", Assign).then(res => {
                console.log("회원가입 성공:", res.data);
                navigate("/"); // 회원가입 성공 시 로그인 페이지로 이동
            })
            .catch(err => {
                console.error("회원가입 실패:", err);
            });
    };


    return (
        <div className="container">

            <table border={1}>
                <thead>
                    <tr>
                        <th>회원가입</th>
                    </tr>
                </thead>
                <tbody>
               
                    <tr>
                        <td> <input type='text' placeholder='id 입력' value={Assign.id} name='id' onChange={handlechangeInput} /> </td> <br></br>
                        <td> <input type='text' placeholder='pw 입력' value={Assign.pw} name='pw' onChange={handlechangeInput} /> </td>
                        <td> <input type='text' placeholder='name 입력' value={Assign.name} name='name' onChange={handlechangeInput} /> </td>
                        <td> <input type='text' placeholder='phone 입력' value={Assign.phone} name='phone' onChange={handlechangeInput} /> </td>
                        <td> <input type='text' placeholder='email 입력' value={Assign.email} name='email' onChange={handlechangeInput} /> </td>
                        <td> <input type='text' placeholder='zipcode 입력' value={Assign.zipcode} name='zipcode' onChange={handlechangeInput} /> </td>
                        <td> <input type='text' placeholder='address1 입력' value={Assign.address1} name='address1' onChange={handlechangeInput} /> </td>
                        <td> <input type='text' placeholder='address2 입력' value={Assign.address2} name='address2' onChange={handlechangeInput} /> </td>


                        <td> <button onClick={handleInput}> 회원가입 </button></td>
                    </tr>
                    <Link to="/"><button>홈으로</button></Link>
                </tbody>

            </table>


        </div>
    );
}

export default Signup;

