import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../store/authStore.js";

function Mypage() {
  const navigate = useNavigate();
  const { isLogin } = useAuthStore();
  const [userInfo, setUserInfo] = useState(null);

  // 세션에서 로그인 아이디
  const userId = sessionStorage.getItem("loginId");

  useEffect(() => {
    if (!isLogin || !userId) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    axios
      .get(`http://10.5.5.12/auth/mypagelist/${userId}`)
      .then((res) => {
        console.log(res)
        // 백엔드 키가 살짝 달라도 맞춰주기 (예: zip_code/addr1/addr2)
        const raw = res.data || {};
        const normalized = {
          id: raw.id ?? "",
          name: raw.name ?? "",
          phone: raw.phone ?? "",
          email: raw.email ?? "",
          zipcode: raw.zipcode ?? raw.zip_code ?? "",
          address1: raw.address1 ?? raw.addr1 ?? "",
          address2: raw.address2 ?? raw.addr2 ?? "",
        };
        setUserInfo(normalized);
      })
      .catch((err) => {
        
      });
  }, [isLogin, userId, navigate]);

  if (!userInfo) return <p style={{ padding: 20 }}>로딩 중...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>마이페이지</h2>
      <table border={1} cellPadding={10} style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ width: "30%" }}>항목</th>
            <th>내용</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>아이디</td>
            <td>{userInfo.id}</td>
          </tr>
          <tr>
            <td>이름</td>
            <td>{userInfo.name}</td>
          </tr>
          <tr>
            <td>전화번호</td>
            <td>{userInfo.phone}</td>
          </tr>
          <tr>
            <td>이메일</td>
            <td>{userInfo.email}</td>
          </tr>
          <tr>
            <td>우편번호</td>
            <td>{userInfo.zipcode}</td>
          </tr>
          <tr>
            <td>주소1</td>
            <td>{userInfo.address1}</td>
          </tr>
          <tr>
            <td>주소2</td>
            <td>{userInfo.address2}</td>
          </tr>

            <tr>
                <td>
                    <button>수정</button>
                    
                </td>
            </tr>

        </tbody>
      </table>
    </div>
  );
}

export default Mypage;
