# Let Us Optimize — Architecture

## Current Technology

The main marketing website is a lightweight static website.

Primary technologies:

- HTML
- CSS
- JavaScript

Do not introduce a framework unless there is a clear technical reason.

---

## Hosting

Production hosting:

Cloudflare Pages

Repository:

GitHub

Development environment:

VS Code

The project must work consistently across multiple computers using Git.

---

## Deployment

Expected flow:

Local development
→ Git
→ GitHub
→ Cloudflare Pages

Do not place development-only files into the public production output.

---

## Folder Structure

Use a clean structure similar to:

/
├── index.html
├── about.html
├── optimize.html
├── business-workflow.html
├── promotion-launch.html
├── product-selling.html
├── digital-systems.html
├── digital-solutions.html
├── contact.html
│
├── assets/
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── docs/
│
└── .github/

The exact file structure may be adjusted if a better static-site organization is identified.

Keep public website assets separate from project documentation.

---

## CSS

Use reusable CSS classes and variables.

Avoid repeating identical styles.

Use CSS custom properties for:

- Brand colors
- Text colors
- Background colors
- Border colors
- Spacing
- Border radius
- Shadows
- Typography

Keep CSS organized by purpose.

Avoid unnecessary inline styles.

---

## JavaScript

Use JavaScript only where necessary.

Prefer lightweight vanilla JavaScript.

Avoid large JavaScript libraries for simple interactions.

Possible uses:

- Mobile navigation
- Small interactive components
- Animation triggers
- UI interactions

Do not use JavaScript for functionality that can be achieved efficiently with HTML/CSS.

---

## Header

The header should be reusable/global across all pages.

Navigation:

Home
About
Optimize
  - Business Workflow
  - Promotion & Launch
  - Product Selling
  - Digital Systems
  - Digital Solutions
Contact

The header must be responsive.

---

## Footer

The footer should be reusable/global across all pages.

Include:

- Brand summary
- Navigation
- Optimize links
- Contact details
- Social links
- Copyright
- Future space for Privacy Policy and Terms

Contact information should appear in the footer even though the Contact page also exists.

---

## Responsive Design

Mobile-first design is required.

Test at minimum:

- Small mobile
- Large mobile
- Tablet
- Laptop
- Desktop
- Wide desktop

Avoid horizontal overflow.

Navigation must remain usable on small screens.

---

## Performance

Performance is a major requirement.

Target:

95+ Google PageSpeed Insights where realistically achievable.

Prioritize:

- Minimal JavaScript
- Optimized images
- Modern image formats where appropriate
- Responsive images
- Lazy loading for below-the-fold images
- Proper image dimensions
- Minimal third-party resources
- Local fonts where beneficial
- Efficient CSS
- Efficient HTML
- Minimal DOM complexity
- Avoid unnecessary libraries
- Avoid render-blocking resources
- Avoid unnecessary animations

Do not sacrifice accessibility, usability or essential functionality solely to achieve a score.

---

## Typography

Preferred font:

Manrope.

Before implementation, verify available Manrope weights and use only the minimum required weights.

Prefer local/self-hosted font files if this improves performance and reliability.

Do not load unnecessary font weights.

If Manrope creates an unnecessary performance burden, use a suitable lightweight alternative.

---

## Accessibility

Use:

- Semantic HTML
- Correct heading hierarchy
- Accessible navigation
- Descriptive link text
- Alt text for meaningful images
- Empty alt attributes for decorative images
- Keyboard-accessible interactions
- Sufficient contrast
- Visible focus states
- Appropriate ARIA only when necessary

---

## SEO Foundation

Use semantic HTML and prepare every page for:

- Unique title
- Unique meta description
- Canonical URL
- Appropriate heading hierarchy
- Open Graph metadata
- Social sharing metadata
- Search-engine-friendly URLs
- Internal linking

Full SEO implementation will be handled as a later phase.

---

## Documentation

Documentation under:

docs/

is for development and project management.

It must not be publicly served by the production website.

---

## Future Blog

The main website will remain separate from the WordPress blog.

Future blog:

blog.letusoptimize.com

Do not add WordPress functionality to the main static website.