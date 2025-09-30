import { create } from 'zustand';
import { useState } from 'react';



const useAuthStore = create((set) => ({

    user: "",
    isLogin: false,
    
    login: (user) => {

        sessionStorage.setItem("loginId", user);
        set({ user: user, isLogin: true })
    },
    logout: () => {
        sessionStorage.removeItem("loginId");
        set({ user: "", isLogin: false })
    },
    deletelogin: () => {
        sessionStorage.removeItem("loginId");
        set({ user: "", isLogin: false })},
}));


const useMypage = create((set) => ({
  mypage: {
    id: "",
    name: "",
    phone: "",
    email: "",
    zipcode: "",
    address1: "",
    address2: ""
  },

  // 정보 불러오기
  setMypage: (data) => set({ mypage: data }),

  // 특정 필드 수정 (예: phone/email만)
  updateMypage: (updated) =>
    set((state) => ({
      mypage: { ...state.mypage, ...updated }
    })),

  // 초기화
  clearMypage: () =>
    set({
      mypage: {
        id: "",
        name: "",
        phone: "",
        email: "",
        zipcode: "",
        address1: "",
        address2: ""
      }
    })
}));

export default useAuthStore;




 