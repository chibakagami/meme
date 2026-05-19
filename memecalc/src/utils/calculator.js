import { create, all } from 'mathjs';

export function evaluateExpression(expr, isDeg) {
  const math = create(all);

  if (isDeg) {
    // Override trig functions to accept degrees instead of radians
    math.import(
      {
        sin: (x) => Math.sin((x * Math.PI) / 180),
        cos: (x) => Math.cos((x * Math.PI) / 180),
        tan: (x) => Math.tan((x * Math.PI) / 180),
      },
      { override: true }
    );
  }

  // Transform display notation to mathjs syntax (order matters)
  const sanitized = expr
    .replace(/=+$/, '')                              // strip trailing =
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/π/g, 'pi')
    .replace(/√\(/g, 'sqrt(')
    .replace(/log\(/g, 'log10(')                     // log button = base-10
    .replace(/ln\(/g, 'log(')                        // ln button = natural log
    .replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');      // percent as fraction

  const result = math.evaluate(sanitized);

  if (typeof result === 'object' && result.toNumber) {
    return result.toNumber();
  }
  return Number(result);
}

export function formatResult(num) {
  if (isNaN(num) || !isFinite(num)) return 'Error';

  const abs = Math.abs(num);

  // Use exponential for very large or very small values
  if ((abs >= 1e10 || (abs < 1e-7 && abs > 0))) {
    return parseFloat(num.toPrecision(8)).toExponential();
  }

  // Round to 10 significant figures to eliminate float artifacts
  const rounded = parseFloat(num.toPrecision(10));
  return rounded.toString();
}
