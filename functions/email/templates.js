const escapeHtml = value => String(value ?? '')
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');

export const EMAIL_TEMPLATE_TYPES = Object.freeze([
  'welcome','welcome_back','verify_email','password_reset','password_changed','security_alert','session_notice',
  'purchase_confirmation','payment_success','payment_failed','refund_processed','product_access','product_update',
  'course_enrollment','course_continue','course_completed','certificate_ready','support_received','support_reply','support_closed',
  'contact_notification','support_notification','copy_master_approved','copy_capacity_changed','copy_warning','maintenance_notice',
  'privacy_terms_update','system_notice','newsletter','promotion','test','campaign'
]);

const fallback = {
  "welcome": {
    "key": "welcome",
    "name": "Welcome",
    "category": "Account",
    "subject": "Welcome to Trade Avata",
    "preheader": "Welcome to Trade Avata",
    "headline": "Welcome to Trade Avata",
    "body": "Hello {{firstName}}, your Trade Avata account is ready. You can now explore your learning, products, Analytics and Journal from one place.",
    "ctaLabel": "Open Trade Avata",
    "ctaUrl": "{{appUrl}}",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "transactional"
  },
  "welcome_back": {
    "key": "welcome_back",
    "name": "Welcome Back",
    "category": "Account",
    "subject": "Welcome back to Trade Avata",
    "preheader": "Welcome back to Trade Avata",
    "headline": "Welcome back",
    "body": "Hello {{firstName}}, welcome back. Continue from where you stopped and review anything that needs your attention.",
    "ctaLabel": "Continue",
    "ctaUrl": "{{appUrl}}",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "transactional"
  },
  "verify_email": {
    "key": "verify_email",
    "name": "Verify Email",
    "category": "Account",
    "subject": "Verify your Trade Avata email",
    "preheader": "Verify your Trade Avata email",
    "headline": "Confirm your email",
    "body": "Hello {{firstName}}, confirm this email address to finish setting up your Trade Avata account.",
    "ctaLabel": "Verify email",
    "ctaUrl": "{{verificationUrl}}",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "transactional"
  },
  "password_reset": {
    "key": "password_reset",
    "name": "Password Reset",
    "category": "Account",
    "subject": "Reset your Trade Avata password",
    "preheader": "Reset your Trade Avata password",
    "headline": "Reset your password",
    "body": "We received a password reset request for {{email}}. If this was you, use the button below.",
    "ctaLabel": "Reset password",
    "ctaUrl": "{{resetUrl}}",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "transactional"
  },
  "password_changed": {
    "key": "password_changed",
    "name": "Password Changed",
    "category": "Security",
    "subject": "Your Trade Avata password was changed",
    "preheader": "Your Trade Avata password was changed",
    "headline": "Password changed",
    "body": "Your Trade Avata password was changed successfully. If you did not make this change, contact support immediately.",
    "ctaLabel": "Contact support",
    "ctaUrl": "{{appUrl}}/contact/",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "transactional"
  },
  "security_alert": {
    "key": "security_alert",
    "name": "Security Alert",
    "category": "Security",
    "subject": "Security notice for your Trade Avata account",
    "preheader": "Security notice for your Trade Avata account",
    "headline": "Security notice",
    "body": "We detected an account event that may need your attention. Review your account and change your password if you do not recognize it.",
    "ctaLabel": "Review account",
    "ctaUrl": "{{appUrl}}/member/",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "transactional"
  },
  "session_notice": {
    "key": "session_notice",
    "name": "Session Notice",
    "category": "Security",
    "subject": "Your Trade Avata session ended",
    "preheader": "Your Trade Avata session ended",
    "headline": "Your session ended",
    "body": "For security, your Trade Avata session has ended. Sign in again to continue.",
    "ctaLabel": "Sign in",
    "ctaUrl": "{{appUrl}}/login/",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "transactional"
  },
  "purchase_confirmation": {
    "key": "purchase_confirmation",
    "name": "Purchase Confirmation",
    "category": "Orders",
    "subject": "Trade Avata purchase confirmed — {{productName}}",
    "preheader": "Trade Avata purchase confirmed — {{productName}}",
    "headline": "Purchase confirmed",
    "body": "Hello {{firstName}}, your order {{orderNumber}} for {{productName}} has been confirmed. Amount: {{currency}} {{amount}}.",
    "ctaLabel": "View purchase",
    "ctaUrl": "{{appUrl}}/member/",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "transactional"
  },
  "payment_success": {
    "key": "payment_success",
    "name": "Payment Successful",
    "category": "Orders",
    "subject": "Payment received for order {{orderNumber}}",
    "preheader": "Payment received for order {{orderNumber}}",
    "headline": "Payment received",
    "body": "Your payment for {{productName}} was received successfully. Your access will appear in your Trade Avata account.",
    "ctaLabel": "Open purchases",
    "ctaUrl": "{{appUrl}}/member/",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "transactional"
  },
  "payment_failed": {
    "key": "payment_failed",
    "name": "Payment Failed",
    "category": "Orders",
    "subject": "Payment issue for order {{orderNumber}}",
    "preheader": "Payment issue for order {{orderNumber}}",
    "headline": "Payment was not completed",
    "body": "We could not confirm payment for {{productName}}. No successful purchase has been recorded yet.",
    "ctaLabel": "Review order",
    "ctaUrl": "{{appUrl}}/member/",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "transactional"
  },
  "refund_processed": {
    "key": "refund_processed",
    "name": "Refund Processed",
    "category": "Orders",
    "subject": "Refund update for order {{orderNumber}}",
    "preheader": "Refund update for order {{orderNumber}}",
    "headline": "Refund processed",
    "body": "A refund update has been recorded for order {{orderNumber}}. Processing time may depend on the payment provider.",
    "ctaLabel": "View orders",
    "ctaUrl": "{{appUrl}}/member/",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "transactional"
  },
  "product_access": {
    "key": "product_access",
    "name": "Product Access",
    "category": "Products",
    "subject": "Your Trade Avata product is ready — {{productName}}",
    "preheader": "Your Trade Avata product is ready — {{productName}}",
    "headline": "Your product is ready",
    "body": "Your access to {{productName}} is now available in My Purchases.",
    "ctaLabel": "Open product",
    "ctaUrl": "{{appUrl}}/member/",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "transactional"
  },
  "product_update": {
    "key": "product_update",
    "name": "Product Update",
    "category": "Products",
    "subject": "Update available — {{productName}}",
    "preheader": "Update available — {{productName}}",
    "headline": "Product update available",
    "body": "A new update is available for {{productName}}. Review the release information before replacing your current version.",
    "ctaLabel": "View update",
    "ctaUrl": "{{appUrl}}/member/",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "transactional"
  },
  "course_enrollment": {
    "key": "course_enrollment",
    "name": "Course Enrollment",
    "category": "Learning",
    "subject": "You are enrolled — {{courseName}}",
    "preheader": "You are enrolled — {{courseName}}",
    "headline": "Course access ready",
    "body": "You now have access to {{courseName}}. Your progress will be saved as you learn.",
    "ctaLabel": "Start learning",
    "ctaUrl": "{{appUrl}}/member/",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "transactional"
  },
  "course_continue": {
    "key": "course_continue",
    "name": "Continue Learning",
    "category": "Learning",
    "subject": "Continue {{courseName}}",
    "preheader": "Continue {{courseName}}",
    "headline": "Continue where you stopped",
    "body": "Your course is waiting for you. Continue {{courseName}} from your saved progress.",
    "ctaLabel": "Resume course",
    "ctaUrl": "{{appUrl}}/member/",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "transactional"
  },
  "course_completed": {
    "key": "course_completed",
    "name": "Course Completed",
    "category": "Learning",
    "subject": "You completed {{courseName}}",
    "preheader": "You completed {{courseName}}",
    "headline": "Course completed",
    "body": "Congratulations {{firstName}}. Your completion of {{courseName}} has been recorded.",
    "ctaLabel": "View learning",
    "ctaUrl": "{{appUrl}}/member/",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "transactional"
  },
  "certificate_ready": {
    "key": "certificate_ready",
    "name": "Certificate Ready",
    "category": "Learning",
    "subject": "Your Trade Avata certificate is ready",
    "preheader": "Your Trade Avata certificate is ready",
    "headline": "Certificate ready",
    "body": "Your certificate for {{courseName}} is ready.",
    "ctaLabel": "View certificate",
    "ctaUrl": "{{certificateUrl}}",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "transactional"
  },
  "support_received": {
    "key": "support_received",
    "name": "Support Received",
    "category": "Support",
    "subject": "We received your Trade Avata support request",
    "preheader": "We received your Trade Avata support request",
    "headline": "We received your message",
    "body": "Hello {{firstName}}, your support request {{ticketNumber}} has been received. We will use this reference when replying.",
    "ctaLabel": "View support",
    "ctaUrl": "{{appUrl}}/member/",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "transactional"
  },
  "support_reply": {
    "key": "support_reply",
    "name": "Support Reply",
    "category": "Support",
    "subject": "Update on support request {{ticketNumber}}",
    "preheader": "Update on support request {{ticketNumber}}",
    "headline": "Support replied",
    "body": "There is a new reply on your Trade Avata support request {{ticketNumber}}.",
    "ctaLabel": "Open support",
    "ctaUrl": "{{appUrl}}/member/",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "transactional"
  },
  "support_closed": {
    "key": "support_closed",
    "name": "Support Closed",
    "category": "Support",
    "subject": "Support request {{ticketNumber}} closed",
    "preheader": "Support request {{ticketNumber}} closed",
    "headline": "Request closed",
    "body": "Your support request {{ticketNumber}} has been marked resolved. You can open a new request if you still need help.",
    "ctaLabel": "Open support",
    "ctaUrl": "{{appUrl}}/member/",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "transactional"
  },
  "contact_notification": {
    "key": "contact_notification",
    "name": "Admin Contact Alert",
    "category": "Platform",
    "subject": "New Trade Avata contact message",
    "preheader": "New Trade Avata contact message",
    "headline": "New contact message",
    "body": "A new public contact message has been received from {{displayName}} ({{email}}). Review the Support Inbox for the full message.",
    "ctaLabel": "Open Support Inbox",
    "ctaUrl": "{{appUrl}}/admin/support/",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "transactional"
  },
  "support_notification": {
    "key": "support_notification",
    "name": "Admin Support Alert",
    "category": "Platform",
    "subject": "New Trade Avata support message",
    "preheader": "New Trade Avata support message",
    "headline": "New support message",
    "body": "A visitor or member sent a new support message. Open the Support Inbox to review and reply.",
    "ctaLabel": "Open Support Inbox",
    "ctaUrl": "{{appUrl}}/admin/support/",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "transactional"
  },
  "copy_master_approved": {
    "key": "copy_master_approved",
    "name": "Master Approved",
    "category": "Copy Trading",
    "subject": "Your Trade Avata Master access is approved",
    "preheader": "Your Trade Avata Master access is approved",
    "headline": "Master access approved",
    "body": "Hello {{masterName}}, your Copy Trading Master access is now approved. Capacity: {{capacity}} connected accounts.",
    "ctaLabel": "Open Copy Trading",
    "ctaUrl": "{{appUrl}}/copy-trading/master/",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "transactional"
  },
  "copy_capacity_changed": {
    "key": "copy_capacity_changed",
    "name": "Master Capacity Changed",
    "category": "Copy Trading",
    "subject": "Your Copy Trading capacity changed",
    "preheader": "Your Copy Trading capacity changed",
    "headline": "Capacity updated",
    "body": "Your approved connected-account capacity has been updated to {{capacity}}.",
    "ctaLabel": "Open dashboard",
    "ctaUrl": "{{appUrl}}/copy-trading/master/",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "transactional"
  },
  "copy_warning": {
    "key": "copy_warning",
    "name": "Copy Trading Warning",
    "category": "Copy Trading",
    "subject": "Copy Trading action required",
    "preheader": "Copy Trading action required",
    "headline": "Copy Trading warning",
    "body": "A Copy Trading connection or execution issue needs review. Open the Master dashboard for status and audit details.",
    "ctaLabel": "Review Copy Trading",
    "ctaUrl": "{{appUrl}}/copy-trading/master/",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "transactional"
  },
  "maintenance_notice": {
    "key": "maintenance_notice",
    "name": "Maintenance Notice",
    "category": "Platform",
    "subject": "Trade Avata maintenance notice",
    "preheader": "Trade Avata maintenance notice",
    "headline": "Scheduled maintenance",
    "body": "Trade Avata will undergo maintenance. Important account data will remain protected while services are updated.",
    "ctaLabel": "Open Trade Avata",
    "ctaUrl": "{{appUrl}}",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "transactional"
  },
  "privacy_terms_update": {
    "key": "privacy_terms_update",
    "name": "Policy Update",
    "category": "Platform",
    "subject": "Trade Avata policy update",
    "preheader": "Trade Avata policy update",
    "headline": "Our terms or privacy information changed",
    "body": "We updated important Trade Avata policy information. Please review the latest version.",
    "ctaLabel": "Review policies",
    "ctaUrl": "{{appUrl}}/terms/",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "transactional"
  },
  "system_notice": {
    "key": "system_notice",
    "name": "System Notification",
    "category": "Platform",
    "subject": "Trade Avata notification",
    "preheader": "Trade Avata notification",
    "headline": "Trade Avata notification",
    "body": "Hello {{firstName}}, there is an update related to your Trade Avata account.",
    "ctaLabel": "Open Trade Avata",
    "ctaUrl": "{{appUrl}}",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "transactional"
  },
  "newsletter": {
    "key": "newsletter",
    "name": "Newsletter",
    "category": "Campaigns",
    "subject": "Trade Avata update",
    "preheader": "Trade Avata update",
    "headline": "Trade smarter with better information",
    "body": "News, learning resources, product updates and platform improvements from Trade Avata.",
    "ctaLabel": "Visit Trade Avata",
    "ctaUrl": "{{appUrl}}",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "all"
  },
  "promotion": {
    "key": "promotion",
    "name": "Promotion",
    "category": "Campaigns",
    "subject": "A Trade Avata offer for you",
    "preheader": "A Trade Avata offer for you",
    "headline": "Trade Avata offer",
    "body": "A Trade Avata product or learning offer is available for a limited period. Review the details before making a purchase.",
    "ctaLabel": "View offer",
    "ctaUrl": "{{actionUrl}}",
    "footer": "Trade Avata · Trade Simple.",
    "enabled": true,
    "audience": "all"
  }
};

