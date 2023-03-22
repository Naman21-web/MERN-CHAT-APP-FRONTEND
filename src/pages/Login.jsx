import React,{useState,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/logo.svg"
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';
import SocialLoginButtons from '../components/SocialLoginButtons';

function Login(){
    const navigate = useNavigate();
    const [values,setValues] = useState({
        username: "",//setting initial state to be empty string
        password: "",
    })
    const toastOptions = {
      position: "bottom-right",
      autoClose:8000,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark',
    }
    useEffect(()=> {
      if(localStorage.getItem('snappy-user')){//If user already logged-in before
            navigate('/')
      }
    },[]);
    const handleSubmit = async (event)=>{
        event.preventDefault();
        //if username and password correct
        if(handleValidation()){
          //get password and username from values and store it in password and username variables
          //destructuring password and username
          const {password,username} = values;
            try{
              //post the data{username and password } in login route
              //get the result of post method in {data} we have to use {}  beacause
              //we want to destructure the data from post method responds as it contain various responded variables
              //we get following responds after using post methods

              /*{
                // `data` is the response that was provided by the server
                data: {},
              
                // `status` is the HTTP status code from the server response
                status: 200,
              
                // `statusText` is the HTTP status message from the server response
                // As of HTTP/2 status text is blank or unsupported.
                // (HTTP/2 RFC: https://www.rfc-editor.org/rfc/rfc7540#section-8.1.2.4)
                statusText: 'OK',
              
                // `headers` the HTTP headers that the server responded with
                // All header names are lower cased and can be accessed using the bracket notation.
                // Example: `response.headers['content-type']`
                headers: {},
              
                // `config` is the config that was provided to `axios` for the request
                config: {},
              
                // `request` is the request that generated this response
                // It is the last ClientRequest instance in node.js (in redirects)
                // and an XMLHttpRequest instance in the browser
                request: {}
              }*/

              //data contains the response provided in the backend in loginRoute
              //We have returned 2 feilds in the  backend which we get here in data field in frontend
              //those 2 fields are "msg" and "status" when incorrect username or password is gven
              //those 2 fields are "user" and "status" when correct username or password is gven
              //data.status provide status i.e., true or false
              //So we have used data.msg in case of false status(incorrect username or password)
              //Ex- res.json({msg:"Incorrect Username or password", status:false}) returning this in backend
              //so data.msg = "Incorrect Username or password" & data.status=false;

              //And we have used data.user in case of status true(correct username and password)
              //Ex- res.json({status:true,user});
              //user is the datails of user i.e., usrname and password and other details
                  const {data} = await axios.post(loginRoute,{
                        username,
                        password,
                      });
                      if(data.status===false){
                        toast.error(data.msg, toastOptions);
                      }
                      if(data.status===true){
                        localStorage.setItem('snappy-user',JSON.stringify(data.user))
                        navigate("/");
                      }
            }
            catch(err){
                  toast.error(err, toastOptions);
            }
        };
    };
    
    const handleValidation = ()=>{
      //destructure password and username from values and store it in password and username variables
      const {password,username} = values;
      if(password ===""){
            toast.error("Email and Password is required",toastOptions);
          return false;
      } else if(username.length===""){
          toast.error("Email and Password is required",toastOptions);
          return false;
      } 
      return true;
    };

    const handleChange = (event) =>{
      setValues({...values,[event.target.name]: event.target.value});
    }
      return (
        <>
            <FormContainer>
                <form onSubmit={(event)=>handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h1>snappy</h1>
                    </div>
                    <input type="text" placeholder='Username' name="username" onChange={(e)=>handleChange(e)} min="3" />
                    <input type="password" placeholder='Password' name="password" onChange={(e)=>handleChange(e)}  />
                    <button type='submit' className='btn'>Login</button>
                    <SocialLoginButtons />
                    <span>New User ? <Link to="/register">Register</Link></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
      )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
   form {
     display: flex;
     flex-direction: column;
     gap: 2rem;
     background-color: #00000076;
     border-radius: 2rem;
     padding: 3rem 5rem;
   }
   input {
     background-color: transparent;
     padding: 1rem;
     border: 0.1rem solid #4e0eff;
     border-radius: 0.4rem;
     color: white;
     width: 100%;
     font-size: 1rem;
     &:focus {
       border: 0.1rem solid #997af0;
       outline: none;
     }
   }
   .btn {
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
   }
   span {
     color: white;
     text-transform: uppercase;
     a {
       color: #4e0eff;
       text-decoration: none;
       font-weight: bold;
     }
   }
`; 

export default Login;