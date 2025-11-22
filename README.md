# Kitchen Cabinet Layout Calculator - POC

A real, production-ready platform for calculating optimal kitchen cabinet layouts.

## What You've Got

- **Backend**: Python/Flask API that calculates cabinet layouts
- **Frontend**: React app for user interface
- **JSON Output**: Everything structured for expansion (3D rendering, materials list, etc.)

## Quick Start (5 Minutes)

### Step 1: Set Up Backend

1. Open **PowerShell** or **Command Prompt**
2. Navigate to the backend folder:
   ```
   cd cabinet-calculator\backend
   ```

3. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Start the backend server:
   ```
   python app.py
   ```

   You should see:
   ```
   🚀 Cabinet Calculator API starting...
   📍 Running on http://localhost:5000
   ```

   ✅ **Leave this window open** - the server needs to stay running

### Step 2: Set Up Frontend

1. Open a **NEW** PowerShell/Command Prompt window
2. Navigate to the frontend folder:
   ```
   cd cabinet-calculator\frontend
   ```

3. Install React dependencies (this takes 2-3 minutes):
   ```
   npm install
   ```

4. Start the React app:
   ```
   npm start
   ```

   Your browser will automatically open to: http://localhost:3000

   ✅ **You're live!**

## Using The App

1. Enter wall dimensions
2. Set appliance positions
3. Click "Calculate Layout"
4. See the complete cabinet sequence with SKUs

## The JSON Output

Every calculation returns structured JSON like this:

```json
{
  "layout": {
    "wallA": {
      "length": 140,
      "items": [
        {"position": 0, "sku": "FILL1.5", "width": 1.5, "type": "filler"},
        {"position": 1.5, "sku": "FR36", "width": 36, "type": "appliance"},
        ...
      ]
    },
    "wallB": {...}
  }
}
```

This JSON can be:
- ✅ Fed to DALL-E for rendering
- ✅ Used to generate material lists
- ✅ Exported to 3D modeling tools
- ✅ Stored in a database
- ✅ Trained on with AI

## What's Next

Now that you have the foundation working, we can add:

1. **Wall Cabinets** - New endpoint: `/api/calculate-wall-cabinets`
2. **Drawer Bases** - Port the complex logic from HTML version
3. **L-Shape Corners** - Add corner handling
4. **Material Lists** - New endpoint: `/api/materials`
5. **SVG Rendering** - Generate 2D drawings
6. **DALL-E Integration** - Auto-generate renderings

Each feature is a separate module that consumes/produces JSON.

## Troubleshooting

**"Cannot connect to backend"**
- Make sure the Python server (Step 1) is still running
- Check that it says "Running on http://localhost:5000"

**"Module not found" errors**
- Re-run `pip install -r requirements.txt` in backend folder
- Re-run `npm install` in frontend folder

**Port already in use**
- Backend: Edit `app.py`, change port from 5000 to 5001
- Frontend: It will auto-detect and offer a different port

## Architecture

```
User Browser (localhost:3000)
      ↓
React Frontend (JavaScript)
      ↓ HTTP POST
Flask Backend (Python) at localhost:5000
      ↓
Cabinet Calculation Logic
      ↓ 
JSON Response
      ↓
Display Results / Export / Render
```

## Files Explained

**Backend:**
- `app.py` - Main API server with cabinet logic
- `requirements.txt` - Python dependencies

**Frontend:**
- `src/App.js` - Main React component (UI + API calls)
- `src/App.css` - Styling
- `src/index.js` - React entry point
- `public/index.html` - HTML template
- `package.json` - Node dependencies

## This IS Your Real Platform

Everything you build from here forward stays on this architecture:
- Add features → they integrate via JSON
- Scale up → same structure, just more modules
- KBIS demo → this is it (just add more features)
- Production → same code, better hosting

No rebuilds. No starting over. This is the foundation.

---

**Ready to add the next feature?** Just let Claude know what you want to work on next!
