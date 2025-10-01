// pages/Mypage.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import useAuthStore from "../store/authStore.js";
import useMypageStore from "../store/mypageStore.js";

function Mypage() {
  const navigate = useNavigate();

  // 1) 로그인 여부는 authStore에서
  const { isLogin } = useAuthStore();

  // 2) 상세정보는 mypageStore에서 (전역으로 보관)
  const { userInfo, setUserInfo, patchContact } = useMypageStore();

  // 3) 수정 폼(전화/이메일만) — 폼 입력은 로컬 상태로
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");

  // 4) UX 상태
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({ phone: "", email: "" });

  // 세션에서 로그인 아이디
  const userId = sessionStorage.getItem("loginId");

  // 전화/이메일 간단 유효성 검사기 ------------------------------
  const validatePhone = (v) => {
    // 010-1234-5678 또는 01012345678 형태 허용
    const onlyNum = v.replace(/[^0-9]/g, "");
    return /^01[016789][0-9]{7,8}$/.test(onlyNum); // 10~11자리
  };
  const validateEmail = (v) => {
    // 아주 간단한 이메일 패턴
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  };
  // -----------------------------------------------------------

  // 변경 여부(버튼 활성화 판단)
  const isDirty = useMemo(() => {
    if (!userInfo) return false;
    return editPhone !== (userInfo.phone ?? "") || editEmail !== (userInfo.email ?? "");
  }, [editPhone, editEmail, userInfo]);

  // 초기 로딩: 로그인 체크 + 유저정보 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      if (!isLogin || !userId) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      try {
        setLoading(true);

        // 서버에서 상세정보 가져오기
        const res = await axios.get(`http://10.5.5.12/auth/mypagelist/${userId}`);

        // 키 이름이 다를 수 있으니 노멀라이즈
        const raw = res?.data || {};
        const normalized = {
          id: raw.id ?? "",
          name: raw.name ?? "",
          phone: raw.phone ?? "",
          email: raw.email ?? "",
          zipcode: raw.zipcode ?? raw.zip_code ?? "",
          address1: raw.address1 ?? raw.addr1 ?? "",
          address2: raw.address2 ?? raw.addr2 ?? "",
        };

        // 스토어에 저장
        setUserInfo(normalized);

        // 수정폼 기본값도 세팅
        setEditPhone(normalized.phone || "");
        setEditEmail(normalized.email || "");
      } catch (e) {
        console.error(e);
        alert("마이페이지 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [isLogin, userId, navigate, setUserInfo]);

  // 저장 버튼 핸들러 (전화/이메일만 서버에 반영)
  const handleSave = async () => {
    // 1) 프론트 유효성 검사
    const nextErrors = { phone: "", email: "" };
    if (!validatePhone(editPhone)) nextErrors.phone = "전화번호 형식이 올바르지 않습니다.";
    if (!validateEmail(editEmail)) nextErrors.email = "이메일 형식이 올바르지 않습니다.";
    setErrors(nextErrors);
    if (nextErrors.phone || nextErrors.email) return;

    // 2) 서버 업데이트
    try {
      setSaving(true);

      // 서버가 요구하는 스키마에 맞춰 최소한의 변경 필드만 보냄
      const payload = { phone: editPhone, email: editEmail };

      /**
       * 백엔드 엔드포인트는 예시입니다.
       * - 이미 쓰는 게 있다면 그걸로 맞춰주세요.
       * - ex) PUT /auth/update/:id, PATCH /auth/mypage/:id 등
       */
      await axios.put(`http://10.5.5.12/auth/mypage/${userInfo.id}`, payload);

      // 3) 성공 → 스토어의 userInfo 즉시 반영(낙관적 업데이트)
      patchContact(payload);

      alert("수정되었습니다.");
    } catch (e) {
      console.error(e);
      alert("수정에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  // 되돌리기(취소): 스토어 원본값으로 폼을 되돌림
  const handleCancel = () => {
    if (!userInfo) return;
    setEditPhone(userInfo.phone || "");
    setEditEmail(userInfo.email || "");
    setErrors({ phone: "", email: "" });
  };

  if (loading || !userInfo) return <p style={{ padding: 20 }}>로딩 중...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>마이페이지</h2>

      <table
        border={1}
        cellPadding={10}
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
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

          {/* 전화번호: 입력 가능 */}
          <tr>
            <td>전화번호</td>
            <td>
              <input
                type="text" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} placeholder="010-1234-5678" style={{ width: "100%", boxSizing: "border-box" }}/>
              {errors.phone && (
                <div style={{ color: "red", marginTop: 6 }}>{errors.phone}</div>
              )}
            </td>
          </tr>

          {/* 이메일: 입력 가능 */}
          <tr>
            <td>이메일</td>
            <td>
              <input type="text" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} placeholder="example@domain.com" style={{ width: "100%", boxSizing: "border-box" }} />
              {errors.email && (
                <div style={{ color: "red", marginTop: 6 }}>{errors.email}</div>
              )}
            </td>
          </tr>

          {/* 아래부터는 읽기 전용 */}
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

          {/* 액션 버튼들 */}
          <tr>
            <td colSpan={2} style={{ textAlign: "right" }}>
              <button onClick={handleCancel} disabled={!isDirty || saving} style={{ marginRight: 8 }}>
                되돌리기
              </button>
              <button
                onClick={handleSave}
                disabled={!isDirty || saving}
                title={!isDirty ? "변경사항이 없습니다." : ""}
              >
                {saving ? "저장 중..." : "수정"}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* 참고 설명 */}
      <div style={{ marginTop: 12, color: "#666", fontSize: 14 }}>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li>전화번호/이메일만 수정 가능합니다. (다른 필드는 읽기 전용)</li>
          <li>변경사항이 있어야 “수정” 버튼이 활성화됩니다.</li>
          <li>저장 중에는 버튼이 비활성화됩니다.</li>
        </ul>
      </div>
    </div>
  );
}

export default Mypage;
