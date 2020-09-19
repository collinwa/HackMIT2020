import React from 'react';
import VideoChat from './components/VideoChat';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <header>
        <h1> Welcome to Zoom.Tv ! </h1>
      </header>
      <main>
        <p> <VideoChat /> </p>
      </main>
      <footer>
      </footer>
    </div>
  );
};

export default App;