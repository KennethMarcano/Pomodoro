import React from 'react';

import { PomodoroTimer } from './components/pomodoro-timer';

function App(): JSX.Element {
  return (
    <div className="container">
      <PomodoroTimer
        pomodoroTime={3600}
        shortRestingTime={2}
        longRestingTime={5}
        numberOfCycles={4}
      />
    </div>
  );
}

export default App;
