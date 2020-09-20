import React, { useState, useEffect } from 'react';
import Video from 'twilio-video'; import Chat from 'twilio-chat';
import Participant from './Participant';

const Room = ({ username, roomName, channelName, token, handleLogout }) => {
  const [room, setRoom] = useState(null);
  const [channel, setChannel] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [input, setInput] = useState('');

  const remoteParticipants = participants.map(participant => (
    <Participant key={participant.sid} participant={participant} />
  ));


  useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };
    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };
    Video.connect(token, {
      name: roomName
    }).then(room => {
      setRoom(room);
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room.participants.forEach(participantConnected);
    });

    // Helper function to print chat message to the chat window
    function printMessage(fromUser, message) {
      var $chatbox = document.getElementById("chatbox");
      var $user = document.createElement("SPAN");
      $user.classList.add("username");
      $user.innerHTML = fromUser + ":";
      if (fromUser === username) {
        $user.classList.add('me');
      }
      var $message = document.createElement("SPAN");
      $message.classList.add("message");
      $message.innerHTML = message;
      var $container = document.createElement("DIV");
      $container.classList.add("message-container");
      $container.appendChild($user)
      $container.appendChild($message);
      $chatbox.appendChild($container);
      $chatbox.scrollTop = $chatbox.scrollHeight;
    }

    Chat.create(token).then(client => {
      client.getChannelByUniqueName(channelName).then(channel => {
        setChannel(channel);
        // Join channel
        channel.join();
        // Listen for new messages sent to the channel
        channel.on('messageAdded', function (message) {
          console.log('message added');
          printMessage(message.author, message.body);
        });
      }).catch(
        client.createChannel({
          uniqueName: channelName,
          friendlyName: 'General Chat Channel'
        }).then(channel => {
          setChannel(channel);
          // Join channel
          channel.join()
          // Listen for new messages sent to the channel
          channel.on('messageAdded', function (message) {
            console.log('message added');
            printMessage(message.author, message.body);
          });
        }).catch(channel => {
          console.log('Channel could not be created:');
          console.log(channel);
        }));
    });

    return () => {
      setRoom(currentRoom => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.localParticipant.tracks.forEach(function (trackPublication) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [username, roomName, channelName, token]);

  useEffect(() => {
    const interval = setInterval(() => {
      const localParticipant = room.localParticipant;

      console.log(`Participant "${localParticipant.sid}" is connected to the Room`);

      const finaldata = async () => { await fetch('/retrieve', {
        method: 'POST',
        body: JSON.stringify({
          identity: localParticipant.identity 
        }),
        headers: {
        'Content-Type': 'application/json'
        }
      }).then(async res => {
        let data;
        const response = res.json().data_res;
        if (!response) {
          data = await fetch('/insert', {
            method: 'POST',
            body: JSON.stringify({
              identity: localParticipant.identity,
              newParam: 10
            }),
            headers: {
            'Content-Type': 'application/json'
            }
          })
        } else {
          data = await fetch('/update', {
            method: 'POST',
            body: JSON.stringify({
              identity: localParticipant.identity,
              newParam: 10
            }),
            headers: {
            'Content-Type': 'application/json'
            }
          })
        }
        return data;
      })};

      finaldata();

      //room.participants.forEach(participant => {
      //  console.log(`Participant "${participant.sid}" is connected to the Room`);
      //});
    }, 5000);
    return () => clearInterval(interval);
  }, [room]);

  return (
    <div className="room">
      <div id="chatbox"></div>
      <h2 class="roomHeader">Room: {roomName}</h2>
      <button onClick={handleLogout} class="logout">Log out</button>
      <button class="points" onClick={() => {
        // add points to local user
        console.log('kekw');
      }}>Get points!</button>
      <div className="local-participant">
        {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
        ) : (
            ''
          )}
      </div>
      <h3>Remote Participants</h3>
      <div className="remote-participants">{remoteParticipants}</div>

      <input
        id="chat-input"
        type="text"
        placeholder="Send a message"
        value={input}
        onChange={event => {
          setInput(event.target.value);
        }}
        onKeyPress={event => {
          if (event.key === 'Enter' && input !== '') {
            channel.sendMessage(input);
            setInput('');
          }
        }}
        autoFocus />
    </div>
  );
};

export default Room;
