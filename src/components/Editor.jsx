import React, { useCallback, useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import ACTIONS from '../Actions';

const Editor = ({ socketRef, roomId }) => {
  const [value, setValue] = useState("console.log('hello world!');");

  const onChange = useCallback((code, viewUpdate) => {
    setValue(code);
    // console.log(code);

    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
      roomId,
      code,
    });
  }, []);

  useEffect(() => {
    socketRef.current?.on(ACTIONS.CODE_CHANGE, ({ code }) => {
      setValue(code);
    });
  }, [socketRef.current]);

  return (
    <CodeMirror
      className='text-base'
      value={value}
      theme='dark'
      height='100vh'
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
    />
  );
};

export default Editor;
