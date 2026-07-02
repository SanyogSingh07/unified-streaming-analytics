# Cinematic Stream-Data Design System

This design system bridges the gap between high-fidelity media entertainment and technical data analysis. It is designed for streaming data analysis dashboards where the "monitor" becomes a "screen." The aesthetic blends **Corporate Modern** structure with **Glassmorphism** and high-impact cinematic visuals.

The goal is to evoke the feeling of a "Command Center" for media executives and data scientists. It leverages deep, immersive backgrounds that recede, allowing vibrant data visualizations and primary accents to command immediate attention. The motion and transition language should be fluid and cinematic, moving away from standard SaaS snappiness toward a more deliberate, high-production feel.

---

## 1. Brand & Style

### Color Strategy
The color strategy is "Dark-First." To facilitate multi-theme switching, the system utilizes functional tokens:

- **Surface-Base:** The primary background color. Extremely dark to maximize contrast for data points.
- **Surface-Elevated:** Semi-transparent layers used for cards and containers to create depth.
- **Brand-Primary:** The high-energy accent used for CTAs, active states, and critical data trends.
- **Brand-Secondary:** Supporting accents (Silver for Disney+, Teal-subtle for Prime) used for secondary interactive elements.

Data visualization colors (Green for growth, Amber for warning) should maintain a minimum of 4.5:1 contrast against all three theme background variants.

### Typography
The typography system prioritizes high-impact readability. 

- **Headlines:** Use **Hanken Grotesk**. Its sharp, contemporary geometric forms feel engineered and professional. Bold weights are preferred to anchor dashboard sections.
- **Body:** **Inter** provides maximum legibility for dense data tables and descriptive text.
- **Data/Labels:** **Geist** (Monospaced) is used for numerical data, chart axes, and technical labels to ensure perfect alignment in tabular views.

Letter spacing is tightened for large displays to give a "theatrical poster" feel, while labels are tracked out for clarity at small sizes.

### Elevation & Depth
Depth is achieved through **Tonal Layering** and **Glassmorphism** rather than traditional drop shadows.

- **Level 0 (Base):** The theme's background color.
- **Level 1 (Cards):** Surface-Elevated color with a `backdrop-filter: blur(12px)`. In the Disney+ theme, this includes a subtle 1px border with a 10% white opacity to simulate a "silver" edge.
- **Level 2 (Modals/Popovers):** Higher opacity fills with a soft, expansive ambient shadow (`blur: 40px, opacity: 0.3`) tinted with the `Brand-Primary` color to create a "glow" effect.
- **Data Layers:** Charts and interactive trend lines should feel as if they are floating above the glass surfaces.

### Shapes
The shape language is **Soft (0.25rem)** to maintain a technical, precise edge. 

- **Standard Elements:** Buttons, inputs, and small widgets use a 4px (0.25rem) radius.
- **Data Cards:** Use `rounded-lg` (8px) to distinguish major content containers from small UI controls.
- **Chart Bars:** Utilize sharp corners or extremely minimal rounding (2px) to ensure data accuracy is visually represented without distortion.

---

## 2. Layout & Spacing

The system utilizes a **Fluid Grid** with fixed maximum widths for dashboard cards. 

- **Grid Model:** 12-column grid for desktop, 6-column for tablet, and 2-column for mobile.
- **Rhythm:** An 8px linear scale (8, 16, 24, 32, 48, 64) governs all padding and margins. 
- **Navigation:** The top navigation bar is persistent at 72px. Branded tabs use the `Brand-Primary` color for the active underline indicator.
- **Responsive Behavior:** In desktop view, data cards take up proportional spans (e.g., 4 columns). On mobile, cards stack vertically, and the navigation collapses into a bottom-anchored bar or a condensed header to maximize chart visibility.

---

## 3. Core Tokens (JSON Specs)

```json
{
  "theme": {
    "colorMode": "DARK",
    "font": "HANKEN_GROTESK",
    "roundness": "ROUND_FOUR",
    "customColor": "#e50914",
    "headlineFont": "HANKEN_GROTESK",
    "bodyFont": "INTER",
    "labelFont": "GEIST",
    "namedColors": {
      "background": "#131313",
      "surface": "#131313",
      "surface_container": "#201f1f",
      "surface_container_high": "#2a2a2a",
      "surface_container_low": "#1c1b1b",
      "primary-container": "#e50914",
      "on-surface": "#e5e2e1",
      "on-surface-variant": "#e9bcb6"
    },
    "typography": {
      "display-lg": {
        "fontFamily": "Hanken Grotesk",
        "fontSize": "48px",
        "fontWeight": "800",
        "lineHeight": "1.1",
        "letterSpacing": "-0.02em"
      },
      "headline-lg": {
        "fontFamily": "Hanken Grotesk",
        "fontSize": "32px",
        "fontWeight": "700",
        "lineHeight": "1.2"
      },
      "body-md": {
        "fontFamily": "Inter",
        "fontSize": "16px",
        "fontWeight": "400",
        "lineHeight": "1.6"
      },
      "label-mono": {
        "fontFamily": "Geist",
        "fontSize": "12px",
        "fontWeight": "500",
        "lineHeight": "1",
        "letterSpacing": "0.05em"
      }
    },
    "spacing": {
      "base": "8px",
      "card-gap": "20px",
      "container-padding": "24px",
      "gutter": "16px",
      "nav-height": "72px"
    }
  }
}
```
