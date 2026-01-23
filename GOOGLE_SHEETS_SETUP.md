# Google Sheets Setup for Response Examples

This guide walks you through setting up Google Sheets to manage your response examples with real-time updates.

## Quick Start

1. Create a new Google Sheet
2. Import the CSV files
3. Add the Apps Script
4. Deploy as a Web App
5. Update the widget configuration

---

## Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **+ Blank** to create a new spreadsheet
3. Name it something like "Safety Glossary Response Examples"

---

## Step 2: Create the Sheets and Import Data

### Create the Categories Sheet

1. The default sheet is named "Sheet1" - double-click the tab at the bottom and rename it to **Categories**
2. Go to **File > Import**
3. Click **Upload** and select `sheets-import-categories.csv`
4. Choose **Replace current sheet**
5. Click **Import data**

### Create the Examples Sheet

1. Click the **+** button at the bottom to add a new sheet
2. Name it **Examples**
3. Go to **File > Import**
4. Click **Upload** and select `sheets-import-examples.csv`
5. Choose **Replace current sheet**
6. Click **Import data**

---

## Step 3: Add the Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code in the editor
3. Open `google-sheets-script.js` from this repository
4. Copy the entire contents
5. Paste it into the Apps Script editor
6. Click **Save** (or press Ctrl+S / Cmd+S)
7. Name the project (e.g., "Safety Glossary API")

---

## Step 4: Deploy as a Web App

1. In Apps Script, click **Deploy > New deployment**
2. Click the gear icon next to "Select type" and choose **Web app**
3. Fill in the settings:
   - **Description**: "Response Examples API" (or whatever you prefer)
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. Click **Authorize access** and follow the prompts
   - Choose your Google account
   - Click "Advanced" > "Go to [project name] (unsafe)"
   - Click "Allow"
6. **Copy the Web app URL** - you'll need this for the next step!

The URL will look like:
```
https://script.google.com/macros/s/AKfycb...XXXXX.../exec
```

---

## Step 5: Update the Widget Configuration

Open `ultimate-safety-guide.js` and find the CONFIG section at the top (around line 12):

```javascript
const CONFIG = {
  ...
  responseExamplesJsonUrl: 'https://cdn.jsdelivr.net/...'
};
```

Replace the `responseExamplesJsonUrl` value with your Web app URL:

```javascript
const CONFIG = {
  ...
  responseExamplesJsonUrl: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'
};
```

---

## Step 6: Test It!

1. Open `test.html` in your browser
2. Click the Safety Glossary button
3. Go to the "Response Examples" tab
4. Verify all your examples appear correctly

---

## Making Edits

Now you can edit examples directly in Google Sheets:

1. Open your Google Sheet
2. Make changes to any cell in the Categories or Examples sheet
3. Refresh the widget - your changes appear immediately!

### Adding a New Example

1. Go to the **Examples** sheet
2. Add a new row at the bottom
3. Fill in:
   - `category_id`: Must match an ID from the Categories sheet
   - `prompt`: The example prompt
   - `response`: The model response
   - `explanation`: Why this response is appropriate
   - Other fields as needed for special categories

### Adding a New Category

1. Go to the **Categories** sheet
2. Add a new row with:
   - `id`: Unique identifier (lowercase, hyphens, no spaces)
   - `title`: Display title
   - `description`: Full description
   - `color`: Hex color code (e.g., `#3b82f6`)
   - `icon`: Icon name (see available icons below)

### Available Icons

- `alert-circle` - Warning/distress
- `x-circle` - Refusal
- `shield-alert` - Jailbreak
- `file-text` - Document/text
- `repeat` - Redirect
- `alert-triangle` - Caution
- `check-circle` - Success/approved
- `info` - Information

---

## Troubleshooting

### "Script function not found" Error

Make sure your script has the `doGet(e)` function and you've saved/deployed after making changes.

### Changes Not Appearing

1. Wait a few seconds - Google's servers can have slight delays
2. Hard refresh the page (Ctrl+Shift+R / Cmd+Shift+R)
3. Check the browser console for errors

### CORS Errors

The script should handle CORS automatically. If you see CORS errors:
1. Make sure "Who has access" is set to "Anyone"
2. Re-deploy the script

### Testing the API Directly

Paste your Web app URL into a browser - you should see raw JSON output.

---

## Sheet Structure Reference

### Categories Sheet Columns

| Column | Required | Description |
|--------|----------|-------------|
| id | Yes | Unique identifier (e.g., `full-refusal-distress`) |
| title | Yes | Display name |
| description | Yes | Full category description |
| color | Yes | Hex color code |
| icon | Yes | Icon name |

### Examples Sheet Columns

| Column | Required | Description |
|--------|----------|-------------|
| category_id | Yes | Must match a category id |
| prompt | Yes | The example prompt text |
| response | No* | The model's response |
| explanation | No | Why this response is appropriate |
| verdict | No | For harmful-non-generative category |
| reasoning | No | For harmful-non-generative category |
| fullRefusalWithRedirect | No | For redirects-vs-refusals category |
| redirect | No | For redirects-vs-refusals category |

*Some categories like `redirects-vs-refusals` don't use the standard response field.

---

## Re-deploying After Script Changes

If you modify `google-sheets-script.js`:

1. Go to **Deploy > Manage deployments**
2. Click the pencil icon to edit
3. Under "Version", select **New version**
4. Click **Deploy**

The URL stays the same, but now serves the updated script.
