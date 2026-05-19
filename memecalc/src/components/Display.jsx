export default function Display({ expression, displayValue, isDeg, hasMemory, bootMessage }) {
  const len = displayValue.length;
  const sizeClass = len > 12 ? 'xsmall' : len > 9 ? 'small' : '';

  if (bootMessage) {
    return (
      <div className="display">
        <div className="display-status">
          <span className="status-on">SYS</span>
        </div>
        <div className="display-expression">SCIENTIFIC CALC</div>
        <div className="display-value boot-cursor">{bootMessage}</div>
      </div>
    );
  }

  return (
    <div className="display">
      <div className="display-status">
        <span className={isDeg ? 'status-on' : 'status-off'}>DEG</span>
        <span className={!isDeg ? 'status-on' : 'status-off'}>RAD</span>
        <span className={hasMemory ? 'status-on' : 'status-off'}>M</span>
      </div>
      <div className="display-expression">{expression || ' '}</div>
      <div className={`display-value ${sizeClass}`}>{displayValue}</div>
    </div>
  );
}
