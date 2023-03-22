//host is backend address
// export const port = 5001;
// export const host = `http://localhost:${port}`;
export const host = `https://main--heartfelt-bonbon-4152b5.netlify.app/`;
export const loginRoute = `${host}/api/auth/login`;
export const registerRoute = `${host}/api/auth/register`;
export const setAvatarRoute = `${host}/api/auth/setavatar`;
export const allUsersRoute = `${host}/api/auth/allusers`;
export const sendMessageRoute = `${host}/api/messages/addmsg`; 
export const getAllMessagesRoute = `${host}/api/messages/getmsg`;   
export const firebaseLoginRoute = `${host}/api/auth/firebaselogin`;
export const checkUsernameRoute = `${host}/api/auth/checkusername`;