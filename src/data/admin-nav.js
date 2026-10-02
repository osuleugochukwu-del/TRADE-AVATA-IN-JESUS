export function adminNav(base, active = 'overview') {
  const item=(label,icon,href,key)=>({label,icon,href,active:key===active});
  return [
    item('Overview','⌂',`${base}admin/`,'overview'),
    {group:'PLATFORM'},
    item('Visitors & Traffic','↗',`${base}admin/#traffic`,'traffic'),
    item('Users','○',`${base}admin/#users`,'users'),
    item('Members','◎',`${base}admin/#members`,'members'),
    item('Analytics Accounts','▥',`${base}admin/#analytics`,'analytics'),
    item('Journal Oversight','▤',`${base}admin/#journal`,'journal'),
    {group:'CONTENT & SALES'},
    item('Products / Indicators','◇',`${base}admin/#products`,'products'),
    item('Courses','▧',`${base}admin/learn/`,'courses'),
    item('Orders / Sales','$',`${base}admin/#sales`,'sales'),
    item('Support Inbox','?',`${base}admin/support/`,'support'),
    item('Email Center','✉',`${base}admin/email/`,'email'),
    item('Social Media','◎',`${base}admin/social/`,'social'),
    item('Homepage / Banners','▣',`${base}admin/homepage/`,'homepage'),
    item('Content / Pages','≡',`${base}admin/#content`,'content'),
    {group:'OPERATIONS'},
    item('Copy Trading','⇄',`${base}admin/copy-trading/`,'copy'),
    item('Reports / Exports','⇩',`${base}admin/#reports`,'reports'),
    item('Payments / Integrations','◆',`${base}admin/#payments`,'payments'),
    item('Roles & Permissions','⚿',`${base}admin/#roles`,'roles'),
    item('Activity Logs','◷',`${base}admin/#logs`,'logs'),
    item('Settings','⚙',`${base}admin/#settings`,'settings')
  ];
}
