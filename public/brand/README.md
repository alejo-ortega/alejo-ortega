# LinkedIn cover

- `Alejo-Ortega-LinkedIn.png`: upload this file to LinkedIn (1584 × 396 px, 4:1).
- `Alejo-Ortega-LinkedIn.svg`: vector master with outlined typography; no fonts required.

Regenerate both files from the repository root:

```sh
npm run banner
```

Generator: `scripts/build-linkedin-banner.ts`, using OpenType.js for vector
letterforms and Sharp for PNG export. Fonts are loaded locally from the existing
Fontsource packages. The palette, typography, fine grid and blue italic surname
match the website. The lower-left area is intentionally free of information to
accommodate LinkedIn's profile photo; all main copy starts at x = 624 px.
