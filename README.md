# Let Us Optimize — Static Website

A responsive, single-page website for Let Us Optimize, built with plain HTML, CSS and vanilla JavaScript. There is no framework, package manager, database or build step. The project is intended for GitHub and Cloudflare Pages deployment.

## Project structure

```text
letusoptimize-v3/
├── index.html                       # Homepage content and page-specific SEO/social metadata
├── 404.html                         # Branded not-found page
├── favicon.ico                      # Browser favicon
├── robots.txt                       # Crawler rules and sitemap reference
├── sitemap.xml                      # Public URL sitemap (currently homepage only)
├── llms.txt                         # Concise business information for AI crawlers
├── README.md                        # Project structure and maintenance notes
└── assets/
    ├── css/
    │   └── global.css               # Design tokens, typography, responsive layout and section styles
    ├── js/
    │   ├── config.js                # Shared business, contact, social, rating and asset configuration
    │   ├── components.js             # Shared site components such as header/footer
    │   └── main.js                  # Homepage interactions and component initialization
    └── images/
        ├── favicon.png              # PNG favicon
        ├── logo.svg                 # Brand logo
        ├── og-home.jpg              # Social sharing image (1200 × 630)
        ├── faq-team.svg              # Local illustration for the FAQ panel
        └── portfolio/
            ├── mini-hampers.svg      # Local portfolio preview illustration
            ├── alevo.svg             # Local portfolio preview illustration
            └── beautione.svg         # Local portfolio preview illustration
```

## Run locally

Open the project root using a static development server, such as VS Code Live Server. No installation or build command is needed. Serving from the project root helps reproduce production paths.

## Central configuration

Edit `assets/js/config.js` to update the business name, domain, phone, WhatsApp number, email, location/address fields, service area, social links, asset paths, site defaults, analytics IDs, Google rating and shared metrics. The header/footer contact links, social destinations, logo, location text and copyright year are populated from shared configuration. Leave unknown address fields blank until confirmed; do not guess a street address or postal code.

Use international digits for phone and WhatsApp destinations. Keep the displayed contact number and destination values consistent.

## Images and portfolio links

The current ZIP did not contain the original portfolio and FAQ photos. Local SVG illustrations are included so those sections do not show broken images. Replace these with approved project screenshots or licensed photographs when available. The Open Graph JPEG is a generated branded sharing image.

The portfolio cards still contain `ADD_MINI_HAMPERS_URL`, `ADD_ALEVO_URL` and `ADD_BEAUTIONE_URL` placeholders. Replace both occurrences for each project with the verified public URL before publishing. Do not publish the placeholder destinations.

## Design system

- Brand accent: `#ff3800`
- Main page background: warm off-white
- Dark panels: charcoal / near-black
- Typeface: Satoshi loaded from Fontshare with system fallbacks
- Shared spacing, color, motion and layout tokens are maintained in `assets/css/global.css`
- Respect reduced-motion preferences when adding new animation behavior.

## SEO and launch checklist

Before launch:

- Verify page title, description, canonical URL, Open Graph image and social preview.
- Validate Organization structured data and ensure claims are accurate.
- Replace all portfolio URL placeholders.
- Confirm all internal anchors, contact links and social links.
- Add future public pages to `sitemap.xml` when those pages exist.
- Test the 404 page on the deployment host.
- Check keyboard navigation, visible focus, reduced motion, contrast, mobile layouts and image alt text.
- Test the final deployed site for broken links and missing resources.

## Deployment

Deploy the repository root directly to Cloudflare Pages or another static host. No build command is required; the output directory is the project root. Verify the custom domain and custom 404 handling after deployment.

## Shared site architecture

- `assets/css/global.css` owns the design tokens (brand/surface/text colors, typography, spacing, container sizing, borders, radii, shadows, motion and layer values), reset, shared utilities, button variants and responsive/reduced-motion behavior.
- `assets/js/components.js` renders the reusable header and footer into `[data-site-header]` and `[data-site-footer]` placeholders. It also fills contact and social links from `config.js`. For a new page, include both placeholders and load `assets/js/config.js`, `assets/js/head.js`, `assets/js/components.js`, and the page's required script in that order.
- `assets/js/head.js` injects the shared favicon, font preconnect/font stylesheet, global stylesheet, theme settings and Organization JSON-LD from `config.js`; it also loads GA4 or GTM only when a real ID is configured. Add tracking IDs in `config.js` only when approved; empty IDs do not load analytics.
- Keep each page's title, description, canonical URL, Open Graph and Twitter metadata in that page's HTML. This is intentional: static HTML metadata is available to search and social crawlers before JavaScript executes. Only page-specific values/schema should differ per page; keep global Organization data in `head.js`.
- The project remains build-free. A future build/template step could generate shared head markup at build time, but runtime JavaScript cannot physically share static `<head>` markup across separate HTML documents without that trade-off.
- The business location is configured at city/state/country level. Street address and postal code remain blank until the business confirms them.
## Navigation behavior

- Homepage section links scroll to their target without leaving a `#section` fragment in the address bar.
- The footer “Back to top” control scrolls smoothly to the top on the homepage without adding a URL fragment.
- Reduced-motion preferences are respected.
