import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDhKsk5wquh5RsnSdhd7MXTDMsQJj9BTcQ",
    authDomain: "chat-app-a1e59.firebaseapp.com",
    projectId: "chat-app-a1e59",
    storageBucket: "chat-app-a1e59.appspot.com",
    messagingSenderId: "1095818564053",
    appId: "1:1095818564053:web:417c6c509d67e1d9b9ed5c",
    measurementId: "G-W86GEL5XRN"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);