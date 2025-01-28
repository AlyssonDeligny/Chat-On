import React, { useState } from 'react';

export default function MessageInput({send} : {send : (val :string ) => void }) {

  const [value, setValue] = useState('');

  const handleSend = () => {
    if (value.trim() !== '') {
      send(value);
      setValue('');
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  };

  return <>
    <input
      type="text"
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Type your message..."
      value={value}
    />    <button onClick={handleSend}>Send</button>
  </>
}