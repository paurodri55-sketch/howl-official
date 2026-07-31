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
