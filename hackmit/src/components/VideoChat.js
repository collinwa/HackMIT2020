import React from 'react';
import Lobby from './Lobby'
import {useState, useCallback} from 'react';

const VideoChat = () => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);

  // using callback to avoid redefining function if 
  // no change between calls
  const handleUsernameChange = useCallback(event => {
    setUsername(event.target.value);
  }, []);

  // change the room name
  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, []);

  // handle submit 
  const handleSubmit = useCallback(async event => {
    // prevent default behavior
    event.preventDefault();
    // fetch the video token, specify username + roomname
    const data = await fetch('/video/token', {
      method: 'POST',
      body: JSON.stringify({
        identity: username,
        room: roomName
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
    setToken(data.token);
  }, [username, roomName]);

  // handle logout
  const handleLogout = useCallback(event => {
    setToken(null);
  }, []);

  // render the lobby if we don't have a token
  let render;
  if (token) {
    render = (
      <div>
        <p> Username: {username} </p>
        <p> Room name: {roomName} </p>
        <p> Token: {token} </p>
      </div>
      );
  } else {
    render = (<Lobby
      username={username}
      roomName={roomName}
      handleUsernameChange={handleUsernameChange}
      handleRoomNameChange={handleRoomNameChange}
      handleSubmit={handleSubmit}
    />);
  }

  return render;
};

export default VideoChat;