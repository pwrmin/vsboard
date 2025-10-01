
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore.js";
import axios from 'axios';

function Mypage() {

    
 const userId = sessionStorage.getItem("loginId");


    return (

        <table border={1}>

            <thead>
                <tr>
                    <th>
                        {userId}님 어서오세요
                        
                    </th>
                </tr>
            </thead>

            <tbody>


            </tbody>
        </table>

    )


}

export default Mypage;