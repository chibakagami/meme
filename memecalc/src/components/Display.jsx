export default function Display({ expression, displayValue, isDeg, hasMemory }) {
  const len = displayValue.length;
  const sizeClass = len > 12 ? 'xsmall' : len > 9 ? 'small' : '';

  return (
    <div className="display">
      <div className="display-status">
        <span className={isDeg ? 'status-on' : 'status-off'}>DEG</span>
        <span className={!isDeg ? 'status-on' : 'status-off'}>RAD</span>
        <span className={hasMemory ? 'status-on' : 'status-off'}>M</span>
      </div>
      <div className="display-expression">{expression || ' '}</div>
      <div className={`display-value ${sizeClass}`}>{displayValue}</div>
    </div>
  );
}
