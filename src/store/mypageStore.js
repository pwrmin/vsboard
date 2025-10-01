// store/mypageStore.js
import { create } from "zustand";

/**
 * 마이페이지 전용 zustand 스토어
 * - userInfo: 서버에서 가져온 사용자 상세정보(읽기 전용 원본처럼 사용)
 * - setUserInfo(data): 서버 호출 결과를 통째로 저장
 * - patchContact({ phone, email }): 전화번호/이메일만 부분 업데이트
 * - clear(): 로그아웃 등에서 userInfo를 초기화
 */
const useMypageStore = create((set, get) => ({
  userInfo: null,

  // 서버에서 받은 유저정보를 통째로 반영
  setUserInfo: (data) => set({ userInfo: data }),

  // 전화번호/이메일만 수정 (다른 필드는 변경 금지)
  patchContact: ({ phone, email }) =>
    set((state) => {
      if (!state.userInfo) return state;
      return {
        userInfo: {
          ...state.userInfo,
          ...(phone !== undefined ? { phone } : {}),
          ...(email !== undefined ? { email } : {}),
        },
      };
    }),

  // 스토어 초기화
  clear: () => set({ userInfo: null }),
}));

export default useMypageStore;
