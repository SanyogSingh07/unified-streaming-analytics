# Antigravity Stitch UI Integration Guide

This document describes how to integrate the **StreamAnalytics Dashboard** UI components (specifically Netflix, Disney+, and Prime Video dashboards) into the Antigravity agent system as "Stitch UIs" for seamless cross-platform rendering and state management.

---

## 1. Design System Configuration (Tokens)

To instantiate these Stitch UIs correctly in Antigravity, apply the following design configuration tokens to your rendering schema:

### Spacing & Grid Specs
- **Grid Layout:** 12-column bento-grid on desktop, collapsing to single-column layouts on mobile.
- **Rhythm Base:** 8px system (Padding, Gap, Margin variables are set as increments of 8px).
- **Navigation Height:** 72px persistent top bar.

### Typography Settings
- **Display Headings:** `Hanken Grotesk` (Vibrant, geometric, weights: 700, 800).
- **Body Text:** `Inter` (Optimized for legibility and dense table fields).
- **Technical/Mono Labels:** `Geist Mono` (Tabular figures, numbers, timeline years).

---

## 2. Active Platform Theme Mapping

Antigravity Stitch UI supports dynamic switching based on the selected platform state. Use these key-value mappings to configure the CSS theme dynamically:

| Platform | Background Hex | Accents/Glow Hex | Profile Name & Pic Link | Key Components |
|---|---|---|---|---|
| **Netflix** | `#131313` | `#e50914` (Bright Red) | **Alex Reed** (Senior Analyst)<br>`https://lh3.googleusercontent.com/...` | - Total Titles, Avg Rating, Retention Metrics<br>- Custom Area-Line Chart<br>- Regional Metrics Grid Table |
| **Disney+** | `#1A1D29` | `#0063e5` (Midnight Blue) | **Alex Chen** (Chief Analyst)<br>`https://lh3.googleusercontent.com/...` | - Star rating gauges<br>- Franchise Distribution (Marvel, Star Wars)<br>- Secret Invasion Feature Highlight |
| **Prime Video** | `#0F171E` | `#00A8E1` (Cyan Prime) | **Alex Chen** (Data Scientist)<br>`https://lh3.googleusercontent.com/...` | - Hotspots world-map reach visualizer<br>- Original Production bar chart<br>- Licensing alerts card |

---

## 3. Stitch UI Component Schema

Below are the React/JSON properties and schema states required to update or recreate components programmatically inside Antigravity:

### State Definitions
```typescript
enum ActivePlatform {
  NETFLIX = 'Netflix',
  DISNEY = 'Disney+',
  PRIME_VIDEO = 'Prime Video'
}

enum SidebarTab {
  DASHBOARD = 'Dashboard',
  LIBRARY = 'Library',
  GROWTH = 'Growth',
  DEMOGRAPHICS = 'Demographics',
  REPORTS = 'Reports'
}
```

### Component Parameters
1. **Header Component (`HeaderProps`):**
   - `activePlatform`: current active platform.
   - `onPlatformChange`: triggers dynamic UI refactoring on tab click.

2. **Sidebar Component (`SidebarProps`):**
   - `activePlatform`: drives bottom profile metadata.
   - `activeTab`: tracks currently focused section.

3. **Metrics Grid:**
   - Unified interface for individual cards showing absolute metric numbers, percentage change labels, custom icons, and progress meters.

---

## 4. Hotlinked High-Resolution Assets

Ensure that the following assets are loaded with JSX `referrerPolicy="no-referrer"` to bypass iframe constraints:

