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



export default useAuthStore;




 