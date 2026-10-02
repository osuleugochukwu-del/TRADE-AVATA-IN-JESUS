# Trade Avata frontend rebuild — latest completion notes

## Preserved and expanded
- **Advanced Analytics** (`src/pages/analytics.astro`) remains the original advanced application. Its dashboard structure and analytical features were not replaced. This update adds a collapsible sidebar, Dark / Soft Gray / Light appearance presets, persisted sidebar preference, and keeps the existing density, chart-height, color, widget visibility and drag-reorder customization.
- **Trading Journal** (`src/pages/journal/index.astro`) keeps the original database-style workflow and all of its existing functions. It is expanded with a compact performance strip, richer trade rows, a full right-side trade-review drawer, link-first chart evidence preview, collapsible navigation and complete appearance customization. No image-upload workflow was added.

## Shared dashboard upgrades
- Member, Admin and Copy Trading dashboards use a shared dashboard shell with desktop sidebar collapse/expand, mobile off-canvas navigation, Dark / Soft Gray / Light presets, custom accent/background/panel colors, density controls and per-page card rearrangement.
- Sidebar state and visual preferences persist on the device.
- Analytics and Journal implement the same principles in their own existing application shells so their identity is preserved.

## Public site already included
- Approved homepage structure and dynamic four-card indicator filter: All / MT4 / MT5 / cTrader / TradingView.
- Product library + individual product pages.
- Course library + course details + responsive course player.
- Article library + individual article pages.
- Learning Hub, focused AI Tools page, Market, Contact/Support, About.
- Login/Register with Google-ready UI plus Forgot Password, Email Verification and Session Expired flows.
- Privacy, Terms, Risk Disclosure, 404 and Maintenance pages.
- Public theme toggle scoped only to the actual theme button.

## Backend boundary
Firebase-backed actions activate when Firebase environment keys and required services are configured. Broker connections, real payments, email delivery and live market data are not falsely presented as live. The frontend provides complete states and controls for the later secure integrations.
