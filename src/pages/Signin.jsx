import React, { useState } from 'react';
import MyContainer from '../components/MyContainer';
import { Link } from 'react-router';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import { toast } from 'react-toastify';


const googleProvider = new GoogleAuthProvider();



const Signin = () => {
    const[user, setUser] =  useState(null);
    const[show, setShow] = useState(false);
    const handlesignin = (e) => {
        e.preventDefault();
        const email = e.target.email?.value;
        const password = e.target.password?.value;
        console.log("asgagasgdmeee111",{ email, password}); 
        signInWithEmailAndPassword(auth, email, password)
        .then(res =>{
            console.log(res.user);
            setUser(res.user);
            toast.success("sign in successfull");
        })
        .catch((e) =>{
            console.log(e);
            toast.error(e.message);
        });
    };


    const handleGoogleSigin = () => {
        signInWithPopup(auth, googleProvider)
         .then(res =>{
            console.log(res.user);
            setUser(res.user);
            toast.success("sign in successfull");
        })
        .catch((e) =>{
            console.log(e);
            toast.error(e.message);
        });

    };




    const handleSignout = () => {
        signOut(auth).then(() =>{
            toast.success("Signout Successfull");
            setUser(null);
        })
        .catch((e) => {
            toast.error(e.message);
        });

    };

    console.log(user);


    return (
<div className="min-h-[96vh] flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 relative overflow-hidden ">
            <div className=''>
<div className="absolute w-72 h-72 bg-pink-400/30 rounded-full blur-3xl top-20 left-20 animate-pulse"></div>
<div className="absolute w-72 h-72 bg-purple-400/30 rounded-full blur-3xl bottom-20 right-20 animate-pulse"></div>

<MyContainer>
    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-40 p-6 lg:p-10">
        <div className='max-w-lg text-center lg:text-left'>
            <h1 className='text-3xl font-extrabold drop-shadow-lg text-white'>
                Welcome Back!
            </h1>
            <p className='mt-4 text-lg text-white/80 leading-relaxed'>
            Join Our community and unlock exclusive feature. Your journey begins here!
            </p>
        </div>
        <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">
    {user ? (
        <div className='text-center space-y-3'>
            <img src={user?.photoURL || "https://via.placeholder.com/150"} className='h-20 w-20 rounded-full mx-auto' alt="" />
            <h2 className='text-xl font-semibold'>
                {user?.displayName} </h2>
            <p className='text-white/80'>{user?.email}</p>
            <button onClick={handleSignout} className='my-btn'>Sign Out</button>    
        </div>
    ) : (

            <form onSubmit={handlesignin} className='space-y-4'>
                <h2 className='text-2xl font-semibold text-center mb-6 text-white'>sign In</h2>
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
    <div className='relative text-white'>
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
            LogIn
       </button>
       <div className='flex items-center justify-center gap-2 my-2'>
        <div className="h-px bg-white/30"> </div>
        <span className="text-sm text-white/70">or</span>
        <div className="h-px w-16 bg-white/30"></div>

       </div>
        <button type="button"
            onClick={handleGoogleSigin}
            className='flex items-center mx-auto gap-3 bg-white text-gray px-10  py-1 rounded-lg cursor-pointer'>
        <img src="https://img.favpng.com/7/1/24/google-logo-google-search-icon-png-favpng-DLXaPGArrFH6yJjYE8USnMuvX.jpg" alt="" className='w-[20px]' /> 

        <span>Continue with Google</span>       

        </button>

    <div className='text-center mt-3'>
        <p className='text-sm text-white/80'>
       Don't Have an account?{" "}
        <Link to="/signup"
        className='text-pink-300 hover:text-white font-medium underline'
        >
            Sign Up        
        </Link>
        </p>

    </div>

    </form>



    )}



        </div>

    </div>  

</MyContainer>

            </div>
            
        </div>
    );
};

export default Signin;