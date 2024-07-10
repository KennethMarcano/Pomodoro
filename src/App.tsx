import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { PomodoroTimer } from './components/pomodoro-timer';

function App(): JSX.Element {
  return (
    <div className="container">
      <PomodoroTimer
        pomodoroTime={1200}
        shortRestingTime={300}
        longRestingTime={600}
        numberOfCycles={4}
      />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        className="toast-container"
      />
    </div>
  );
}

export default App;
