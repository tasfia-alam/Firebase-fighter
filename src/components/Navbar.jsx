import React, { useContext } from 'react';
import { Link } from 'react-router';
import MyContainer from './MyContainer';
import MyLink from './MyLink';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { ClockLoader } from 'react-spinners';

const Navbar = () => {
  const { user, setUser, signOutUserFunc , loading, setLoading} = useContext(AuthContext);
  console.log(user);

  const handleSignout = () => {
    signOutUserFunc() // <-- এখানে ফাংশন কল দিতে হবে
      .then(() => {
        toast.success("Signout Successful");
        setUser(null);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  console.log(loading)

  return (
    <div className='py-2 border-b border-b-gray-300'>
      <MyContainer className={"flex items-center justify-between"}>
        <figure>
          <img
            src="https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?semt=ais_hybrid&w=740&q=80"
            alt=""
            className="w-[60px]"
          />
        </figure>

        <ul className='flex items-center gap-2'>
          <li>
            <MyLink to={"/"}>Home</MyLink>
          </li>
          <li>
            <MyLink to={"/about-us"}>About Us</MyLink>
          </li>
    { user && (
        <li>
            <MyLink to={"/profile"}>Profile</MyLink>
          </li>
    )}
        </ul>

        {loading ? 
        <ClockLoader />
        : user ? (
          <div className='text-center space-y-3'>
            <button className="btn" popoverTarget="popover-1" style={{ anchorName: "--anchor-1" }}>
              <img
                src={user?.photoURL || "https://via.placeholder.com/150"}
                className='h-[40px] w-[40px] rounded-full mx-auto'
                alt=""
              />
            </button>

            <div
              className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
              popover="auto"
              id="popover-1"
              style={{ positionAnchor: "--anchor-1" }}
            >
              <img
                src={user?.photoURL || "https://via.placeholder.com/150"}
                className='h-[40px] w-[40px] rounded-full mx-auto'
                alt=""
              />
              <h2 className='text-xl font-semibold'>{user?.displayName}</h2>
              <p className='text-white/80'>{user?.email}</p>
              <button onClick={handleSignout} className='my-btn'>
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <button className='bg-purple-500 text-white px-4 py-2 rounded-md font-semibold'>
            <Link to={"/signin"}>Sign In</Link>
          </button>
        )}
      </MyContainer>
    </div>
  );
};

export default Navbar;
