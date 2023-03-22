import React,{lazy, Suspense} from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

const Register = lazy(()=> import("./pages/Register"));
const Chat = lazy(()=> import("./pages/Chat"));
const Login = lazy(()=> import("./pages/Login"));
const SetAvatar = lazy(()=> import("./pages/SetAvatar"));
const SetUsername = lazy(()=> import("./pages/SetUsername"))

//Our app is compiled by webpack and webpack compiles all of this routes and components once and load it initially when
//we load the app and it will take time as all the pages are loaded once
//Thatswhy we used lazy
//We have to make sure "export default" in page
//This process is called codespitting using lazy and suspense
export default function App(){
    return (
      <BrowserRouter>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/setAvatar' element={<SetAvatar />} />
          <Route path='/setusername' element={<SetUsername />} />
          <Route path='/' element={<Chat />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    );
  }