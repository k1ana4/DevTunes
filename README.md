# 🎵 DevTune: AI-Generated Original Soundtracks from Game Code

DevTune is an intelligent tool that analyzes your game's source code to automatically generate a cohesive, original soundtrack tailored to your gameplay.

By leveraging **Gemini 2.5 Flash** and **Lyria 3 Pro**, DevTune reads your codebase, identifies distinct game states (like Main Menu, Boss Battles, and Exploration), and generates high-quality, playback-ready music within minutes.

---

## 🚀 Features

* **Zero Backend Required:** Runs entirely in your browser. No databases or complex server setups needed.
* **Contextual Analysis:** Consolidates code files into a single context.
* **Intelligent Scene Detection:** Uses Gemini 2.5 Flash to automatically parse game logic and identify distinct scenes/states.
* **Prompt Engineering:** Converts code-derived scenes into structured musical prompts.
* **High-Fidelity Generation:** Leverages Lyria 3 Pro to generate original, cohesive audio tracks.
* **Instant Integration:** Provides tracks within minutes for immediate playback or download.

---

## 🛠️ Prerequisites

To use DevTune, you only need your own API keys:

1. **Google AI / Vertex AI Access:** An API key with access to **Gemini 2.5 Flash**.
2. **Lyria 3 Pro Access:** An API key for Google's Lyria music generation model.
3. **Local Web Server:** A simple local server (like VS Code Live Server, Node's `http-server`, or Python's `http.server`) to serve the files and avoid CORS issues.

---

## ⚙️ Setup & Usage Instructions

Follow these steps to get DevTune running locally on your machine.

### 1. Run a Local Server
Modern browsers restrict fetching local files directly, so you need to serve the project folder locally. Choose **one** of the following methods from your terminal in the project root:

**Option A: Python**
`python -m http.server 8000`

**Option B: Node.js**
`npx http-server`

**Option C: VS Code**
1. Install the **Live Server** extension in VS Code.
2. Right-click the `index.html` file in your explorer.
3. Select **"Open with Live Server"**.

### 2. Enter Your API Keys
DevTune uses a secure, local-only approach for API keys.

1. Open your browser and navigate to `http://localhost:8000/index.html` (or the port provided by your server, like `8080` or `5500`).
2. On the DevTune dashboard, locate the API Configuration panel.
3. Enter your **Gemini API Key** and **Lyria API Key** directly into the input fields.
   > **Note:** These keys are stored entirely locally in your browser session and are *never* sent to external servers other than the official Google APIs.

### 3. Generate Music
Once your keys are entered, you are ready to generate your soundtrack!

1. **Upload:** Use the web interface to upload your game's core logic files (e.g., `demo_game.js`).
2. **Analyze:** Click **"Analyze"** to have Gemini 2.5 Flash read the code and intelligently identify the required musical scenes (e.g., Main Menu, Boss Battle).
3. **Generate:** Click **"Generate"** to trigger the Lyria 3 Pro pipeline.
4. **Playback & Export:** Listen to the generated tracks directly in the browser, or export them as `.wav` files to use in your project!

---

## 🎮 Running the Demo Game (Shadow Quest)

To see DevTune in action, we've included a playable 2D RPG demo called **Shadow Quest** that dynamically reacts to the generated music.

1. **Launch the Game:** In a new browser tab, navigate to `http://localhost:8000/demo_game.html` (adjust the port if necessary).
2. **Import Soundtrack:** Click the soundtrack/scene buttons within the game's UI to directly import the downloaded `.wav` files you generated in the previous step.
3. **Play & Listen:** Use your arrow keys or WASD to walk around the canvas. Moving into different areas or encountering enemies will trigger different game "States," seamlessly transitioning the music to match the gameplay!

---

## 🔧 Troubleshooting

* **"Port already in use" error:** If you get this when starting your server, you have another server running. Press `Ctrl + C` in your terminal to stop the old one, or use a different port (e.g., `python -m http.server 8081`).
* **Live Server button not showing:** Make sure you have opened the entire project *folder* in VS Code (File > Open Folder), not just individual files.

---

## 🤝 Contributing
Since this is a hackathon project, we are open to rapid pull requests! Feel free to fork the repo, create a feature branch, and submit a PR.

## 📄 License
MIT License
