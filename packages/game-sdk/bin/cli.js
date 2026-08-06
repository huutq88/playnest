#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const command = args[0];
const projectName = args[1] || "my-playnest-game";

if (command === "init" || command === "create") {
  console.log(`\n🎮 Initializing new PlayNest Web Game project: [${projectName}]...\n`);

  const targetDir = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(targetDir)) {
    console.error(`❌ Error: Directory '${projectName}' already exists!`);
    process.exit(1);
  }

  fs.mkdirSync(targetDir, { recursive: true });

  // 1. Create index.html with In-Game Custom Modal Overlay
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName} - PlayNest Game</title>
  <style>
    body { margin: 0; padding: 0; background: #090d16; color: #fff; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; overflow: hidden; }
    #game-container { position: relative; width: 100%; max-width: 420px; height: 100%; max-height: 750px; background: #111827; border-radius: 24px; border: 2px solid rgba(255,255,255,0.1); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box; text-align: center; }
    button { background: linear-gradient(90deg, #ec4899, #8b5cf6); border: none; color: white; padding: 14px 28px; font-weight: bold; border-radius: 14px; cursor: pointer; margin-top: 15px; font-size: 14px; width: 100%; }
    /* Custom In-Game Dialog Overlay */
    .in-game-modal { display: none; position: absolute; inset: 0; background: rgba(15, 23, 42, 0.95); border-radius: 24px; flex-direction: column; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box; backdrop-filter: blur(8px); }
    .in-game-modal.active { display: flex; }
  </style>
  <script src="https://playnest.zone/sdk/v1/playnest-sdk.js"></script>
</head>
<body>
  <div id="game-container">
    <h1>🚀 PlayNest Game Starter</h1>
    <p>Game ID: <code id="game-id-tag">loading...</code></p>
    <h2 id="score-text" style="color:#f472b6;">Score: 0</h2>
    <button onclick="addScore()">Tap to Score (+100)</button>
    <button onclick="finishGame()" style="background: linear-gradient(90deg, #10b981, #059669); margin-top: 10px;">Submit High Score</button>

    <!-- In-Game Custom Dialog Overlay -->
    <div id="popup-modal" class="in-game-modal">
      <h3 id="modal-title" style="color:#34d399;">🎉 PLAYNEST NOTICE</h3>
      <p id="modal-msg" style="font-size: 13px; color: #cbd5e1; margin-bottom: 15px;">Message...</p>
      <button onclick="closeInGameModal()" style="background: #3b82f6;">CLOSE</button>
    </div>
  </div>

  <script src="game.js"></script>
</body>
</html>`;

  // 2. Create game.js
  const gameJsContent = `// Initialize PlayNest Game SDK
const GAME_ID = "${projectName}";
document.getElementById("game-id-tag").innerText = GAME_ID;

let currentScore = 0;

if (window.playnestSDK) {
  window.playnestSDK.init({
    gameId: GAME_ID,
    debug: true
  });

  window.playnestSDK.on("pause", () => {
    console.log("[Game] Paused by PlayNest Host");
  });

  window.playnestSDK.on("resume", () => {
    console.log("[Game] Resumed by PlayNest Host");
  });
}

function addScore() {
  currentScore += 100;
  document.getElementById("score-text").innerText = "Score: " + currentScore;
}

function finishGame() {
  if (window.playnestSDK) {
    window.playnestSDK.submitScore({
      score: currentScore,
      level: 1
    });
  }
  showInGameModal("🚀 HIGH SCORE SUBMITTED", "Score: " + currentScore + " successfully synced to PlayNest Leaderboard!");
}

function showInGameModal(title, msg) {
  document.getElementById("modal-title").innerText = title;
  document.getElementById("modal-msg").innerText = msg;
  document.getElementById("popup-modal").classList.add("active");
}

function closeInGameModal() {
  document.getElementById("popup-modal").classList.remove("active");
}
`;

  // 3. Create package.json
  const packageJsonContent = JSON.stringify(
    {
      name: projectName,
      version: "1.0.0",
      private: true,
      scripts: {
        start: "npx serve .",
      },
      dependencies: {
        "@playnest/game-sdk": "^1.0.0",
      },
    },
    null,
    2
  );

  fs.writeFileSync(path.join(targetDir, "index.html"), htmlContent);
  fs.writeFileSync(path.join(targetDir, "game.js"), gameJsContent);
  fs.writeFileSync(path.join(targetDir, "package.json"), packageJsonContent);

  console.log(`✅ Created ${projectName} successfully!`);
  console.log(`\nNext steps:`);
  console.log(`  cd ${projectName}`);
  console.log(`  npx serve .\n`);
} else {
  console.log(`
Usage:
  npx @playnest/game-sdk init <project-name>

Example:
  npx @playnest/game-sdk init my-super-game
`);
}
