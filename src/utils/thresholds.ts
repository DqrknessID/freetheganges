/**
 * src/utils/thresholds.ts
 *
 * Domain logic for environmental standards threshold evaluation and
 * multi-location delta calculations across the Ganges-Brahmaputra-Meghna basin.
 * Decoupled from test runners so it can be safely imported by any module.
 */

export interface ThresholdEvaluationResult {
  status: 'Compliant' | 'Warning' | 'Critical';
  exceeded: boolean;
  displayValue: string;
}

export interface ComparisonDeltaResult {
  delta: number | null;
  displayDelta: string;
  valid: boolean;
}

/**
 * Evaluates an environmental telemetry measurement against standard limits.
 * Strictly guards against JavaScript type coercion (e.g. empty strings "" or booleans
 * evaluating as 0 via isNaN/Number coercion).
 *
 * @param value Telemetry measurement value
 * @param threshold Prescribed standard limit
 * @param direction 'max' if lower is better (e.g. BOD, Arsenic), 'min' if higher is better (e.g. DO)
 */
export function evaluateThreshold(
  value: number | null | undefined,
  threshold: number,
  direction: 'max' | 'min'
): ThresholdEvaluationResult {
  // Strict numeric guard: non-numeric falsy values ("", false), null, undefined, and NaN
  // must evaluate to missing data ('N/D') and not coerce to numeric 0.
  if (value === null || value === undefined || typeof value !== 'number' || isNaN(value)) {
    return { status: 'Warning', exceeded: false, displayValue: 'N/D' };
  }

  let exceeded = false;
  if (direction === 'max') {
    exceeded = value > threshold;
  } else {
    exceeded = value < threshold;
  }

  let status: 'Compliant' | 'Warning' | 'Critical' = 'Compliant';
  if (exceeded) {
    if (direction === 'max') {
      status = value > threshold * 2 ? 'Critical' : 'Warning';
    } else {
      status = value < threshold * 0.5 ? 'Critical' : 'Warning';
    }
  }

  return { status, exceeded, displayValue: `${value}` };
}

/**
 * Calculates comparative delta between primary and secondary monitoring locations.
 * Strictly checks that both inputs are real numbers to avoid false zero comparisons.
 *
 * @param primaryVal Measurement value from primary station
 * @param secondaryVal Measurement value from comparative station
 */
export function calculateComparisonDelta(
  primaryVal: number | null | undefined,
  secondaryVal: number | null | undefined
): ComparisonDeltaResult {
  if (
    primaryVal === null ||
    primaryVal === undefined ||
    typeof primaryVal !== 'number' ||
    isNaN(primaryVal) ||
    secondaryVal === null ||
    secondaryVal === undefined ||
    typeof secondaryVal !== 'number' ||
    isNaN(secondaryVal)
  ) {
    return { delta: null, displayDelta: 'N/D', valid: false };
  }

  const delta = Math.round((primaryVal - secondaryVal) * 100) / 100;
  const sign = delta > 0 ? '+' : '';
  return { delta, displayDelta: `${sign}${delta}`, valid: true };
}
