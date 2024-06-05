import create from 'zustand';

const useUserStore = create((set) => ({
	userEmail: "",
	userPassword: "",
	userName: "",
	setUserEmail: (userEmail) => set(() => ({userEmail})),
	setUserPassword: (userPassword) => set(() => ({userPassword})),
	setUserName: (userName) => set(() => ({userName})),
}))
;

export default useUserStore;
