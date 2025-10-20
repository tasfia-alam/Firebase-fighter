import React, { useContext, useRef, useState } from 'react';
import MyContainer from '../components/MyContainer';
import { Link, useNavigate } from 'react-router';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';

import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { useLocation } from 'react-router';


const Signin = () => {
    //const[user, setUser] =  useState(null);
    const[show, setShow] = useState(false);
    const { signInWithEmailAndPasswordFunc, 
        signInWithEmailFunc,
        signInWithGithubFunc,

        sendPasswordResetEmailFunc,
        loading,
        setLoading,
        user,
        setUser,
      } = useContext(AuthContext);

    const location = useLocation();
    const from = location.state || "/";
    const navigate = useNavigate();

    if (user) {
        navigate("/");
        return;
    }

    console.log(location);


    const emailRef = useRef(null);

    const handlesignin = (e) => {
        e.preventDefault();

        const email = e.target.email?.value;
        const password = e.target.password?.value;
        console.log(email, password); 
        signInWithEmailAndPasswordFunc(email, password)
        .then(res =>{
            console.log(res);
            setLoading(false);
            if(!res.user?.emailVerified){
                toast.error("your email is not verified");
                return;
            }
            console.log(res.user);
            setUser(res.user);
            toast.success("sign in successfull");
            navigate(from);
        })
        .catch((e) =>{
            console.log(e);
            toast.error(e.message);
        });
    };


    const handleGoogleSigin = () => {
        signInWithEmailFunc()
         .then(res =>{
            console.log(res.user);
            setUser(res.user);
            toast.success("sign in successfull");
            navigate(from);
        })
        .catch((e) =>{
            console.log(e);
            toast.error(e.message);
        });

    };


    const handleGithubSignIn = () => {
        signInWithGithubFunc()
        .then(res =>{
            console.log(res);
            setLoading(false);
            setUser(res.user);
            toast.success("sign in successfull");
            navigate(from);
        })
        .catch((e) =>{
            console.log(e);
            toast.error(e.message);
        });
    }

    const handleForgetPassword = () =>{
        console.log();
        const email = emailRef.current.value;
        sendPasswordResetEmailFunc(email)
        .then((res) =>{
            setLoading(false);
            toast.success("check your email to reset password");
        }).catch((e) => {
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

            <form onSubmit={handlesignin} className='space-y-4'>
                <h2 className='text-2xl font-semibold text-center mb-6 text-white'>sign In</h2>
        <div>
           <label className="block text-sm font-medium mb-1 text-white">
            Email
            </label>
            <input 
            type="email" 
            name='email'
            ref = {emailRef}
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
{/* forget password */}
        <button onClick={handleForgetPassword} className='hover:underline cursor-pointer'
        type="submit"
        >
            Forget password?
        </button>

        <button type='submit' className="my-btn">
            LogIn
       </button>
       <div className='flex items-center justify-center gap-2 my-2'>
        <div className="h-px bg-white/30"> </div>
        <span className="text-sm text-white/70">or</span>
        <div className="h-px w-16 bg-white/30"></div>

       </div>
       {/* google signin */}
        <button type="button"
            onClick={handleGoogleSigin}
            className='flex items-center mx-auto gap-3 bg-white text-gray px-10  py-1 rounded-lg cursor-pointer'>
        <img src="https://img.favpng.com/7/1/24/google-logo-google-search-icon-png-favpng-DLXaPGArrFH6yJjYE8USnMuvX.jpg" alt="" className='w-[20px]' /> 

        <span>Continue with Google</span>       

        </button>
{/* github signin */}
        <button type="button"
            onClick={handleGithubSignIn}
            className='flex items-center mx-auto gap-3 bg-white text-gray px-10  py-1 rounded-lg cursor-pointer'>
        <img src="https://images.icon-icons.com/3685/PNG/512/github_logo_icon_229278.png" alt="" className='w-[20px]' /> 

        <span>Continue with Github</span>       

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







        </div>

    </div>  

</MyContainer>

            </div>
            
        </div>
    );
};

export default Signin;