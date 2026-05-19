import { useState, useCallback, useEffect } from 'react';
import Display from './Display';
import Keypad from './Keypad';
import { evaluateExpression, formatResult } from '../utils/calculator';
import { getRandomMeme } from '../utils/memeVideos';

const OPERATORS = ['+', '-', '×', '÷'];
const FUNCTIONS = ['sin', 'cos', 'tan', 'log', 'ln'];

// Extract trailing numeric segment from an expression string
function trailingNumber(expr) {
  const m = expr.match(/[\d.]+$/);
  return m ? m[0] : null;
}

const BOOT_STEPS = ['BOOTING...', 'CALC OS v2.4.1', 'READY'];

export default function Calculator() {
  const [expression, setExpression]   = useState('');
  const [displayValue, setDisplayValue] = useState('0');
  const [isDeg, setIsDeg]             = useState(true);
  const [memory, setMemory]           = useState(0);
  const [hasMemory, setHasMemory]     = useState(false);
  // afterCalc: true right after = press, so next digit starts fresh
  const [afterCalc, setAfterCalc]     = useState(false);
  // bootStep: 0-2 show boot messages, 3 = calculator ready
  const [bootStep, setBootStep]       = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setBootStep(1), 500);
    const t2 = setTimeout(() => setBootStep(2), 1000);
    const t3 = setTimeout(() => setBootStep(3), 1500);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  const handleButton = useCallback((label) => {
    // ── Digits 0–9 ────────────────────────────────────────────
    if (/^[0-9]$/.test(label)) {
      if (afterCalc) {
        setExpression(label);
        setDisplayValue(label);
        setAfterCalc(false);
        return;
      }
      const newExpr = expression + label;
      setExpression(newExpr);
      setDisplayValue(trailingNumber(newExpr) ?? label);
      return;
    }

    // ── Decimal point ──────────────────────────────────────────
    if (label === '.') {
      if (afterCalc) {
        setExpression('0.');
        setDisplayValue('0.');
        setAfterCalc(false);
        return;
      }
      // Prevent multiple decimals in the same number
      const tail = trailingNumber(expression) ?? '';
      if (tail.includes('.')) return;
      const newExpr = expression + (tail === '' ? '0.' : '.');
      setExpression(newExpr);
      setDisplayValue(trailingNumber(newExpr) ?? '0.');
      return;
    }

    // ── All Clear ──────────────────────────────────────────────
    if (label === 'AC') {
      setExpression('');
      setDisplayValue('0');
      setAfterCalc(false);
      return;
    }

    // ── Backspace ──────────────────────────────────────────────
    if (label === '⌫') {
      if (afterCalc) {
        setExpression('');
        setDisplayValue('0');
        setAfterCalc(false);
        return;
      }
      const newExpr = expression.slice(0, -1);
      setExpression(newExpr);
      setDisplayValue(trailingNumber(newExpr) ?? '0');
      return;
    }

    // ── Equals (prank trigger) ─────────────────────────────────
    if (label === '=') {
      if (!expression) return;
      try {
        const result = evaluateExpression(expression, isDeg);
        const resultStr = formatResult(result);
        setDisplayValue(resultStr);
        setExpression(expression + ' =');
        setAfterCalc(true);
        // Show result briefly, then redirect to a meme
        setTimeout(() => {
          window.location.href = getRandomMeme();
        }, 800);
      } catch {
        setDisplayValue('Error');
        setExpression('');
        setAfterCalc(true);
      }
      return;
    }

    // ── Basic operators ────────────────────────────────────────
    if (OPERATORS.includes(label)) {
      if (afterCalc) {
        // Continue from previous result
        setExpression(displayValue + label);
        setDisplayValue('0');
        setAfterCalc(false);
        return;
      }
      // Replace a trailing operator rather than stack them
      const newExpr = expression.replace(/[+\-×÷]$/, '') + label;
      setExpression(newExpr);
      setDisplayValue('0');
      return;
    }

    // ── Prefix functions: sin, cos, tan, log, ln ───────────────
    if (FUNCTIONS.includes(label)) {
      const token = label + '(';
      if (afterCalc) {
        setExpression(token);
        setDisplayValue(label);
        setAfterCalc(false);
        return;
      }
      setExpression(expression + token);
      setDisplayValue(label);
      return;
    }

    // ── Square root ────────────────────────────────────────────
    if (label === '√') {
      if (afterCalc) {
        setExpression('√(');
        setDisplayValue('√');
        setAfterCalc(false);
        return;
      }
      setExpression(expression + '√(');
      setDisplayValue('√');
      return;
    }

    // ── x² ────────────────────────────────────────────────────
    if (label === 'x²') {
      setExpression(expression + '^2');
      setDisplayValue('^2');
      return;
    }

    // ── xʸ ────────────────────────────────────────────────────
    if (label === 'xʸ') {
      setExpression(expression + '^(');
      setDisplayValue('^');
      return;
    }

    // ── Factorial ──────────────────────────────────────────────
    if (label === 'n!') {
      setExpression(expression + '!');
      setDisplayValue('!');
      return;
    }

    // ── Percent ────────────────────────────────────────────────
    if (label === '%') {
      setExpression(expression + '%');
      setDisplayValue(displayValue + '%');
      return;
    }

    // ── Pi ────────────────────────────────────────────────────
    if (label === 'π') {
      const val = '3.14159265';
      if (afterCalc) { setExpression('π'); setDisplayValue(val); setAfterCalc(false); return; }
      setExpression(expression + 'π');
      setDisplayValue(val);
      return;
    }

    // ── Euler's number ─────────────────────────────────────────
    if (label === 'e') {
      const val = '2.71828182';
      if (afterCalc) { setExpression('e'); setDisplayValue(val); setAfterCalc(false); return; }
      setExpression(expression + 'e');
      setDisplayValue(val);
      return;
    }

    // ── Parentheses ────────────────────────────────────────────
    if (label === '(' || label === ')') {
      if (afterCalc) { setExpression(label); setDisplayValue(label); setAfterCalc(false); return; }
      setExpression(expression + label);
      setDisplayValue(label);
      return;
    }

    // ── Plus/minus (negate current number) ────────────────────
    if (label === '±') {
      const tail = trailingNumber(expression);
      if (!tail) return;
      const idx = expression.lastIndexOf(tail);
      const before = expression.slice(0, idx);
      if (before.endsWith('-') && !before.endsWith('×-') && !before.endsWith('÷-')) {
        // Remove the negative sign
        const newExpr = before.slice(0, -1) + tail;
        setExpression(newExpr);
        setDisplayValue(tail);
      } else {
        const newExpr = before + '-' + tail;
        setExpression(newExpr);
        setDisplayValue('-' + tail);
      }
      return;
    }

    // ── Memory clear ───────────────────────────────────────────
    if (label === 'MC') {
      setMemory(0);
      setHasMemory(false);
      return;
    }

    // ── Memory recall ──────────────────────────────────────────
    if (label === 'MR') {
      const memStr = formatResult(memory);
      if (afterCalc) {
        setExpression(memStr); setDisplayValue(memStr); setAfterCalc(false);
      } else {
        setExpression(expression + memStr);
        setDisplayValue(memStr);
      }
      return;
    }

    // ── Memory add / subtract ──────────────────────────────────
    if (label === 'M+' || label === 'M-') {
      try {
        const val = evaluateExpression(expression || displayValue, isDeg);
        const sign = label === 'M+' ? 1 : -1;
        setMemory((prev) => prev + sign * val);
        setHasMemory(true);
      } catch { /* ignore eval errors */ }
      return;
    }

    // ── DEG / RAD toggle ───────────────────────────────────────
    if (label === 'DEG') {
      setIsDeg((prev) => !prev);
      return;
    }
  }, [expression, displayValue, isDeg, memory, afterCalc]);

  const isBooting = bootStep < 3;

  return (
    <div className={`calculator ${isBooting ? '' : 'calc-ready'}`}>
      <Display
        expression={expression}
        displayValue={displayValue}
        isDeg={isDeg}
        hasMemory={hasMemory}
        bootMessage={isBooting ? BOOT_STEPS[bootStep] : null}
      />
      {/* Hide keypad during boot */}
      {!isBooting && <Keypad onButton={handleButton} isDeg={isDeg} />}
    </div>
  );
}
