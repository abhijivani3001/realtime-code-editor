import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';

const Home = () => {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const createNewRoomHandler = (event) => {
    event.preventDefault();

    const id = uuidV4();
    setRoomId(id);

    toast.success('Created a new room');
  };

  const isValid = () => {
    if (roomId.trim().length && username.trim().length) {
      return true;
    }
    return false;
  };

  const joinRoomHandler = (event) => {
    event.preventDefault();

    if (!isValid()) {
      toast.error('Room ID & username is required!');
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
  };

  return (
    <div className='h-[100vh] flex flex-col align-middle justify-center'>
      <div className='mx-auto flex p-4 rounded-lg shadow-xl bg-gray-800 flex-col max-w-[90%]'>
        <img src='/code-sync.png' alt='app-logo' className='w-64' />
        
        <h4 className='mt-4 mb-2 text-lg font-semibold text-gray-300'>
          Enter Invitation Room Id
        </h4>
        <div className='flex flex-col gap-3'>
          <form onSubmit={joinRoomHandler}>
            <div className='flex flex-col gap-2'>
              <input
                value={roomId}
                onChange={(e) => {
                  setRoomId(e.target.value);
                }}
                type='text'
                placeholder='ROOM ID'
              />
              <input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type='text'
                placeholder='USERNAME'
              />
              <button className='btn w-fit ml-auto my-1'>Join</button>
            </div>
          </form>

          <div className='border-b border-gray-500'></div>

          <span className='text-gray-100 px-2'>
            If you don't have an invite, then create &nbsp;
            <button
              onClick={createNewRoomHandler}
              onSubmit={createNewRoomHandler}
              className='text-sky-400 underline underline-offset-2 font-semibold hover:text-sky-600 transition-all duration-300'
            >
              new room
            </button>
          </span>
        </div>
      </div>

      <footer className='fixed bottom-4 w-full'>
        <h4 className='text-center text-base'>
          Built with 💛&nbsp;by {''}
          <a
            href='https://github.com/abhijivani3001'
            className='font-semibold underline underline-offset-4 text-emerald-500 hover:text-emerald-600 transition-all duration-300'
          >
            Abhi Jivani
          </a>
        </h4>
      </footer>
    </div>
  );
};

export default Home;
