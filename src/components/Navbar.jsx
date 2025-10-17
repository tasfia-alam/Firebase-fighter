import React from 'react';
import { Link } from 'react-router';
import MyContainer from './MyContainer';
import MyLink from './MyLink';

const Navbar = () => {
    return (
        <div className='py-2 border-b border-b-gray-300'>
            <MyContainer className={"flex items-center justify-between"}>
                <figure>
                    <img src="https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?semt=ais_hybrid&w=740&q=80" alt="" className="w-[60px]"  />
                </figure>
                <ul className='flex items-center gap-2'>
                    <li>
                        <MyLink to={"/"}>Home</MyLink>
                    </li>
                    <li>
                        <MyLink to={"/about-us"}>About Us
                        </MyLink>
                    </li>
                    <li>
                        <MyLink to={"/profile"}>Profile
                        </MyLink>
                    </li>
                </ul>
        <button className='bg-purple-500 text-white px-4 py-2 rounded-md font-semibold'>
            <Link to={"/signin"}>SignIn</Link>
        </button>
            </MyContainer>
            
        </div>
    );
};

export default Navbar;