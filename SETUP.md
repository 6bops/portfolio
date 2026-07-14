# Setup Instructions

## Step 1: Add Your Video File

1. Open Finder and navigate to: `/Users/mac/Downloads/portfolio-site/public/videos/`
2. Copy your `Indigo web Preview.mp4` file into the `videos` folder
3. Rename it to `indigo.mp4` (optional, but keeps things organized)

## Step 2: Start a Local Server

Open Terminal and run:

```bash
cd /Users/mac/Downloads/portfolio-site
python -m http.server 8000
```

You should see output like:
```
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

## Step 3: View in Browser

Open your web browser and go to:
```
http://localhost:8000
```

You should see your portfolio load with the Indigo EMR video playing!

## Stop the Server

Press `Ctrl+C` in the Terminal to stop the server.

## Troubleshooting

**Can't see the video?**
- Make sure the file is in `public/videos/indigo.mp4`
- Refresh your browser (Cmd+R)
- Check the browser console for errors (Cmd+Option+J)

**Port 8000 already in use?**
- Use a different port: `python -m http.server 8001`
- Then visit: `http://localhost:8001`

---

Next step: When you're ready to deploy to Netlify, you'll need to use video URLs instead of local files.
