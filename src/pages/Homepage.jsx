import React from 'react';
import { toast, ToastContainer } from 'react-toastify';




const Homepage = () => {
    const handleNotify = () =>{
        toast.success("you'll be notified when the homepage is ready!",{
            position:"top-center",
            autoClose:3000,
            theme:"colored",
        });
    }
    return (
        <div className='min-h-screen bg-purple-500 flex flex-col items-center justify-center'>
            <h1 className='text-5xl md:text-6xl font-bold text-white animate-bounce drop-shadow-lg'>✈️ Homepage is Coming Soon</h1>
        <p>Stay tuned! we're something amazing for you✨</p>

        <div>
            <button onClick={handleNotify}
            className='btn btn-outline btn-accent animate-[pulse_2s_infinite]'
            >
                Notify me
            </button>
        </div>
        <div className='absolute bottom-6 text-white text-sm animate-pulse'>
            Developed by <span className='font-bold'>Utso</span>
        </div>
        <ToastContainer />
        </div>
    );
};

export default Homepage;