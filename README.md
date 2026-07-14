# Portfolio Site - Local Preview Setup

This is a simple setup to preview your portfolio locally with your video files.

## Quick Start

### Option 1: Using Python (Easiest)
If you have Python installed, run this command from the portfolio-site folder:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open your browser to: **http://localhost:8000**

### Option 2: Using Node.js
If you have Node.js installed:

```bash
npx http-server
```

### Option 3: Using VS Code Live Server Extension
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## File Structure

```
portfolio-site/
├── index.html          # Main HTML file
├── portfolio.jsx       # React component
├── README.md          # This file
└── public/
    └── videos/        # Place your video files here
        └── indigo.mp4 # Your Indigo EMR video
```

## Adding Your Video

1. Copy your `Indigo web Preview.mp4` file to: `public/videos/`
2. Rename it to `indigo.mp4`
3. The portfolio will automatically load it

## Notes

- The video path in `portfolio.jsx` is set to `./videos/indigo.mp4`
- All other media are loaded from web URLs
- The site works offline once the page loads
- For production/Netlify, you'll need to use absolute URLs or upload videos to a CDN
