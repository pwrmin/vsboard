import { useState } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import useAuthStore from "../../store/authStore.js";
import styles from "./Board.module.css";

function Board() {

    const navigate = useNavigate();

    // 글작성
    const handleWrite = () => {

        navigate("/boardwrite");
    };

    //로비 돌아가기
    const handlebackLobby = () => {

        navigate("/lobby");
    };

    return (



        <div className={styles.container}>

            <div className={styles.boardtopbox}>
                게시판

            </div>

            <div className={styles.boardmainbox}>

                글 목록
            </div>


            <div className={styles.boardunderbox}>
                <button onClick={handleWrite}> 글 작성하기 </button>
                <button onClick={handlebackLobby}> 로비로 가기 </button>
            </div>
        </div>
    )
}

export default Board;