# Prokon - Web Article Assistant

## Overview
Prokon enhances web article comprehension with local search and highlighting. This extension requires a local server to process data using advanced language models.

## Prerequisites
- **Node.js**: Ensure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

## Setup Instructions

### Step 1: Clone the Repository
Clone the repository to your local machine:

`bash
git clone https://github.com/your-repo/prokon.git
cd prokon`


### Step 2: Set Up the Local Server
Navigate to the `local-server` directory and install the necessary dependencies:

bash
cd local-server
npm install


### Step 3: Start the Local Server
Run the following script to start the local server:


bash
./start-server.sh


This script will:
- Navigate to the `local-server` directory
- Install the required Node.js packages
- Start the server

### Step 4: Install the Chrome Extension
1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable "Developer mode" using the toggle switch in the top right corner.
3. Click "Load unpacked" and select the `prokon` directory.

### Step 5: Use the Extension
1. Click on the Prokon extension icon in the Chrome toolbar.
2. Follow the on-screen instructions to interact with web articles.

## Troubleshooting
If you encounter any issues, please ensure:
- Node.js is installed and up-to-date.
- The local server is running (`http://localhost:3000`).

For further assistance, please refer to the [documentation](https://github.com/your-repo/prokon/wiki) or open an issue on [GitHub](https://github.com/your-repo/prokon/issues).

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


Additional Files
start-server.sh
Ensure you have the start-server.sh script in your project directory:


#!/bin/bash
# start-server.sh

# Navigate to the local server directory
cd local-server

# Install dependencies if not already installed
npm install

# Start the server
node server.js


server.js
Ensure your server.js file in the local-server directory is set up correctly:

const express = require('express');
const bodyParser = require('body-parser');
const { Ollama } = require('ollama'); // Assuming Ollama provides a Node.js API
const { LangChain } = require('langchain'); // Import LangChain

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/vectorize', async (req, res) => {
  const { data, url } = req.body;
  try {
    // Use LangChain for vectorization
    const langchain = new LangChain();
    const vectorizedData = await langchain.vectorize(data, 'nomic-embed-text');
    res.json({ url, vectorizedData });
  } catch (error) {
    console.error('Error vectorizing data:', error);
    res.status(500).json({ error: 'Failed to vectorize data' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});