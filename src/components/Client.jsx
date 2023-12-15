import React from 'react';
import Avatar from 'react-avatar';

const Client = (props) => {
  return (
    <div className='flex gap-2 align-middle justify-center'>
      {/* userName */}
      <Avatar color={'#296d98'} name={props.username} size={40} round='10px' />
      <span className='my-auto text-gray-300 font-semibold uppercase text-sm'>
        {props.username}
      </span>
    </div>
  );
};

export default Client;
