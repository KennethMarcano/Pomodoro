import React from 'react';

interface Props {
  text: string;
  handleClick?: () => void;
  className?: string;
}

export function Button(props: Props): JSX.Element {
  return (
    <button onClick={props.handleClick} className={props.className}>
      {props.text}
    </button>
  );
}