- **Global reach map background:** `https://lh3.googleusercontent.com/aida-public/AB6AXuCdGB2o_wmBhuifxpRQYFIlJmi5QNGJ3dgj6-Eo28oFutZ0IRhbTwxBo2oIK-rTIfSJpVHU_gwROCqq7FtUvWtsOyjiTkxk_y-kyevmf6rTgL6TL7H_7yK5wDnvnXdOsO29xLIjCB8GD1GDqhA6F86CPvBZpmIN639jg6G07DlpxAwvchDPCSamK647gkl0hXLYS_gVGPXK4mEXhO54PhN2DXv0pSvBaTpUpitcfUvUrbpfwYqXnQaDBMhhYwbyWoI7ncA74hw_mVEb`
- **Secret Invasion hero background:** `https://lh3.googleusercontent.com/aida-public/AB6AXuB-YgzAESfLctcJQRISYONSSxPsbtccMt0CWTcT-ipW7AB9jBT4gunPf-PMoTlBfyigB-1TsosPMURO8N9NPgSH5Sky9yozJsviXPfEMwUFFti82om_WomSdFUQXLEL3jFmg6T47Je6kL8YzStAVzP0vXAeQH3vilIsLJr_8oYroc9_AZCjMKvtCelmkybMxFakvzPQ2_XkI6vegzBCnserpZImqTLK_OCraY4uqNXG1VOPa0vBn-DPj9BP7NZT1RlXCt7l8mzQHAzi`
- **Profile Image (Alex Chen - Scientist):** `https://lh3.googleusercontent.com/aida-public/AB6AXuA3xmk3sntTsNZB9XRXg53onDGPe5b8lBzMD0J-dx2vAtKaTGGDis_imDyKx955CtcYX4kfjiQvl6OP9i2DxdiZEqkva_qyiXErVAgGm_jxLaTvWx-Pasll4NBNd-QCNQ5QF8Ifx-5RD9uepauOdkWzpUyKIgdOwBySg5DbIXQv-9BY2el1RmJtGvf8tFFTg3ZLbJCCsoCvYXAX_zXxICySe-ln5WJ7-lWUWsgFcC-RXgzZ7Qy-DsuzMb3VQ6YrsqDVsk49pZInh4KK`
- **Profile Image (Alex Chen - Analyst):** `https://lh3.googleusercontent.com/aida-public/AB6AXuBu9KYY3CeV1IjZiVkQRy73ze2wBg2hT_z10AQPYPHCscNykYtOlKr-66hz-6SZ84jSX1j0k02AHakaiK7Uo6l4REedpcbHzCkaGCS7IgvJuUGzJ0pBsKKJZu6wtk6rqLe0ZjnH0zRCCc9yD2fRA7q-l44Dbn4-ll5veT5_Kh4pph3YX9aM7gFWyrCc92524l76otqq2jrYeDIZuKetqcjo8K_nIaLsyD-b8R1wag0scLp_r0TD_BpXhG2qsATKqLKbAFU-n1FWA6P0`
- **Profile Image (Alex Reed):** `https://lh3.googleusercontent.com/aida-public/AB6AXuCPA1-hq9pX17OjPD5VxV46IupZmHaCd0BbLRH7l4tMPFqyk--ahRMNLAMvHHmp2GTNuo-en1BbJ5ho0M_jxsfXbrdH7ObucGMW8CqzbKPD1zFkMZOXqts88fQML1ZRNR9DzPZoQNgqJh1-wijPfjZBfXv2SCglCilqYSP1hE8zv8T86td2WIs8Xcevnp16LVbP3MO3aBt0WsIUE5awXbVMCPizQ1MUGlw00lBfUF4P7Q5M2LX0isidrocZW_vegfauELBHNdxu8FZU`

---

## 5. Interaction and Animation Directives

To preserve high production-value transitions in Antigravity:
1. **Platform switching:** Use custom React state transitions (`framer-motion` or CSS animations) to perform a fade-in and smooth slide of the layout.
2. **Interactive Chart Hovers:** Trigger state updates in local React hooks (`useState`) to center overlay tooltips smoothly over chart intervals.
3. **Map Marker Pulse Effect:** Apply custom `@keyframes` pulsing effect (`animate-ping-subtle`) to render responsive location reach animations seamlessly.
