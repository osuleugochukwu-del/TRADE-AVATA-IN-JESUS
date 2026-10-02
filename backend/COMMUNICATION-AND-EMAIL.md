# Trade Avata Communication Layer

Visitors can open support chat without registering. The chat is text-only and has no uploads or community features. Admins/staff see unread/open/resolved conversations and the admin identity on replies. Important admin actions are written to audit logs; audit logs cannot be updated or deleted through Firestore rules. Resolved conversations are eligible for scheduled cleanup according to `siteSettings/global.supportRetentionDays` (default 7 days); unresolved conversations are retained.

Admins can create reusable email templates and queue campaigns for all registered users, students, or selected email addresses. Delivery uses the Trade Avata server-side email transport boundary; Firestore is the queue/data layer, not the mail transport. No provider is required for the zero-cost build/test mode.

Trade Avata does not implement a public community feed, trader-to-trader chat, file sharing, or community rooms. A separate Telegram/community product can be used if desired.

## Provider-agnostic email architecture

The application now separates **email composition/queueing** from **email transport**. Firestore `mail` documents are the queue/data layer. The `processEmailQueue` Cloud Function is the transport boundary.

### Current zero-cost mode

The default configuration is `EMAIL_PROVIDER=none`, `EMAIL_ENABLED=false`, and `EMAIL_DRY_RUN=true`. The site can therefore be built, tested and uploaded without buying a mailbox or adding an email-provider key. Queue records and safe email logs can still be exercised.

### Future providers

The server transport supports SMTP and Resend through the same `sendEmail({ to, subject, html, text })` interface. Provider credentials are server-side environment/secrets only. The frontend never receives SMTP passwords or provider API keys.

### Domain later

No production domain is hard-coded. When the domain is purchased, configure `APP_URL`/`FRONTEND_URL`, the sender address, and the selected provider. Incoming routing (for example `support@DOMAIN`) is a separate DNS/email-routing concern from outbound transactional delivery.

### Managed email template library

Admin > Email Center ships with a reusable branded template library covering account, security, orders, products, learning, support, Copy Trading, platform notices and campaigns. The current defaults include: `welcome`, `welcome_back`, `verify_email`, `password_reset`, `password_changed`, `security_alert`, `session_notice`, `purchase_confirmation`, `payment_success`, `payment_failed`, `refund_processed`, `product_access`, `product_update`, `course_enrollment`, `course_continue`, `course_completed`, `certificate_ready`, `support_received`, `support_reply`, `support_closed`, `contact_notification`, `support_notification`, `copy_master_approved`, `copy_capacity_changed`, `copy_warning`, `maintenance_notice`, `privacy_terms_update`, `system_notice`, `newsletter`, and `promotion`.

Templates support variables such as `{{firstName}}`, `{{productName}}`, `{{orderNumber}}`, `{{amount}}`, `{{courseName}}`, `{{ticketNumber}}`, `{{resetUrl}}`, `{{verificationUrl}}`, `{{capacity}}`, and `{{actionUrl}}`. Admin can enable/disable, edit, duplicate, preview and test templates without editing source code.

### Social media controls

Admin > Social Media stores one central list of public social channels. Each platform has a URL, enabled/disabled state and display order. The footer and Contact/Support page read the same setting, so hiding Facebook or LinkedIn in Admin hides it everywhere without a code change. Before Firebase is connected, the Admin editor can save a local draft for frontend testing; Firebase later becomes the shared source of truth.

### Logging

`emailLogs` records type, recipient count, subject, status, provider, dry-run state, timestamps and bounded error text. Secrets and message bodies are not stored in the log.
