import React, { useState } from 'react';
import MyContainer from '../components/MyContainer';
import { Link } from 'react-router';
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/firebase.config';
import { toast } from 'react-toastify';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';


const SignUp = () => {
 
    const[show, setShow] = useState(false);


    const handlesignup = (e) => {
        e.preventDefault();
        const email = e.target.email?.value;
        const password = e.target.password?.value;
        console.log("asgagasgdmeee",{ email, password});
        //console.log(password.length);
        // if(password.length < 6){
        //     toast.error("password should be at least 6 digit");
        //     return;
        // }
        const regExp =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!regExp.test(password)){
            toast.error("❌ Password must include uppercase, lowercase, number, and special character.");
            return;
        }

      createUserWithEmailAndPassword( auth, email, password )
      .then((res) =>{
        console.log(res);
        toast.success("sign up successful")
      })
      .catch((e) => {
        console.log(e)
        console.log(e.code);
        toast.error(e.message);
      });
    };
    return (
        <div className="min-h-[96vh] flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 relative overflow-hidden">
            <div className=''>
<div className="absolute w-72 h-72 bg-pink-400/30 rounded-full blur-3xl top-20 left-20 animate-pulse"></div>
<div className="absolute w-72 h-72 bg-purple-400/30 rounded-full blur-3xl bottom-20 right-20 animate-pulse"></div>

<MyContainer>
    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-30 p-6 lg:p-10">
        <div className='max-w-lg text-center lg:text-left'>
            <h1 className='text-3xl font-extrabold drop-shadow-lg text-white'>
                Create Your Account
            </h1>
            <p className='mt-4 text-lg text-white/80 leading-relaxed'>
            Join Our community and unlock exclusive feature. Your journey begins here!
            </p>
        </div>
        <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">
        <h2 className='text-2xl font-semibold text-center mb-6 text-white'>sign Up</h2>

    <form onSubmit={handlesignup} className='space-y-4'>
        <div>
           <label className="block text-sm font-medium mb-1 text-white">
            Email
            </label>
            <input 
            type="email" 
            name='email'
            placeholder='example@gmail.com'
            className='input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400'
            
            />
        </div>
    <div className='relative'>
        <label className='block text-sm font-medium mb-1'>password</label>
        <input
         type={show ? "text" : "password"}
         name= "password"
         placeholder='************'
         className='input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400'/>
<span onClick={() => setShow(!show)} 
className='absolute right-[8px] top-[36px] cursor-pointer z-50 text-white'>
    {show ? <FaEye /> : <IoEyeOff />}
</span>


        </div>



        <button type='submit' className="my-btn">
            Sign Up
       </button>

    <div className='text-center mt-3'>
        <p className='text-sm text-white/80'>
        Already have an account?{" "}
        <Link to="/signin"
        className='text-pink-300 hover:text-white font-medium underline'
        >
            Sign In        
        </Link>
        </p>

    </div>



    </form>

        </div>







    </div>  

</MyContainer>

            </div>
            
        </div>
    );
};

export default SignUp;