export function substituteVariables(text = '', values = {}) {
  return String(text).replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (_, key) => values[key] ?? `{{${key}}}`);
}

export function getFallbackEmailTemplate(type='system_notice') {
  return {key:type,preheader:'',footer:'Trade Avata · Trade Simple.',enabled:true,...(fallback[type] || fallback.system_notice)};
}

export function renderEmailTemplate(type, data = {}, options = {}) {
  const template = {...getFallbackEmailTemplate(type), ...(options.template || {})};
  const config = options.config || {};
  const variables = {
    firstName: data.firstName || data.name || 'Trader', displayName: data.displayName || data.name || 'Trader', email: data.email || '',
    appUrl: data.appUrl || config.appUrl || '', supportEmail: data.supportEmail || config.supportEmail || '', message: data.message || '',
    ...data
  };
  const subject = substituteVariables(data.subject || template.subject, variables);
  const headline = substituteVariables(data.title || template.headline || template.name || 'Trade Avata', variables);
  const preheader = substituteVariables(template.preheader || '', variables);
  const rawBody = data.htmlBody ? String(data.htmlBody) : substituteVariables(data.body || template.body || data.message || '', variables);
  const body = data.htmlBody ? rawBody : escapeHtml(rawBody).replaceAll('\n','<br>');
  const ctaLabel = substituteVariables(data.actionLabel || template.ctaLabel || '', variables);
  const ctaUrl = substituteVariables(data.actionUrl || template.ctaUrl || '', variables);
  const footer = substituteVariables(template.footer || 'Trade Avata · Trade Simple.', variables);
  const appUrl = String(variables.appUrl || '').replace(/\/$/,'');
  const logo = appUrl ? `${appUrl}/brand/trade-avata-mark.png` : '';
  const button = ctaLabel && ctaUrl ? `<p style="margin:24px 0"><a href="${escapeHtml(ctaUrl)}" style="display:inline-block;padding:12px 18px;background:#0b7ff3;color:#fff;text-decoration:none;border-radius:9px;font-weight:700">${escapeHtml(ctaLabel)}</a></p>` : '';
  const html = `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(subject)}</title></head><body style="margin:0;background:#eef4fa;font-family:Arial,sans-serif;color:#15304b"><div style="display:none;max-height:0;overflow:hidden">${escapeHtml(preheader)}</div><div style="max-width:640px;margin:0 auto;padding:28px 16px"><div style="background:#fff;border:1px solid #d7e4ef;border-radius:16px;overflow:hidden"><div style="padding:22px 24px;background:#061522;color:#fff;display:flex;align-items:center;gap:12px">${logo?`<img src="${escapeHtml(logo)}" alt="Trade Avata" width="46" height="46" style="display:block;border-radius:10px">`:''}<div><div style="font-size:20px;font-weight:800;line-height:1">Trade Avata</div><div style="font-size:11px;color:#a9c5df;margin-top:5px;letter-spacing:.05em">Trade Simple.</div></div></div><div style="padding:30px 28px"><h1 style="font-size:25px;line-height:1.2;margin:0 0 18px">${escapeHtml(headline)}</h1><div style="font-size:15px;line-height:1.7;color:#506a81">${body}</div>${button}<div style="margin-top:28px;padding-top:18px;border-top:1px solid #e5edf4;font-size:12px;color:#8396a7">${escapeHtml(footer)}</div></div></div></div></body></html>`;
  return {subject, html, text:String(data.text || substituteVariables(data.body || template.body || data.message || '', variables)).replace(/<[^>]+>/g,' ')};
}
