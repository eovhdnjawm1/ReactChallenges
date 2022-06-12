import { atom } from 'recoil';


export const isDarkAtom = atom({
	// 이름인데 유일해야함
	key: "isDark",
	// default도 기본으로 필요함
	default: true,
})