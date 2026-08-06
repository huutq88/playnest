"use client";

import { useState, useEffect, useRef } from "react";
import { Gamepad2, Play, Save, Upload, Terminal, Code2, Sparkles, CheckCircle2, RotateCcw, BookOpen, Bot, Send, Wand2, Layers, Settings, Cpu, Server, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

interface LocalAiConfig {
  provider: "ollama" | "lmstudio" | "custom_api";
  endpoint: string;
  model: string;
  apiKey?: string;
}

const DEFAULT_AI_CONFIG: LocalAiConfig = {
  provider: "ollama",
  endpoint: "http://localhost:11434",
  model: "qwen2.5-coder",
};

const GAME_TEMPLATES = {
  multiLevel: {
    name: "🏰 Game Vượt 5 Màn Chơi",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Multi-Level Quest</title>
  <style>
    body { margin: 0; padding: 0; background: #090d16; color: #fff; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; overflow: hidden; text-align: center; }
    .card { position: relative; background: #1e1b4b; padding: 2rem; border-radius: 24px; border: 1px solid #6366f1; width: 85%; max-width: 320px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
    .lvl-badge { background: #4338ca; color: #a5b4fc; padding: 6px 14px; border-radius: 12px; font-weight: 900; display: inline-block; margin-bottom: 12px; font-size: 12px; }
    button { background: linear-gradient(90deg, #ec4899, #8b5cf6); border: none; color: white; padding: 12px 24px; font-weight: bold; border-radius: 14px; cursor: pointer; margin-top: 10px; font-size: 14px; width: 100%; }
    .in-game-modal { display: none; position: absolute; inset: 0; background: rgba(15, 23, 42, 0.95); border-radius: 24px; flex-direction: column; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box; backdrop-filter: blur(8px); }
    .in-game-modal.active { display: flex; animation: popIn 0.3s ease-out; }
    @keyframes popIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  </style>
  <script src="https://playnest.zone/sdk/v1/playnest-sdk.js"></script>
</head>
<body>
  <div class="card">
    <div class="lvl-badge" id="lvl-tag">MÀN 1 / 5</div>
    <h2 id="question">Màn 1: 3 + 4 = ?</h2>
    <h3 id="score-txt" style="color:#f472b6;">Điểm: 0</h3>
    <div id="btn-group">
      <button onclick="checkAns(7)">7</button>
      <button onclick="checkAns(10)">10</button>
    </div>

    <div id="popup-modal" class="in-game-modal">
      <h3 id="modal-title" style="color: #34d399; margin-bottom: 8px;">🎉 THÔNG BÁO</h3>
      <p id="modal-msg" style="font-size: 13px; color: #cbd5e1; line-height: 1.5; margin-bottom: 15px;">Nội dung...</p>
      <button onclick="closeInGameModal()" style="background: #3b82f6;">TIẾP TỤC CHƠI</button>
    </div>
  </div>

  <script>
    const GAME_ID = "multi-level-quest";
    const LEVELS = [
      { id: 1, q: "Màn 1: 3 + 4 = ?", opts: [7, 10], correct: 7, pts: 100 },
      { id: 2, q: "Màn 2: 6 x 8 = ?", opts: [42, 48], correct: 48, pts: 200 },
      { id: 3, q: "Màn 3: 100 - 37 = ?", opts: [63, 73], correct: 63, pts: 300 },
      { id: 4, q: "Màn 4: 15 x 3 = ?", opts: [35, 45], correct: 45, pts: 400 },
      { id: 5, q: "🏰 TRÙM CUỐI: 125 + 75 = ?", opts: [200, 250], correct: 200, pts: 1000 }
    ];

    let currentLvlIdx = 0;
    let totalScore = 0;
    let nextAction = null;

    if (window.playnestSDK) {
      window.playnestSDK.init({ gameId: GAME_ID, debug: true });
      const savedLvl = window.playnestSDK.loadProgress("current_level");
      if (savedLvl && savedLvl.levelIdx) {
        currentLvlIdx = savedLvl.levelIdx;
        totalScore = savedLvl.score || 0;
      }
    }

    function showInGameNotice(title, msg, onOk) {
      document.getElementById("modal-title").innerText = title;
      document.getElementById("modal-msg").innerText = msg;
      document.getElementById("popup-modal").classList.add("active");
      nextAction = onOk;
    }

    function closeInGameModal() {
      document.getElementById("popup-modal").classList.remove("active");
      if (nextAction) {
        const fn = nextAction;
        nextAction = null;
        fn();
      }
    }

    function renderLevel() {
      const lvl = LEVELS[currentLvlIdx];
      if (!lvl) {
        document.querySelector(".card").innerHTML = "<h2>🎉 BẠN ĐÃ THẮNG TOÀN BỘ 5 MÀN!</h2><h3>Tổng điểm: " + totalScore + "</h3>";
        if (window.playnestSDK) window.playnestSDK.submitScore({ score: totalScore, level: 5 });
        return;
      }
      document.getElementById("lvl-tag").innerText = "MÀN " + lvl.id + " / 5";
      document.getElementById("question").innerText = lvl.q;
      document.getElementById("score-txt").innerText = "Điểm: " + totalScore;
      document.getElementById("btn-group").innerHTML = lvl.opts.map(o => \`<button onclick="checkAns(\${o})">\${o}</button>\`).join("");
    }

    function checkAns(val) {
      const lvl = LEVELS[currentLvlIdx];
      if (val === lvl.correct) {
        totalScore += lvl.pts;
        if (window.playnestSDK) {
          window.playnestSDK.completeLevel(lvl.id, totalScore);
          window.playnestSDK.saveProgress("current_level", { levelIdx: currentLvlIdx + 1, score: totalScore });
        }
        showInGameNotice("🎉 CHÍNH XÁC!", "Bạn được cộng +" + lvl.pts + " điểm. Sẵn sàng cho Màn " + (lvl.id + 1) + "!", () => {
          currentLvlIdx++;
          renderLevel();
        });
      } else {
        showInGameNotice("❌ CHƯA ĐÚNG!", "Rất tiếc, kết quả chưa chính xác. Hãy thử chọn đáp án khác nhé!", null);
      }
    }

    renderLevel();
  </script>
</body>
</html>`,
  },
  tapArcade: {
    name: "⚡ Speed Tap Arcade",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Speed Tap Arcade</title>
  <style>
    body { margin: 0; padding: 0; background: #090d16; color: #fff; font-family: system-ui, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; overflow: hidden; text-align: center; }
    .card { position: relative; background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 24px; border: 1px solid rgba(255,255,255,0.1); width: 80%; }
    button { background: linear-gradient(90deg, #ec4899, #8b5cf6); border: none; color: white; padding: 14px 28px; font-weight: bold; border-radius: 16px; cursor: pointer; margin-top: 15px; font-size: 14px; }
    .score { font-size: 2.5rem; font-weight: 900; color: #f472b6; margin: 10px 0; }
    .in-game-modal { display: none; position: absolute; inset: 0; background: rgba(15, 23, 42, 0.95); border-radius: 24px; flex-direction: column; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box; }
    .in-game-modal.active { display: flex; }
  </style>
  <script src="https://playnest.zone/sdk/v1/playnest-sdk.js"></script>
</head>
<body>
  <div class="card">
    <h2>⚡ Speed Tap Arcade</h2>
    <p>Chạm thật nhanh trước khi hết giờ!</p>
    <div class="score" id="score">0</div>
    <button onclick="addScore()">CHẠM GHI ĐIỂM (+100)</button>
    <br>
    <button onclick="submitScore()" style="background: linear-gradient(90deg, #10b981, #059669); margin-top: 12px;">GỬI BẢNG XẾP HẠNG</button>

    <div id="popup-modal" class="in-game-modal">
      <h3 style="color: #34d399;">🚀 THÀNH TÍCH MỚI</h3>
      <p id="modal-msg" style="font-size: 13px; color: #cbd5e1; margin-bottom: 15px;">Đã gửi điểm số!</p>
      <button onclick="closeModal()" style="background: #3b82f6;">ĐÓNG</button>
    </div>
  </div>

  <script>
    const GAME_ID = "speed-tap-arcade";
    let score = 0;

    if (window.playnestSDK) {
      window.playnestSDK.init({ gameId: GAME_ID, debug: true });
    }

    function addScore() {
      score += 100;
      document.getElementById("score").innerText = score;
    }

    function submitScore() {
      if (window.playnestSDK) {
        window.playnestSDK.submitScore({ score: score, level: 1 });
      }
      document.getElementById("modal-msg").innerText = "🚀 Đã gửi điểm " + score + " lên Bảng Xếp Hạng PlayNest!";
      document.getElementById("popup-modal").classList.add("active");
    }

    function closeModal() {
      document.getElementById("popup-modal").classList.remove("active");
    }
  </script>
</body>
</html>`,
  },
};

export default function PlayNestStudioPage() {
  const [code, setCode] = useState(GAME_TEMPLATES.multiLevel.code);
  const [title, setTitle] = useState("Game Vượt 5 Màn Chơi");
  const [slug, setSlug] = useState("multi-level-quest-" + Date.now().toString().slice(-4));
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [aiConfig, setAiConfig] = useState<LocalAiConfig>(DEFAULT_AI_CONFIG);
  const [logs, setLogs] = useState<Array<{ type: string; message: string; timestamp: string }>>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const router = useRouter();

  // Load User Local AI Config from LocalStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("playnest_user_local_ai_config");
      if (saved) {
        try {
          setAiConfig(JSON.parse(saved));
        } catch {}
      }
    }
  }, []);

  const saveAiConfig = (newConfig: LocalAiConfig) => {
    setAiConfig(newConfig);
    localStorage.setItem("playnest_user_local_ai_config", JSON.stringify(newConfig));
    setShowConfigModal(false);
    addLog("SYSTEM", `Đã lưu cấu hình Local AI (${newConfig.provider} @ ${newConfig.endpoint})`);
  };

  const addLog = (type: string, message: string) => {
    setLogs((prev) => [
      { type, message, timestamp: new Date().toLocaleTimeString() },
      ...prev.slice(0, 49),
    ]);
  };

  const runGameInSandbox = () => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(code);
        doc.close();
        addLog("SYSTEM", "Game đã được nạp và khởi chạy trong Sandbox");
      }
    }
  };

  useEffect(() => {
    runGameInSandbox();

    const handleMessage = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== "object") return;
      const { type, payload } = event.data;

      if (type === "PLAYNEST_GAME_READY") {
        addLog("SDK", `Bắt tay thành công! Game ID: ${payload?.gameId}`);
      } else if (type === "PLAYNEST_SUBMIT_SCORE") {
        addLog("SCORE", `Nhận điểm số từ SDK: ${payload?.score} (Màn: ${payload?.level || 1})`);
      } else if (type === "PLAYNEST_LEVEL_COMPLETE") {
        addLog("LEVEL", `Hoàn thành Màn ${payload?.levelId}! Điểm: ${payload?.score}`);
      } else if (type === "PLAYNEST_SAVE_PROGRESS") {
        addLog("SAVE", `Lưu tiến trình Cloud key [${payload?.key}]`);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [code]);

  // Generate Code using User's Local PC AI Engine (Ollama / LM Studio / Local API)
  const handleGenerateAiGame = async (customPrompt?: string) => {
    const promptToUse = customPrompt || aiPrompt;
    if (!promptToUse.trim()) {
      alert("Vui lòng nhập ý tưởng game muốn AI tạo!");
      return;
    }

    setIsGeneratingAi(true);
    addLog("AI", `Đang gửi yêu cầu tới User Local AI (${aiConfig.provider} @ ${aiConfig.endpoint})...`);

    const systemPrompt = `You are an expert HTML5 Game Developer for kids and beginners on PlayNest Platform.
    Generate a complete single-file HTML5 web game based on the user's prompt.
    CRITICAL REQUIREMENTS:
    1. Include <script src="https://playnest.zone/sdk/v1/playnest-sdk.js"></script> in <head>.
    2. Initialize SDK: window.playnestSDK.init({ gameId: "custom-game-id", debug: true }).
    3. Call window.playnestSDK.submitScore({ score: totalScore }) when score is added or game finishes.
    4. Use custom HTML in-game popup dialog instead of browser alert().
    5. Return ONLY executable HTML code without markdown codeblocks or explanation.`;

    try {
      if (aiConfig.provider === "ollama") {
        const response = await fetch(`${aiConfig.endpoint}/api/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: aiConfig.model || "qwen2.5-coder",
            prompt: `${systemPrompt}\n\nUser Request: ${promptToUse}`,
            stream: false,
          }),
        });

        const data = await response.json();
        if (data && data.response) {
          let generated = data.response.replace(/```html/g, "").replace(/```/g, "").trim();
          setCode(generated);
          setTitle(`🎮 Game AI (${aiConfig.model})`);
          addLog("AI", `Nhận mã nguồn từ Ollama Local AI trên máy User thành công!`);
        } else {
          throw new Error("Không nhận được phản hồi từ Ollama");
        }
      } else {
        // Fallback or LM Studio OpenAI-compatible endpoint
        const response = await fetch(`${aiConfig.endpoint}/v1/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(aiConfig.apiKey ? { Authorization: `Bearer ${aiConfig.apiKey}` } : {}),
          },
          body: JSON.stringify({
            model: aiConfig.model || "local-model",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: promptToUse },
            ],
          }),
        });

        const data = await response.json();
        if (data && data.choices && data.choices[0]) {
          let generated = data.choices[0].message.content.replace(/```html/g, "").replace(/```/g, "").trim();
          setCode(generated);
          setTitle(`🎮 Game AI Custom Local`);
          addLog("AI", `Nhận mã nguồn từ Local AI Server thành công!`);
        } else {
          throw new Error("Local AI Server không phản hồi đúng định dạng JSON");
        }
      }
    } catch (err: any) {
      addLog("ERROR", `Không thể kết nối Local AI trên máy User: ${err.message}. Đang dùng chế độ Fallback Engine...`);
      // Fallback Engine if User Local AI is not active on PC
      setCode(GAME_TEMPLATES.multiLevel.code);
      setTitle(`🎮 Game AI Fallback (${promptToUse})`);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handlePublish = async () => {
    if (!title || !slug) {
      alert("Vui lòng điền Tên Game và Slug!");
      return;
    }

    setIsPublishing(true);
    try {
      const res = await fetch("/api/v1/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          description: "Game được tạo bằng User Local AI trên máy tính cá nhân và xuất bản lên PlayNest",
          thumbnailUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
          gameUrl: "/play/" + slug,
          orientation: "portrait",
          engine: "canvas",
          developer: "PlayNest Local AI Developer",
          version: "1.0.0",
          sdkVersion: "1.0.0",
          sdkIntegrated: true,
          featured: true,
        }),
      });

      const json = await res.json();
      if (json.success) {
        alert("🎉 Xuất bản game từ User Local AI lên PlayNest Portal thành công!");
        router.push("/games");
      } else {
        alert("Lỗi xuất bản: " + json.error);
      }
    } catch (err: any) {
      alert("Lỗi kết nối API: " + err.message);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <Sparkles className="w-7 h-7 text-pink-400" />
            PlayNest User Local AI Game Studio
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Lập trình game cho trẻ em kết nối với <strong>User Local AI Server (Ollama / LM Studio)</strong> chạy trực tiếp trên máy người dùng.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowConfigModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-200 border border-cyan-500/30 text-xs font-bold transition-all cursor-pointer"
          >
            <Settings className="w-4 h-4" />
            <span>⚙️ Cấu Hình Local AI ({aiConfig.provider})</span>
          </button>

          <button
            onClick={runGameInSandbox}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/30 text-xs font-bold transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Nạp Lại Sandbox</span>
          </button>

          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 text-white text-xs font-black shadow-lg shadow-pink-900/30 transition-all cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>{isPublishing ? "Đang Xuất Bản..." : "Xuất Bản Lên PlayNest"}</span>
          </button>
        </div>
      </div>

      {/* User Local AI Settings Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-3xl border border-cyan-500/40 max-w-lg w-full space-y-5 bg-[#090d16] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                Cấu Hình User Local AI Server (Trên Máy Cá Nhân)
              </h2>
              <button onClick={() => setShowConfigModal(false)} className="text-gray-400 hover:text-white font-bold text-lg">
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Loại AI Server Chạy Trên Máy Bạn</label>
                <select
                  value={aiConfig.provider}
                  onChange={(e) =>
                    setAiConfig({
                      ...aiConfig,
                      provider: e.target.value as any,
                      endpoint: e.target.value === "ollama" ? "http://localhost:11434" : "http://localhost:1234",
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                >
                  <option value="ollama">Ollama Local AI (http://localhost:11434)</option>
                  <option value="lmstudio">LM Studio / Jan.ai (http://localhost:1234)</option>
                  <option value="custom_api">Custom Endpoint / Cloud API Key</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Local Endpoint URL</label>
                <input
                  type="text"
                  value={aiConfig.endpoint}
                  onChange={(e) => setAiConfig({ ...aiConfig, endpoint: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono"
                  placeholder="http://localhost:11434"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Tên Model AI Trên Máy Bạn</label>
                <input
                  type="text"
                  value={aiConfig.model}
                  onChange={(e) => setAiConfig({ ...aiConfig, model: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono"
                  placeholder="qwen2.5-coder, llama3.2, deepseek-r1"
                />
              </div>

              {aiConfig.provider === "custom_api" && (
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">API Key (Nếu có)</label>
                  <input
                    type="password"
                    value={aiConfig.apiKey || ""}
                    onChange={(e) => setAiConfig({ ...aiConfig, apiKey: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono"
                    placeholder="sk-..."
                  />
                </div>
              )}

              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-[11px] text-cyan-200/90 leading-relaxed">
                💡 <strong>Hướng dẫn setup nhanh:</strong> Mở Terminal trên máy tính của bạn và gõ <code>ollama run qwen2.5-coder</code> để khởi chạy AI Local Server hoàn toàn miễn phí không cần Internet!
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
              >
                Hủy
              </button>
              <button
                onClick={() => saveAiConfig(aiConfig)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:opacity-90 text-white text-xs font-bold shadow-lg"
              >
                Lưu Cấu Hình AI Local
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Local AI Prompt-to-Game Generator Bar */}
      <div className="p-5 rounded-2xl glass-panel border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-purple-950/20 to-pink-950/40 space-y-3 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-cyan-400 animate-bounce" />
            <span>🤖 User Local AI Co-Pilot ({aiConfig.provider} - Model: {aiConfig.model})</span>
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCode(GAME_TEMPLATES.multiLevel.code);
                setTitle(GAME_TEMPLATES.multiLevel.name);
              }}
              className="px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Tải Game 5 Màn Chơi</span>
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder={`Nhập ý tưởng game cho AI trên máy bạn... VD: 'Tạo game hái táo 500 điểm' (Đang dùng ${aiConfig.provider})`}
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerateAiGame()}
            className="flex-1 px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
          />
          <button
            onClick={() => handleGenerateAiGame()}
            disabled={isGeneratingAi}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:opacity-90 text-white text-xs font-black shadow-lg shadow-cyan-900/40 transition-all cursor-pointer"
          >
            <Wand2 className="w-4 h-4" />
            <span>{isGeneratingAi ? "Local AI Đang Sinh Code..." : "Tạo Game Bằng Local AI"}</span>
          </button>
        </div>
      </div>

      {/* Main Split-Pane Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Pane: Code Editor */}
        <div className="lg:col-span-7 glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-pink-400" />
              <span>HTML5 & Game SDK Code Studio</span>
            </h2>
            <span className="text-[10px] bg-pink-950/60 border border-pink-500/30 text-pink-300 px-2.5 py-0.5 rounded-full font-mono">
              Local AI Enabled
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 mb-1">Tên Game</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 mb-1">Slug URL</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-mono"
              />
            </div>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={18}
            className="w-full p-4 rounded-xl bg-slate-950 border border-white/10 text-pink-200 font-mono text-xs leading-relaxed focus:outline-none focus:border-pink-500/50 resize-none shadow-inner"
            placeholder="Dán mã nguồn HTML5/JS tại đây..."
          />
        </div>

        {/* Right Pane: Sandbox & Live Event Monitor */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Mobile Viewport Frame */}
          <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1.5 font-bold text-white">
                <Gamepad2 className="w-4 h-4 text-purple-400" />
                <span>Mobile Preview (9:16 Viewport)</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold">SDK Live Connection</span>
            </div>

            <div className="relative w-full max-w-[320px] aspect-[9/16] mx-auto rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-2xl bg-black">
              <iframe ref={iframeRef} title="PlayNest Studio Sandbox" className="w-full h-full border-0" />
            </div>
          </div>

          {/* Real-time SDK Event Monitor */}
          <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-3">
            <h3 className="text-xs font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Bảng Theo Dõi Sự Kiện SDK (Real-time Console)</span>
            </h3>

            <div className="h-44 overflow-y-auto p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] space-y-1.5 scrollbar-thin">
              {logs.length === 0 ? (
                <div className="text-gray-500 text-center py-8">Chưa có sự kiện SDK nào...</div>
              ) : (
                logs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-2 leading-tight">
                    <span className="text-gray-500 text-[10px] font-mono">{log.timestamp}</span>
                    <span
                      className={`font-extrabold uppercase px-1 rounded text-[9px] ${
                        log.type === "SDK"
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
                          : log.type === "SCORE"
                          ? "bg-pink-950 text-pink-300 border border-pink-500/30"
                          : log.type === "LEVEL"
                          ? "bg-amber-950 text-amber-300 border border-amber-500/30"
                          : log.type === "AI"
                          ? "bg-cyan-950 text-cyan-300 border border-cyan-500/30"
                          : "bg-purple-950 text-purple-300 border border-purple-500/30"
                      }`}
                    >
                      {log.type}
                    </span>
                    <span className="text-gray-200 flex-1">{log.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
