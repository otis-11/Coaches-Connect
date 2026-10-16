# Project status

Updated: 2026-10-15

## Purpose
CoachConnect professional coaching network prototype with signup, profiles, feeds, messages, opportunities, and an admin interface.

## Current progress
Preserved 7 selected local source/planning paths on `recovery/2026-10-15-local-coaches-connect`; this branch is for review, not automatic deployment.
Source checkout base: `d8595a93face`.

## Important decisions
- Local work adds server-side signup and admin user creation with Supabase service role; keep key server-side.
- Existing design is marked locked in baseline commit; preserve UI design.

## Unresolved problems
- CRITICAL: public signup copies arbitrary extra fields into a service-role inserted profile, so a caller can set is_admin/role and override id.
- CRITICAL: profile INSERT/UPDATE policies constrain row id but not privileged columns; a user can promote their own is_admin/role unless column permissions are separately restricted.
- Public signup uses admin.createUser with email_confirm=true, bypassing ownership verification, and no rate limit is present in this handler.
- Migration has not been applied or validated during this review; do not deploy auth changes as completed work.

## Verification
PASS: node node_modules/typescript/bin/tsc --noEmit --incremental false (exit 0). Security findings remain; type checking does not validate authorization.
New staged files passed Gitleaks with full redaction before commit. Originals were not changed.

## Next steps
1. Replace arbitrary extra copying with an explicit profile-field allowlist and server-owned privileged fields.
2. Restrict privileged profile columns and verify RLS with ordinary-user escalation tests.
3. Review email verification, rate limiting, and onboarding before merge/deployment.

## Linux setup
Use npm ci, then npm run dev. Supply Supabase URL, public key and server-only service-role key privately. Do not apply the preserved migration until privilege-escalation defects are fixed.
