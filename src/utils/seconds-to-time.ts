export function secondsToTime(seconds: number, showHours: boolean): string {
  const hours = Math.trunc(seconds / 3600);
  const minutes = Math.trunc((seconds - hours * 3600) / 60);
  const second = seconds - hours * 3600 - minutes * 60;
  const zeroLeft = (x: number): string => {
    return x.toString().padStart(2, '0');
  };
  if (showHours)
    return `${zeroLeft(hours)}:${zeroLeft(minutes)}:${zeroLeft(second)}`;
  return `${zeroLeft(minutes)}:${zeroLeft(second)}`;
}
