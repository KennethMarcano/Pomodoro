import React from 'react';
import { toast } from 'react-toastify';
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
  const [isWorking, setIsWorking] = React.useState(false);
  const [isPlaying, setIsPlayingButton] = React.useState(false);
  const [totalTime, setTotalTime] = React.useState(0);
  const [totalPomodoros, setTotalPomodoros] = React.useState(0);
  const [pomodoroTime, setPomodoroTime] = React.useState(props.pomodoroTime);
  const [shortRestingTime, setShortRestingTime] = React.useState(
    props.shortRestingTime,
  );
  const [longRestingTime, setLongRestingTime] = React.useState(
    props.longRestingTime,
  );
  const [numberCycles, setNumberCycles] = React.useState(
    props.numberOfCycles - 1,
  );
  const [mainTime, setMainTime] = React.useState(pomodoroTime);

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
            setMainTime(shortRestingTime);
            setIsWorking(false);
            return setNumberCycles(numberCycles - 1);
          } else {
            playFinish.play();
            setNumberCycles(numberCycles);
            setIsWorking(false);
            return setMainTime(longRestingTime);
          }
        } else {
          playStart.play();
          setMainTime(pomodoroTime);
          return setIsWorking(true);
        }
      }
      if (isWorking) setTotalTime(totalTime + 1);
      setMainTime(mainTime - 1);
    },
    isPlaying ? 1000 : null,
  );

  function work(): void {
    playStart.play();
    setIsPlayingButton(true);
    setIsWorking(true);
    setMainTime(pomodoroTime);
    setNumberCycles(numberCycles);
    const playPause = document.querySelector(
      '.playingButton',
    ) as HTMLButtonElement;
    playPause.classList.remove('hidden');
  }

  function rest(): void {
    playFinish.play();
    setIsPlayingButton(true);
    setMainTime(shortRestingTime);
  }

  function playing(): void {
    setIsPlayingButton(!isPlaying);
  }

  function setPomodoro(): void {
    const timer = document.querySelector('#timer') as HTMLInputElement;
    const timerNumber = parseFloat(timer.value);
    const shortRest = document.querySelector('#shortRest') as HTMLInputElement;
    const shortRestNumber = parseFloat(shortRest.value);
    const longRest = document.querySelector('#longRest') as HTMLInputElement;
    const longRestNumber = parseFloat(longRest.value);
    const cycles = document.querySelector('#cycles') as HTMLInputElement;
    const numberCycles = parseFloat(cycles.value);
    if (
      isNaN(timerNumber) ||
      isNaN(shortRestNumber) ||
      isNaN(longRestNumber) ||
      isNaN(numberCycles)
    ) {
      toast.error('Valeus incorrects');
      return;
    }
    toast.success('set');
    setPomodoroTime(toSecond(timerNumber));
    setMainTime(pomodoroTime);
    setIsWorking(false);
    setShortRestingTime(toSecond(shortRestNumber));
    setLongRestingTime(toSecond(longRestNumber));
    setNumberCycles(numberCycles - 1);
  }

  function toSecond(x: number): number {
    return x * 60;
  }

  function toStringMin(x: number): string {
    return (x / 60).toString();
  }

  return (
    <div className="pomodoro">
      <h2>You are: {isWorking ? 'working' : 'resting'}</h2>
      <Timer showHours={false} mainTime={mainTime} />
      <div className="buttons">
        <Button
          handleClick={setPomodoro}
          text="Set up"
          className="restButton"
        />
        <Button handleClick={work} text="Work" className="workButton" />
        <Button handleClick={rest} text="Rest" className="restButton" />
        <Button
          handleClick={playing}
          text={isPlaying ? 'Pause' : 'Play'}
          className="playingButton hidden"
        />
      </div>
      <div className="details">
        <div className="info">
          <h4>Details</h4>
          <p>Cycles: {Math.trunc(totalPomodoros / props.numberOfCycles)}</p>
          <p>
            Total working time: <Timer showHours={true} mainTime={totalTime} />
          </p>
          <p>Time blocks (promodoros): {totalPomodoros}</p>
        </div>

        <div className="set-pomodoro">
          <h4>Set pomodoro</h4>
          <div className="numbers">
            <label>Timer ({toStringMin(pomodoroTime)} m):</label>
            <input id="timer" type="text" />
            <label>short resting ({toStringMin(shortRestingTime)} m):</label>
            <input id="shortRest" type="text" />
            <label>Long resting ({toStringMin(longRestingTime)} m):</label>
            <input id="longRest" type="text" />
            <label>Cycles ({(numberCycles + 1).toString()}):</label>
            <input id="cycles" type="text" />
          </div>
        </div>
      </div>
    </div>
  );
}
