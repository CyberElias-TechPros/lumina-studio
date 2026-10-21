# Activate connected Android notifications

## What is connected in source

Phone notifications now has Enable, Reconnect signed-in account, Send test to my
connected phones, Disable/removal and Android settings controls. A native-only
controller uses the existing WebView HttpOnly session cookie against the exact
configured HTTPS API origin. It never returns cookies, Firebase tokens or device
proof to JavaScript or follows API redirects.

Installation UUID/256-bit random proof live in Android's no-backup directory;
app backup is disabled. Only the session cookie is forwarded, not unrelated
cookies. Requests are serialized, time-limited and responses capped at 8 KiB.
The debug clipboard token button has been removed.

Foreground checks detect changed cookies/tokens at most once per minute. An
unchanged successful binding does not write again. Firebase rotation invalidates
that binding cache; synchronization happens on the next foreground check, not
as a guaranteed background job. Offline removal stays pending for retry; local
notification display stops immediately. Previously Firebase-only opt-ins require
an explicit Enable/Reconnect action before account binding is allowed.

The self-test may notify multiple eligible phones on the signed-in account; its
button says so. Preferences/quiet hours still apply. Firebase acceptance is not
proof of display. Automatic class/message event-triggered alerts remain pending.

## Deployment status update

The owner subsequently supplied a successful deployment log for source `d23f900`:
migration 0068 applied, Firebase secret uploaded with its value hidden, exact
Worker revision/DB health verified, and 878 backend tests passed. The immediate
owner deployment/configuration step is complete. Live phone delivery still needs
physical-device verification. The earlier integration permission restriction below
describes this agent's access, not a missing production deployment.

## Earlier deployment access blocker

The Arena GitHub integration returned **403 Resource not accessible by
integration** for both Actions secret listing and workflow dispatch. This does
not establish whether the secrets already exist. It means this session cannot
inspect/configure those secrets or start deployment through that connection.
At the time of the failed dispatch, no production deployment or migration had been performed by the agent. The owner subsequently completed it as noted above.

An owner can complete the following in GitHub, or grant the integration the
appropriate Actions/secrets permissions and reconnect it in Arena. Do not paste
any credential into chat.

## Owner-only activation steps

1. Open repository **Settings → Secrets and variables → Actions**:
   https://github.com/CyberElias-TechPros/lumina-studio/settings/secrets/actions
2. Confirm `CF_API_TOKEN` and `CF_ACCOUNT_ID` exist for the configured Cloudflare
   account. The token needs the deployment/Worker-secret and D1 permissions used
   by this repository; do not substitute an unrestricted global account key.
3. Add `FCM_SERVICE_ACCOUNT_JSON`, containing the Firebase service-account JSON
   for project `cyber-elias-academy-app`, directly in that secure secrets screen.
   Alternatively configure that secret on the existing Worker through secure
   Cloudflare settings; the workflow checks for its presence when no GitHub copy
   is supplied. The Android `google-services.json` is NOT this credential.
   Use a dedicated least-privilege sender account with FCM sending permission.
   Follow your organization's key policy; never commit or upload its private key
   to this conversation. A pre-existing Worker secret is checked by name only;
   actual permission/provider verification still requires a controlled test.
4. Once branch CI is green, open **Actions → Deploy backend → Run workflow**:
   https://github.com/CyberElias-TechPros/lumina-studio/actions/workflows/deploy-backend.yml
   Select `arena/df91cdba-lumina-studio` and keep **require_fcm** enabled.
5. The workflow validates configuration, runs backend regression tests, applies
   outstanding migrations, uploads/deploys a source-tagged Worker version and
   verifies `/v1/health` returns that exact commit plus DB health. It preserves
   existing cron triggers and dashboard variables. It does not swallow deployment
   failures or treat an older healthy Worker as proof the new code deployed.
   Uploaded secrets are additive, held in a restricted runner-temp file and
   deleted in the workflow's final cleanup step. No test message is auto-sent.
6. Install the successful Android debug APK, sign in, open CEA menu → Phone
   notifications, choose Enable, grant permission and wait for account connection.
   Choose Send test to my connected phones. Test foreground/background, tapping,
   account switching and disabling on a physical Google Play-services device.

There is no need to merge the entire PR merely to run this explicitly selected
branch deployment. The app remains a debug candidate, not a signed Play release.
Google Play/direct signed distribution still needs the separate owner-controlled
signing environment, App Links certificate association and release-policy/device
acceptance checks. Those credentials must also remain out of chat and Git.
