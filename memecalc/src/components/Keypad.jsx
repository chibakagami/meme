import Button from './Button';

// 5-column layout, 8 rows (40 cells; last row uses span-2 for 0 and =)
const BUTTONS = [
  // Row 1 — memory + mode
  { label: 'MC',  type: 'memory' },
  { label: 'MR',  type: 'memory' },
  { label: 'M+',  type: 'memory' },
  { label: 'M-',  type: 'memory' },
  { label: 'DEG', type: 'mode', id: 'deg' },

  // Row 2 — misc functions
  { label: '(',   type: 'scientific' },
  { label: ')',   type: 'scientific' },
  { label: 'n!',  type: 'scientific' },
  { label: '%',   type: 'operation' },
  { label: 'AC',  type: 'clear' },

  // Row 3 — trig
  { label: 'sin', type: 'scientific' },
  { label: 'cos', type: 'scientific' },
  { label: 'tan', type: 'scientific' },
  { label: 'log', type: 'scientific' },
  { label: 'ln',  type: 'scientific' },

  // Row 4 — power / constants
  { label: '√',   type: 'scientific' },
  { label: 'x²',  type: 'scientific' },
  { label: 'xʸ',  type: 'scientific' },
  { label: 'π',   type: 'scientific' },
  { label: 'e',   type: 'scientific' },

  // Row 5
  { label: '7',   type: 'number' },
  { label: '8',   type: 'number' },
  { label: '9',   type: 'number' },
  { label: '÷',   type: 'operation' },
  { label: '⌫',   type: 'clear' },

  // Row 6
  { label: '4',   type: 'number' },
  { label: '5',   type: 'number' },
  { label: '6',   type: 'number' },
  { label: '×',   type: 'operation' },
  { label: '±',   type: 'operation' },

  // Row 7
  { label: '1',   type: 'number' },
  { label: '2',   type: 'number' },
  { label: '3',   type: 'number' },
  { label: '-',   type: 'operation' },
  { label: '+',   type: 'operation' },

  // Row 8 — 0 and = each span 2 columns (total: 2+1+2 = 5)
  { label: '0',   type: 'number',  span: 2 },
  { label: '.',   type: 'number' },
  { label: '=',   type: 'equals',  span: 2 },
];

export default function Keypad({ onButton, isDeg }) {
  return (
    <div className="keypad">
      {BUTTONS.map((btn, i) => {
        // DEG button shows current active mode label
        const displayLabel = btn.id === 'deg' ? (isDeg ? 'DEG' : 'RAD') : btn.label;
        return (
          <Button
            key={i}
            label={displayLabel}
            type={btn.type}
            span={btn.span}
            onPress={() => onButton(btn.label, btn.type)}
          />
        );
      })}
    </div>
  );
}
