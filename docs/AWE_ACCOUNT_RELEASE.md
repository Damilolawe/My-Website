# Customer accounts, owner dashboard, drafts and checkout — release checklist

## Verified preconditions

At the time of the October 22, 2026 read-only AWE project inspection:
- Supabase Auth user count: **0**
- Entries in `public.awe_owner`: **0**
- Orders, uploaded assets, rendered versions: **0**
- Enabled AWE pricing packages: **0**

The `awe-api` Edge Function **exists**, but this state does not demonstrate that customer signup, authorization, draft save, uploading or checkout work end-to-end. No fake accounts, business prices or paid services were provisioned.

## Next actions in order

1. **Confirm deployed Firebase URL and CORS origin.** In Supabase Edge Function server-only secrets, authorize exactly the real Firebase origin (no wildcard). Review any `ALLOWED_ORIGINS` values. Keep private Supabase/service-role keys off all public HTML and JavaScript.
2. **Connect Supabase Auth to the frontend.** The original `app/common.mjs` still assumes the same-origin `/api/` Netlify cookie API. Firebase Hosting Classic Spark cannot serve that API. Use Supabase's supported Auth client and a cross-origin Bearer-token Edge Function client with strict credentials policy, suitable token persistence/refresh, and logout semantics. Do not treat a successful login screen as proof of protected server authorization.
3. **Create the owner identity safely.** First complete a real sign-in and verify email ownership. Obtain that account's *actual Supabase auth user UUID* from the dashboard. As a privileged administrator, add this **one exact verified UUID** to `public.awe_owner(user_id)` via SQL Editor, or securely set `OWNER_USER_ID` as a private Edge Function environment value. Never grant owner access based solely on a customer-editable profile field or email text. Check the admin overview from that signed-in account and verify a different test account is denied.
4. **Test draft creation/ownership.** Using two independent verified test accounts, create/sync a draft, refresh and resume it, simulate version conflicts, reject foreign-owner IDs, and confirm updates to paid/locked orders are rejected. No service-role key may be included in browser code.
5. **Test customer materials.** Upload small valid JPEG, PNG, PDF and DOCX files. Reject spoofed MIME types, oversize files, unauthorized asset IDs, and wrong-user access. Verify private storage is not public. Confirm returned images and ZIP exports use safe content-disposition and no cached private URLs.
6. **Test owner previews.** The admin owner-preview `iframe` must receive validated HTML via the authenticated API, and display it through a restrictive `srcdoc` sandbox. Private images may require token-based blob fetching or an explicitly authorized asset route; direct Firebase `/api/assets/*` and `/sites/*` links are not functional until migrated and tested.
7. **Checkout remains test-only and disabled.** Keep `ORDERS_ENABLED=false` until the business establishes package prices, hosting period, ownership, revisions, terms, support contact and retention policy. Verify Stripe's test checkout/verified webhook path (including asynchronous or duplicated events and refunds); reject `livemode=true`. Production credentials and real charges require explicit owner approval.
8. **Publishing is a separate permission gate.** Verify saved versions are only published after owner approval and that published customer content is isolated from unapproved drafts. Test public asset URL rewriting and custom-site routing under Firebase/Supabase.
9. **Verify deployed behavior.** Use live deployed URLs and actual browser sessions, not only unit tests. Validate mobile, errors, input feedback, unauthorized access, CSP/CORS, account logout, test payment, scheduled processing and contact inquiry handling.
10. **Coordinate releases.** Another Work session owns the Firebase deployment. Keep this branch unmerged until it finishes and reconcile any changes to Edge Function version, security settings and API contracts.

## Owner enrollment reference (run only with verified user UUID)

Example for the Supabase SQL Editor, as a privileged, reviewed operation. Replace `REPLACE_WITH_VERIFIED_OWNER_UUID` with the real authenticated user UUID **only after** signing in and confirming the user's email. Never execute it using a customer-supplied identifier.

```sql
insert into public.awe_owner (user_id)
select id from auth.users
where id = 'REPLACE_WITH_VERIFIED_OWNER_UUID'::uuid
  and email_confirmed_at is not null
on conflict (user_id) do nothing;
```

If no row was inserted, do not weaken authorization: complete verified sign-in first and inspect the actual owner user UUID. Never share keys or authentication codes in chat.
