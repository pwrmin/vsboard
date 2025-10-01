import { useState } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import useAuthStore from "../../store/authStore.js";
import styles from "./BoardWrite.module.css";

function BoardWrite() {

    const navigate = useNavigate();



    //뒤로가기
    const handlebackboard = () => {
        navigate("/board");
    }
    return (
        <div className={styles.container}>

            <div className={styles.titlebox}> <input type="text" placeholder="제목을 입력하세요" style={{ width: "100%", height: "100%" }} /> </div>
            
            <div className={styles.contentbox}> <input type="text" placeholder="내용을 입력하세요" style={{ width: "100%", height: "100%" }} /> </div>
            
            <div className={styles.filebox}>
            <button> 파일업로드 </button>
            </div>

            <div className={styles.footerbox}>
            <button> 작성 완료 </button>
            <button onClick={handlebackboard}> 뒤로 가기 </button>
            </div>
        </div>
    )
}

export default BoardWrite;