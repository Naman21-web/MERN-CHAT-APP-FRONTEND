import axios from 'axios';
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { BsFacebook, BsGithub, BsGoogle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { firebaseLoginRoute } from '../utils/APIRoutes';
import { firebaseAuth } from '../utils/FirebaseConfig';

export default function SocialLoginButtons(){
    const navigate = useNavigate();
    const providers = {
        google: new GoogleAuthProvider(),
        facebook: new FacebookAuthProvider(),
        github: new GithubAuthProvider(),
    }
    //We will pass the loginType while calling the func
    const firebaseLogin = async (loginType) => {
        try{
            //and we will use that logintype to get provider of that loginType from providers
            const provider = providers[loginType];
            const userData = await signInWithPopup(firebaseAuth,provider);//firebase func
            //As for login with google our email is in userData.user.email while for github and facebook
            //email is in userData.user.providerData[0].email and userData.user.email is null for them
            const email = userData.user.email ? userData.user.email : userData.user.providerData[0].email;
            console.log(email);
            //to check if user already present in database
            const {data} = await axios.post(firebaseLoginRoute,{email})
            console.log(data.status);
            if(data.status){
                localStorage.setItem('snappy-user',JSON.stringify(data.user))
                navigate("/");
                //{replace:true});
            }
            else{
                navigate("/setusername");
                //{replace:true});
            }
        }
        catch(err){
            console.log(err);
        }
    }
    return ( 
    <SocialLoginContainer>
        <button type="button" onClick={()=>firebaseLogin("google")}>
            <BsGoogle />
        </button>
        <button type="button" onClick={()=>firebaseLogin("facebook")}>
            <BsFacebook />
        </button>
        <button type="button" onClick={()=>firebaseLogin("github")}>
            <BsGithub />
        </button>
    </SocialLoginContainer>
    )
}

const SocialLoginContainer = styled.div`
    display:flex;
    width:100%;
    justify-content:center;
    gap:1rem;
    background-color:transparent;
    button{
        background-color: transparent;
        border:0.1rem solid #4e0eff;
        color: white;
        padding: 0.8rem;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1.5rem;
        text-transform: uppercase;
        display:flex;
        justify-content:center;
        align-items:center;
        &:hover {
        background-color: #4e0eff;
        }
    }
`