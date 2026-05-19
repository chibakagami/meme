import { useState } from 'react';

const TYPE_CLASS = {
  number: 'btn-number',
  operation: 'btn-operation',
  scientific: 'btn-scientific',
  memory: 'btn-memory',
  mode: 'btn-mode',
  clear: 'btn-clear',
  equals: 'btn-equals',
};

export default function Button({ label, type, span, onPress }) {
  const [pressed, setPressed] = useState(false);

  const colorClass = TYPE_CLASS[type] ?? 'btn-number';
  const spanClass = span === 2 ? 'col-span-2' : '';
  const pressedClass = pressed ? 'pressed' : '';

  function handlePointerDown(e) {
    e.preventDefault();
    setPressed(true);
    if (navigator.vibrate) navigator.vibrate(10);
    onPress();
  }

  function handlePointerUp() {
    setPressed(false);
  }

  return (
    <button
      className={`btn ${colorClass} ${spanClass} ${pressedClass}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onContextMenu={(e) => e.preventDefault()}
    >
      {label}
    </button>
  );
}
