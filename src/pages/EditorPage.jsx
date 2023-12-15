import React, { useEffect, useRef, useState } from 'react';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import ACTIONS from '../Actions';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import toast from 'react-hot-toast';

const EditorPage = () => {
  const socketRef = useRef(null);
  const location = useLocation();
  const reactNavigator = useNavigate();
  const { roomId } = useParams(); // gets roomId from url
  const codeRef = useRef(null);

  const [clients, setClients] = useState([]);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      const handleErrors = (err) => {
        console.log('socket error', err);
        toast.error('Socket connection failed, try again later.');
        reactNavigator('/');
      };

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      // listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room.`);
            console.log(`${username} joined`);
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      // listening for disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();

    // clear listeners
    return () => {
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
      socketRef.current.disconnect(); // call disconnect() at the end
    };
  }, []);

  if (!location.state) {
    <Navigate to='/' />;
  }

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success('Room ID copied to your clipboard.');
    } catch (error) {
      toast.error('Could not copy the Room ID!');
      console.log(error);
    }
  };

  const leaveRoom = () => {
    reactNavigator('/');
  };

  return (
    <>
      {/* main */}
      <div className='grid grid-cols-[16rem,auto]'>
        {/* aside */}
        <div className='h-[100vh] bg-gray-800 border-r border-r-gray-700 shadow-xl p-4 flex flex-col align-middle justify-between'>
          {/* asideinner */}
          <div>
            {/* logo */}
            <div>
              <img className='w-40' src='/code-sync.png' alt='app-logo' />
            </div>
            <div className='border-b my-4 border-gray-500'></div>
            <h3 className='text-gray-100 text-lg font-semibold my-2'>
              Connected
            </h3>

            {/* clientlist */}
            <div className='flex align-middle flex-wrap gap-2'>
              {clients.map((client) => (
                <Client key={client.socketId} username={client.username} />
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-2 mx-2'>
            <button className='btn2' onClick={copyRoomId}>
              Copy ROOM ID
            </button>
            <button className='btn3' onClick={leaveRoom}>
              Leave
            </button>
          </div>
        </div>

        {/* editor */}
        <div className=''>
          <Editor
            socketRef={socketRef}
            roomId={roomId}
            onCodeChange={(code) => {
              codeRef.current = code;
            }}
          />
        </div>
      </div>
    </>
  );
};

export default EditorPage;
