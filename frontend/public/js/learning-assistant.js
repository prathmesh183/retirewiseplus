// ============================================================================
// RETIREWISE+ AI TUTOR - UNIVERSAL LEARNING ASSISTANT
// Works on ALL lesson pages without modification
// ============================================================================

(function() {
  'use strict';

  // ===== AI TUTOR SIDEBAR UI INJECTION =====
  function injectAITutorUI() {
    // Check if already injected to prevent duplicates
    if (document.getElementById("ai-chat-sidebar")) {
      return;
    }

    const html = `
      <div id="ai-chat-sidebar" class="ai-sidebar">
        <div class="ai-sidebar-header">
          <span><i class="fas fa-robot"></i> RetireWise AI Tutor</span>
          <button id="close-ai-chat" type="button" aria-label="Close AI Tutor">✕</button>
        </div>
        <div id="ai-chat-messages" class="ai-messages">
          <div class="message bot-message">
            Hi 👋 I'm your AI tutor. Ask me anything about this lesson.
          </div>
        </div>
        <div class="ai-input-area">
          <input 
            type="text" 
            id="ai-user-input" 
            placeholder="Ask a doubt from this lesson…" 
            aria-label="Ask a question"
          />
          <button id="send-ai-chat" type="button" aria-label="Send message">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>

      <style>
        .ai-sidebar {
          position: fixed;
          top: 0;
          right: -380px;
          width: 360px;
          height: 100vh;
          background: #ffffff;
          z-index: 3000;
          box-shadow: -6px 0 18px rgba(0,0,0,0.12);
          transition: right 0.3s ease;
          display: flex;
          flex-direction: column;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }

        .ai-sidebar.active {
          right: 0;
        }

        .ai-sidebar-header {
          padding: 1.2rem;
          background: #1a3c31;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          flex-shrink: 0;
        }

        .ai-sidebar-header button {
          background: none;
          border: none;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s;
        }

        .ai-sidebar-header button:hover {
          opacity: 0.8;
        }

        .ai-messages {
          flex: 1;
          padding: 1rem;
          overflow-y: auto;
          background: #fdfaf3;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .message {
          max-width: 85%;
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 0.9rem;
          line-height: 1.4;
          word-wrap: break-word;
        }

        .bot-message {
          background: #e8eee1;
          color: #1a3c31;
          align-self: flex-start;
          border-bottom-left-radius: 4px;
        }

        .user-message {
          background: #b59b5d;
          color: white;
          align-self: flex-end;
          border-bottom-right-radius: 4px;
        }

        .typing {
          font-style: italic;
          font-size: 0.8rem;
          color: #777;
        }

        .ai-input-area {
          padding: 0.9rem;
          border-top: 1px solid #eee;
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .ai-input-area input {
          flex: 1;
          border-radius: 20px;
          border: 1px solid #ccc;
          padding: 8px 14px;
          outline: none;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          transition: border-color 0.2s;
        }

        .ai-input-area input:focus {
          border-color: #1a3c31;
          box-shadow: 0 0 0 2px rgba(26, 60, 49, 0.1);
        }

        .ai-input-area button {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: #1a3c31;
          color: white;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ai-input-area button:hover {
          background: #0d1e18;
        }

        .ai-input-area button:active {
          transform: scale(0.95);
        }

        /* Scrollbar styling for chat messages */
        .ai-messages::-webkit-scrollbar {
          width: 6px;
        }

        .ai-messages::-webkit-scrollbar-track {
          background: #fdfaf3;
        }

        .ai-messages::-webkit-scrollbar-thumb {
          background: #b59b5d;
          border-radius: 3px;
        }

        .ai-messages::-webkit-scrollbar-thumb:hover {
          background: #a88f52;
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .ai-sidebar {
            width: 100%;
            right: -100%;
          }

          .message {
            max-width: 90%;
          }
        }

        @media (max-width: 480px) {
          .ai-sidebar-header {
            padding: 1rem;
          }

          .ai-messages {
            padding: 0.75rem;
          }

          .ai-input-area {
            padding: 0.75rem;
            gap: 6px;
          }

          .ai-input-area input {
            padding: 6px 12px;
            font-size: 0.85rem;
          }

          .ai-input-area button {
            width: 32px;
            height: 32px;
          }
        }
      </style>
    `;

    document.body.insertAdjacentHTML("beforeend", html);
  }

  // ===== MESSAGE HELPERS =====
  function addMessage(text, sender) {
    const messagesContainer = document.getElementById("ai-chat-messages");
    if (!messagesContainer) return null;

    const div = document.createElement("div");
    div.className = `message ${sender}-message`;
    div.innerText = text;
    messagesContainer.appendChild(div);
    
    // Auto-scroll to bottom
    setTimeout(() => {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 0);

    return div;
  }

  // ===== GET LESSON TITLE =====
  function getLessonTitle() {
    // Try multiple selectors to get the lesson title
    let title = document.querySelector("h1")?.innerText;
    if (!title) {
      title = document.querySelector("h2")?.innerText;
    }
    if (!title) {
      title = document.title;
    }
    return title || "Mutual Funds";
  }

  // ===== ASK AI FUNCTION =====
  async function askAI() {
    const input = document.getElementById("ai-user-input");
    if (!input) return;

    const question = input.value.trim();
    if (!question) return;

    addMessage(question, "user");
    input.value = "";

    const typing = addMessage("Tutor is thinking…", "bot");
    typing.classList.add("typing");

    try {
      const lessonTitle = getLessonTitle();

      const response = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, lessonTitle })
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      typing.remove();
      addMessage(data.answer, "bot");

    } catch (err) {
      console.error("AI Tutor Error:", err);
      typing.innerText = "⚠️ Sorry, AI is having trouble. Make sure your backend is running on port 5000.";
    }

    // Keep focus on input
    input.focus();
  }

  // ===== EVENT SETUP =====
  function setupEventListeners() {
    const closeBtn = document.getElementById("close-ai-chat");
    const sendBtn = document.getElementById("send-ai-chat");
    const input = document.getElementById("ai-user-input");

    if (closeBtn) {
      closeBtn.addEventListener("click", function(e) {
        e.preventDefault();
        const sidebar = document.getElementById("ai-chat-sidebar");
        if (sidebar) {
          sidebar.classList.remove("active");
        }
      });
    }

    if (sendBtn) {
      sendBtn.addEventListener("click", askAI);
    }

    if (input) {
      input.addEventListener("keypress", function(e) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          askAI();
        }
      });
    }
  }

  // ===== GLOBAL CLICK HANDLER =====
// Change this in learning-assistant.js
window.handleAITutorClick = function() {
  alert("RetireWise+ AI Tutor is coming soon in our v2.0 update! Stay tuned.");
};

  // ===== INITIALIZATION =====
  function initialize() {
    // Inject UI
    injectAITutorUI();
    
    // Setup listeners
    setTimeout(setupEventListeners, 100);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

})();