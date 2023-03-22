import React, { useState,useEffect,useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute,host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from "socket.io-client";

export default function Chat(){
      const socket = useRef();
      const navigate = useNavigate();
      const [contacts,setContacts] = useState([]);
      const [currentUser,setCurrentUser] = useState(undefined);
      const [currentChat,setCurrentChat] = useState(undefined);
      const [isLoaded,setIsLoaded] = useState(false);
      useEffect(() => {//useEffect is executed in the sequence you have written it
            const f1 = async ()=> {
            if(!localStorage.getItem('snappy-user')){//If user hasnt already logged-in before
                  navigate('/login')
            }else{
                  setCurrentUser(await JSON.parse(localStorage.getItem("snappy-user")));
                  setIsLoaded(true);
                  //console.log(currentUser)
                  //console.log(JSON.parse(localStorage.getItem("snappy-user")));
            }
      }
      f1();
      },[])
      //console.log(currentUser);
      useEffect(()=> {
            //If currentUsr exists
            if(currentUser){
                  socket.current = io(host);
                  socket.current.emit("add-user",currentUser._id);//add it in the global map that we set up in backend
            }
      },[currentUser])
      useEffect(() => {
            const f2 = async ()=>{
            if(currentUser){//check if there is a current user
                  if(currentUser.isAvatarImageSet){//check if avatarimage is set of current user
                        //here we have not used {data} so we are getting all the fields from axios in data
                        //i.e., status,data,statusText,config,headers,request
                        //so to get a particular field we have to use data.data to get data, data.status to get status
                        //data.request to get request
                        //Here we want data field from axios so we used data.data in setContacts
                        //data.data field contain the responds from the backend which we have sent in this route
                        //return res.json(users); we have sent this in backend to frontend
                        //so data.data will contain "users"
                        //users have "email","username","avatarImage","_id"
                        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);//get contacts
                        setContacts(data.data);//set contacts
                        //console.log(contacts);
                  }else{
                        navigate('/setAvatar');//if avatar isn't set
                  }
            }}
            f2();
      },[currentUser]);
      //console.log(contacts);
      const handleChatChange = (chat) => {
            setCurrentChat(chat);
      }
      return (
      <Container>
            <div className="container">
                  <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
                  {
                       isLoaded && currentChat == undefined ? (
                        <Welcome currentUser={currentUser} />) :
                        (<ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>)
                  }
            </div>
      </Container>
      )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

