export const emailTemplateVariables = [
  '{{firstName}}','{{displayName}}','{{email}}','{{appUrl}}','{{supportEmail}}','{{orderNumber}}','{{amount}}','{{currency}}','{{productName}}','{{courseName}}','{{certificateUrl}}','{{resetUrl}}','{{verificationUrl}}','{{ticketNumber}}','{{masterName}}','{{capacity}}','{{actionUrl}}'
];

const t=(key,name,category,subject,headline,body,ctaLabel='',ctaUrl='',audience='transactional')=>({
  key,name,category,subject,preheader:subject,headline,body,ctaLabel,ctaUrl,footer:'Trade Avata · Trade Simple.',enabled:true,audience
});

export const defaultEmailTemplates = [
  t('welcome','Welcome','Account','Welcome to Trade Avata','Welcome to Trade Avata','Hello {{firstName}}, your Trade Avata account is ready. You can now explore your learning, products, Analytics and Journal from one place.','Open Trade Avata','{{appUrl}}'),
  t('welcome_back','Welcome Back','Account','Welcome back to Trade Avata','Welcome back','Hello {{firstName}}, welcome back. Continue from where you stopped and review anything that needs your attention.','Continue','{{appUrl}}'),
  t('verify_email','Verify Email','Account','Verify your Trade Avata email','Confirm your email','Hello {{firstName}}, confirm this email address to finish setting up your Trade Avata account.','Verify email','{{verificationUrl}}'),
  t('password_reset','Password Reset','Account','Reset your Trade Avata password','Reset your password','We received a password reset request for {{email}}. If this was you, use the button below.','Reset password','{{resetUrl}}'),
  t('password_changed','Password Changed','Security','Your Trade Avata password was changed','Password changed','Your Trade Avata password was changed successfully. If you did not make this change, contact support immediately.','Contact support','{{appUrl}}/contact/'),
  t('security_alert','Security Alert','Security','Security notice for your Trade Avata account','Security notice','We detected an account event that may need your attention. Review your account and change your password if you do not recognize it.','Review account','{{appUrl}}/member/'),
  t('session_notice','Session Notice','Security','Your Trade Avata session ended','Your session ended','For security, your Trade Avata session has ended. Sign in again to continue.','Sign in','{{appUrl}}/login/'),
  t('purchase_confirmation','Purchase Confirmation','Orders','Trade Avata purchase confirmed — {{productName}}','Purchase confirmed','Hello {{firstName}}, your order {{orderNumber}} for {{productName}} has been confirmed. Amount: {{currency}} {{amount}}.','View purchase','{{appUrl}}/member/'),
  t('payment_success','Payment Successful','Orders','Payment received for order {{orderNumber}}','Payment received','Your payment for {{productName}} was received successfully. Your access will appear in your Trade Avata account.','Open purchases','{{appUrl}}/member/'),
  t('payment_failed','Payment Failed','Orders','Payment issue for order {{orderNumber}}','Payment was not completed','We could not confirm payment for {{productName}}. No successful purchase has been recorded yet.','Review order','{{appUrl}}/member/'),
  t('refund_processed','Refund Processed','Orders','Refund update for order {{orderNumber}}','Refund processed','A refund update has been recorded for order {{orderNumber}}. Processing time may depend on the payment provider.','View orders','{{appUrl}}/member/'),
  t('product_access','Product Access','Products','Your Trade Avata product is ready — {{productName}}','Your product is ready','Your access to {{productName}} is now available in My Purchases.','Open product','{{appUrl}}/member/'),
  t('product_update','Product Update','Products','Update available — {{productName}}','Product update available','A new update is available for {{productName}}. Review the release information before replacing your current version.','View update','{{appUrl}}/member/'),
  t('course_enrollment','Course Enrollment','Learning','You are enrolled — {{courseName}}','Course access ready','You now have access to {{courseName}}. Your progress will be saved as you learn.','Start learning','{{appUrl}}/member/'),
  t('course_continue','Continue Learning','Learning','Continue {{courseName}}','Continue where you stopped','Your course is waiting for you. Continue {{courseName}} from your saved progress.','Resume course','{{appUrl}}/member/'),
  t('course_completed','Course Completed','Learning','You completed {{courseName}}','Course completed','Congratulations {{firstName}}. Your completion of {{courseName}} has been recorded.','View learning','{{appUrl}}/member/'),
  t('certificate_ready','Certificate Ready','Learning','Your Trade Avata certificate is ready','Certificate ready','Your certificate for {{courseName}} is ready.','View certificate','{{certificateUrl}}'),
  t('support_received','Support Received','Support','We received your Trade Avata support request','We received your message','Hello {{firstName}}, your support request {{ticketNumber}} has been received. We will use this reference when replying.','View support','{{appUrl}}/member/'),
  t('support_reply','Support Reply','Support','Update on support request {{ticketNumber}}','Support replied','There is a new reply on your Trade Avata support request {{ticketNumber}}.','Open support','{{appUrl}}/member/'),
  t('support_closed','Support Closed','Support','Support request {{ticketNumber}} closed','Request closed','Your support request {{ticketNumber}} has been marked resolved. You can open a new request if you still need help.','Open support','{{appUrl}}/member/'),
  t('contact_notification','Admin Contact Alert','Platform','New Trade Avata contact message','New contact message','A new public contact message has been received from {{displayName}} ({{email}}). Review the Support Inbox for the full message.','Open Support Inbox','{{appUrl}}/admin/support/'),
  t('support_notification','Admin Support Alert','Platform','New Trade Avata support message','New support message','A visitor or member sent a new support message. Open the Support Inbox to review and reply.','Open Support Inbox','{{appUrl}}/admin/support/'),
  t('copy_master_approved','Master Approved','Copy Trading','Your Trade Avata Master access is approved','Master access approved','Hello {{masterName}}, your Copy Trading Master access is now approved. Capacity: {{capacity}} connected accounts.','Open Copy Trading','{{appUrl}}/copy-trading/master/'),
  t('copy_capacity_changed','Master Capacity Changed','Copy Trading','Your Copy Trading capacity changed','Capacity updated','Your approved connected-account capacity has been updated to {{capacity}}.','Open dashboard','{{appUrl}}/copy-trading/master/'),
  t('copy_warning','Copy Trading Warning','Copy Trading','Copy Trading action required','Copy Trading warning','A Copy Trading connection or execution issue needs review. Open the Master dashboard for status and audit details.','Review Copy Trading','{{appUrl}}/copy-trading/master/'),
  t('maintenance_notice','Maintenance Notice','Platform','Trade Avata maintenance notice','Scheduled maintenance','Trade Avata will undergo maintenance. Important account data will remain protected while services are updated.','Open Trade Avata','{{appUrl}}'),
  t('privacy_terms_update','Policy Update','Platform','Trade Avata policy update','Our terms or privacy information changed','We updated important Trade Avata policy information. Please review the latest version.','Review policies','{{appUrl}}/terms/'),
  t('system_notice','System Notification','Platform','Trade Avata notification','Trade Avata notification','Hello {{firstName}}, there is an update related to your Trade Avata account.','Open Trade Avata','{{appUrl}}'),
  t('newsletter','Newsletter','Campaigns','Trade Avata update','Trade smarter with better information','News, learning resources, product updates and platform improvements from Trade Avata.','Visit Trade Avata','{{appUrl}}','all'),
  t('promotion','Promotion','Campaigns','A Trade Avata offer for you','Trade Avata offer','A Trade Avata product or learning offer is available for a limited period. Review the details before making a purchase.','View offer','{{actionUrl}}','all')
];

export function substituteTemplateVariables(text='', values={}) {
  return String(text).replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g,(_,key)=>values[key] ?? `{{${key}}}`);
}
