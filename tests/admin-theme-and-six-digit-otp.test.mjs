import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL("../" + path, import.meta.url), "utf8");

test("owner dashboard loads a dedicated homepage-inspired dark studio skin", async () => {
  const [admin, theme, homepage, build] = await Promise.all([
    read("admin.html"), read("app/admin-theme.css"), read("styles.css"), read("scripts/build.mjs")
  ]);
  assert.match(admin, /<body class="admin-dashboard">/);
  assert.match(admin, /href="\/app\/app\.css"><link rel="stylesheet" href="\/app\/admin-theme\.css"/);
  assert.match(theme, /\.admin-dashboard\s*\{/);
  for (const color of ["#0c0d10", "#f1efe8", "#d1fa57"]) {
    assert.ok(homepage.includes(color) && theme.includes(color), "Studio should share homepage color " + color);
  }
  assert.match(theme, /\.admin-dashboard \.intro h1/);
  assert.match(theme, /\.admin-dashboard \.stat/);
  assert.match(theme, /\.admin-dashboard \.split/);
  assert.match(build, /"app"/); // App directory is copied wholesale to Firebase dist.
  assert.doesNotMatch(theme, /(?:\.template-art|\.theater-viewport)\s*\{/,
    "Owner styles must not leak into customer template artwork");
});

test("admin and client builder previews move with the page, not sticky-scroll", async () => {
  const [styles, admin, account, order] = await Promise.all([
    read("app/app.css"), read("app/admin.html").catch(() => read("admin.html")),
    read("app/account.mjs"), read("order.html")
  ]);
  assert.match(styles, /\.preview-shell\s*\{[^}]*position:\s*static;[^}]*top:\s*auto;/s);
  assert.match(admin, /admin-theme\.css/);
  assert.match(order, /href="\/app\/app\.css"/);
  assert.match(account, /data-preview-frame/);
  assert.match(account, /sandbox=\\"\\"/);
});

test("customer and owner email OTP entry and shared verification require exactly six digits", async () => {
  const [customer, owner, client] = await Promise.all([
    read("app/common.mjs"), read("app/admin.mjs"), read("app/service-client.mjs")
  ]);
  for (const [name, source] of [["customer", customer], ["owner", owner]]) {
    assert.ok(source.includes('pattern="[0-9]{6}" minlength="6" maxlength="6"'),
      name + " code field should accept exactly six digits");
    assert.ok(!source.includes('maxlength="10"'), name + " must not allow ten-digit OTP");
  }
  assert.ok(client.includes('/^\\d{6}$/.test(token.trim())'),
    "Shared authentication service should reject shorter and longer codes");
  assert.ok(client.includes('type: "email"'), "Preserve Supabase email OTP type");
  assert.ok(client.includes('fail("Enter the six-digit code from your email.")'));
});
