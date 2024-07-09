import React from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sonStart = require('../sounds/src_sounds_bell-start.mp3');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sonFinish = require('../sounds/src_sounds_bell-finish.mp3');

const playStart = new Audio(sonStart);
const playFinish = new Audio(sonFinish);

interface Props {
  pomodoroTime: number;
  shortRestingTime: number;
  longRestingTime: number;
  numberOfCycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const numberCyclesTrue = props.numberOfCycles - 1;
  const [isWorking, setIsWorking] = React.useState(false);
  const [numberCycles, setNumberCycles] = React.useState(numberCyclesTrue);
  const [mainTime, setMainTime] = React.useState(props.pomodoroTime);
  const [isPlaying, setIsPlayingButton] = React.useState(false);
  const [totalTime, setTotalTime] = React.useState(0);
  const [totalPomodoros, setTotalPomodoros] = React.useState(0);

  React.useEffect(() => {
    if (isWorking) document.body.classList.add('working');
    else document.body.classList.remove('working');
  }, [isWorking]);

  useInterval(
    () => {
      if (mainTime === 0) {
        if (isWorking) {
          setTotalPomodoros(totalPomodoros + 1);
          if (numberCycles !== 0) {
            playFinish.play();
            setMainTime(props.shortRestingTime);
            setIsWorking(false);
            return setNumberCycles(numberCycles - 1);
          } else {
            playFinish.play();
            setNumberCycles(numberCyclesTrue);
            setIsWorking(false);
            return setMainTime(props.longRestingTime);
          }
        } else {
          playStart.play();
          setMainTime(props.pomodoroTime);
          return setIsWorking(true);
        }
      }
      if (isWorking) setTotalTime(totalTime + 1);
      setMainTime(mainTime - 1);
    },
    isPlaying ? 50 : null,
  );

  function work(): void {
    playStart.play();
    setIsPlayingButton(true);
    setIsWorking(true);
    setMainTime(props.pomodoroTime);
    setNumberCycles(numberCyclesTrue);
    const playPause = document.querySelector(
      '.playingButton',
    ) as HTMLButtonElement;
    playPause.classList.remove('hidden');
  }

  function rest(): void {
    playFinish.play();
    setIsPlayingButton(true);
    setMainTime(props.shortRestingTime);
  }

  function playing(): void {
    setIsPlayingButton(!isPlaying);
  }

  return (
    <div className="pomodoro">
      <h2>You are: {isWorking ? 'working' : 'resting'}</h2>
      <Timer showHours={false} mainTime={mainTime} />
      <div className="buttons">
        <Button handleClick={work} text="Work" className="workButton" />
        <Button handleClick={rest} text="Rest" className="restButton" />
        <Button
          handleClick={playing}
          text={isPlaying ? 'Pause' : 'Play'}
          className="playingButton hidden"
        />
      </div>
      <div className="details">
        <h4>Details:</h4>
        <p>Cycles: {Math.trunc(totalPomodoros / props.numberOfCycles)}</p>
        <div>
          Total working time: <Timer showHours={true} mainTime={totalTime} />
        </div>
        <p>Time blocks (promodoros): {totalPomodoros}</p>
      </div>
    </div>
  );
}
