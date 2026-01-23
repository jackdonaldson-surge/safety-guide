/**
 * Google Apps Script for Safety Glossary Response Examples
 *
 * This script converts your Google Sheet data into JSON format
 * that the Safety Glossary widget can consume.
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a Google Sheet with two tabs: "Categories" and "Examples"
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code and paste this entire script
 * 4. Click Deploy > New deployment
 * 5. Select "Web app" as the type
 * 6. Set "Execute as" to "Me"
 * 7. Set "Who has access" to "Anyone"
 * 8. Click Deploy and copy the Web app URL
 * 9. Use that URL in your widget's CONFIG.responseExamplesJsonUrl
 */

/**
 * Handle GET requests - returns JSON data
 */
function doGet(e) {
  try {
    const json = buildJson();
    return ContentService
      .createTextOutput(JSON.stringify(json))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Build JSON from spreadsheet data
 */
function buildJson() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Get Categories sheet
  const categoriesSheet = ss.getSheetByName('Categories');
  if (!categoriesSheet) {
    throw new Error('Sheet "Categories" not found');
  }

  // Get Examples sheet
  const examplesSheet = ss.getSheetByName('Examples');
  if (!examplesSheet) {
    throw new Error('Sheet "Examples" not found');
  }

  // Read categories
  const categoriesData = categoriesSheet.getDataRange().getValues();
  const categoryHeaders = categoriesData[0];
  const categories = [];

  // Create a map to store categories by ID for easy lookup
  const categoryMap = {};

  for (let i = 1; i < categoriesData.length; i++) {
    const row = categoriesData[i];
    if (!row[0]) continue; // Skip empty rows

    const category = {
      id: String(row[getColumnIndex(categoryHeaders, 'id')] || '').trim(),
      title: String(row[getColumnIndex(categoryHeaders, 'title')] || '').trim(),
      description: String(row[getColumnIndex(categoryHeaders, 'description')] || '').trim(),
      color: String(row[getColumnIndex(categoryHeaders, 'color')] || '#3b82f6').trim(),
      icon: String(row[getColumnIndex(categoryHeaders, 'icon')] || 'shield').trim(),
      examples: []
    };

    if (category.id) {
      categories.push(category);
      categoryMap[category.id] = category;
    }
  }

  // Read examples
  const examplesData = examplesSheet.getDataRange().getValues();
  const exampleHeaders = examplesData[0];

  for (let i = 1; i < examplesData.length; i++) {
    const row = examplesData[i];
    const categoryId = String(row[getColumnIndex(exampleHeaders, 'category_id')] || '').trim();

    if (!categoryId || !categoryMap[categoryId]) continue;

    const example = {};

    // Always include prompt and response
    const prompt = String(row[getColumnIndex(exampleHeaders, 'prompt')] || '').trim();
    const response = String(row[getColumnIndex(exampleHeaders, 'response')] || '').trim();

    if (!prompt) continue; // Skip rows without a prompt

    example.prompt = prompt;
    if (response) example.response = response;

    // Add optional fields if they exist and have values
    const optionalFields = [
      'explanation', 'verdict', 'reasoning', 'note',
      'fullRefusalWithRedirect', 'redirect'
    ];

    optionalFields.forEach(field => {
      const colIndex = getColumnIndex(exampleHeaders, field);
      if (colIndex !== -1) {
        const value = String(row[colIndex] || '').trim();
        if (value) {
          example[field] = value;
        }
      }
    });

    categoryMap[categoryId].examples.push(example);
  }

  return { categories };
}

/**
 * Get column index by header name (case-insensitive)
 */
function getColumnIndex(headers, name) {
  const lowerName = name.toLowerCase();
  for (let i = 0; i < headers.length; i++) {
    if (String(headers[i]).toLowerCase().trim() === lowerName) {
      return i;
    }
  }
  return -1;
}

/**
 * Test function - run this to preview the JSON output
 */
function testBuildJson() {
  const json = buildJson();
  Logger.log(JSON.stringify(json, null, 2));
  Logger.log('Total categories: ' + json.categories.length);
  json.categories.forEach(cat => {
    Logger.log('  ' + cat.id + ': ' + cat.examples.length + ' examples');
  });
}
