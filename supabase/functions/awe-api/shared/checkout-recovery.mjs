/**
 * Checkout reservations are immutable once checkout_at is set.
 * Stripe idempotency keys can be pruned after 24 hours, so never blindly
 * recreate a session for an older or invalid reservation.
 */
export const CHECKOUT_RETRY_WINDOW_MS = 20 * 60 * 60 * 1000;

export function checkoutReservationState(order, nowMs = Date.now()) {
  if (!order?.checkout_at) return "new";
  const reservedAt = Date.parse(order.checkout_at);
  if (
    !Number.isFinite(reservedAt) ||
    reservedAt > nowMs ||
    nowMs - reservedAt >= CHECKOUT_RETRY_WINDOW_MS
  ) return "manual-review";
  return "retry";
}

export function checkoutPackageIsValid(p) {
  return Boolean(
    p &&
    typeof p.name === "string" &&
    p.name.trim() &&
    Number.isInteger(p.amount) &&
    p.amount > 0 &&
    p.amount <= 1000000 &&
    ["usd", "eur", "gbp", "cad", "aud"].includes(p.currency) &&
    ["hosting", "ownership", "revisions", "termsVersion"].every(
      (key) => typeof p[key] === "string" && p[key].trim(),
    )
  );
}
