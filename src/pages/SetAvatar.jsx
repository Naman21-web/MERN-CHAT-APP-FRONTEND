import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import loader from "../assets/loader.gif"
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from '../utils/APIRoutes';
import { Buffer } from 'buffer';

export default function SetAvatar(){
    const api = 'https://api.multiavatar.com/45678945';//generates randomn avatar its open source
    const navigate = useNavigate();
    const [avatars,setAvatars] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [selectedAvatar,setSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect( () => {
        async function chat12(){
        if(!localStorage.getItem('snappy-user')){//If user hasnt already logged-in before
            navigate('/login')
        }
      }
      chat12();
    },[]);

    const setProfilePicture = async () =>{
        if(selectedAvatar===undefined){
            toast.error("Please Select an avatar",toastOptions)
        } else{
            try{
            const user = await JSON.parse(localStorage.getItem("snappy-user"));
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
                //selectedAvatar state contains the index of the avatar which user selected
                //set image as the image at the index selectedAvatar in avatars array
                image:avatars[selectedAvatar],
            })
            //console.log(avatars[selectedAvatar]); 
        
        //If isSet true in the data which which we got from the backend 
        if(data.isSet){
        //Then set isAvatarImageSet to true and avatarImage to image which we got from backend(that is send by backend)
            //of the user
            user.isAvatarImageSet = true;
            user.avatarImage = data.image;
            //setIrtem and avigate to home page
            localStorage.setItem('snappy-user',JSON.stringify(user));
            navigate("/");
        }else{
            toast.error("Error setting avatar.Please try again",toastOptions);
        }
        }catch(er){
            toast.error(er);
        }
    }
    }
         useEffect( () => {
            async function check(){//made the function as we cant use async in useeffect so 
             const data = [];
             for(let i=0;i<4;i++){//for each loop doesnt work for api so we use for loop manually'
                try{
                 const image = await axios.get(`${api}/${Math.round(Math.random()*1000)}`);//will generate random images
                 const buffer = new Buffer(image.data);
                 data.push(buffer.toString("base64"));
                } catch(er){
                    console.log(er);
                }
             };
             //provide data array in the avatars state //now avatar state contains array of the images
             setAvatars(data);
             setIsLoading(false);
            }
            check();
         },[]);
    //}
    return (
    <>
    {//if isloading is true show loader
         isLoading ? <Container> 
            <img src={loader} alt="loader" className='loader' />
        </Container> : (
            //else shoe this
        <Container>
            <div className="title-container">
                <h1>Pick an avatar as your profile picture</h1>
            </div>
            <div className="avatars">
                {
                    avatars.map((avatar,index)=>{
                        return (
                           //key={index}
                            <div key={index} className={`avatar ${selectedAvatar === index ?"selected":""}`}>
                                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" 
                                onClick={() => setSelectedAvatar(index)}/>
                            </div>
                        )
                    })
                }
            </div>
            <button className='submit-btn' onClick={setProfilePicture}>Set as Profile Picture</button>
        </Container>
    )
        }
        <ToastContainer />
    </>
    );
}

const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    gap: 3rem;
    background-color:#131324;
    height:100vh;
    .loader{
        max-inline-size: 100%;
    }
    .title-container{
        h1{
            color:white;
        }
    }
    .avatars{
        display:flex;
        gap:2rem;
        .avatar{
            border:0.4rem solid transparent;
            padding:0.4rem;
            border-radius:5rem;
            dislay:flex;
            justify-content:center;
            align-items:center;
            transition:0.5s ease-in-out;
            img{
                height:6rem;
            }
        }
        .selected{
            border: 0.4rem solid #4e0eff
        }
    }
    .submit-btn{
    background-color: #4e0eff;
     color: white;
     padding: 1rem 2rem;
     border: none;
     font-weight: bold;
     cursor: pointer;
     border-radius: 0.4rem;
     font-size: 1rem;
     text-transform: uppercase;
     &:hover {
       background-color: #4e0eff;
    }
`