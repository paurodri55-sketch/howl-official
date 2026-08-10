/**
 * Fecha de estreno de HOWL — pasarela de pago real y primer drop.
 * Ver memoria de proyecto "HOWL Launch Date" para el porqué de esta fecha.
 */
export const LAUNCH_DATE = new Date("2026-11-21T00:00:00+01:00");

export function getDaysUntilLaunch(): number {
  const now = new Date();
  const diffMs = LAUNCH_DATE.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

/**
 * Decisión de Pau (2026-08-10): coming-soon total hasta LAUNCH_DATE, nada
 * comprable de verdad antes de esa fecha. Fuente única de verdad para el
 * gate de checkout, tanto en el cliente (UI) como en el servidor (API).
 */
export function isPreLaunch(): boolean {
  return Date.now() < LAUNCH_DATE.getTime();
}
