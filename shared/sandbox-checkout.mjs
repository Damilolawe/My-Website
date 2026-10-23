// Controlled launch QA stays closed to the public and expires automatically.
export function sandboxCustomerAllowed(pkg, user, settings, now = Date.now()) {
  return settings.STRIPE_SECRET_KEY?.startsWith("sk_test_") === true &&
    pkg?.testOnly === true && pkg?.enabled === true &&
    pkg?.amount === 100 && pkg?.currency === "usd" &&
    typeof pkg?.testCustomerId === "string" && pkg.testCustomerId === user?.id &&
    typeof pkg?.testOrderId === "string" && pkg.testOrderId.length === 36 &&
    Number.isFinite(Date.parse(pkg.testExpiresAt)) &&
    Date.parse(pkg.testExpiresAt) > now;
}
export function sandboxOrderAllowed(pkg, user, orderId, settings, now = Date.now()) {
  return sandboxCustomerAllowed(pkg, user, settings, now) &&
    pkg.testOrderId === orderId;
}

