import { CountdownCircleTimer } from 'react-countdown-circle-timer';

interface PomodoroProps {
  duration: number;
  isPlaying: boolean;
}
export const Pomodoro = ({ duration, isPlaying}: PomodoroProps) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={duration}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[duration, duration * 0.7, duration * 0.3, 0]}
      >
        {({ remainingTime }) => (
          <div className="text-xl font-bold">{Math.floor(remainingTime / 60)}:{String(remainingTime % 60).padStart(2, '0')}</div>
        )}
      </CountdownCircleTimer>
    </div>
  );
};
