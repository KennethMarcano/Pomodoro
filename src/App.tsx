import React from 'react';

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
    </div>
  );
}

export default App;
