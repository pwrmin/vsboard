import { create } from 'zustand';
import { useState } from 'react';



const useAuthStore = create((set) => ({

    user: "",
    isLogin:false,
    login: (user) => set({user:user,isLogin:true}),
    logout: () => set({user:"",isLogin:false})
}))

export default useAuthStore;
