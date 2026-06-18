import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";

function ChatWindow() {
  const {
  prompt,
  setPrompt,
  reply,
  setReply,
  currThreadId,
  prevChats,
  setPrevChats,
  setNewChat,
  theme,
  setTheme,
  allThreads
} = useContext(MyContext);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const userName =
  localStorage.getItem("userName");

  const userEmail =
  localStorage.getItem("userEmail");

  const [showSettings, setShowSettings] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const getReply = async () => {
    setLoading(true);
    setNewChat(false);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      message: prompt,
      threadId: currThreadId,
      userId: localStorage.getItem("userId")
     })
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/chat",
        options
      );

      const res = await response.json();

      setReply(res.reply);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (prompt && reply) {
      setPrevChats((prevChats) => [
        ...prevChats,
        {
          role: "user",
          content: prompt,
        },
        {
          role: "assistant",
          content: reply,
        },
      ]);
    }

    setPrompt("");
  }, [reply]);

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

  const startListening = () => {
    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Speech Recognition not supported");
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.onstart = () => {
        console.log("Listening...");
    };

    recognition.onresult = (event) => {
        const transcript =
            event.results[0][0].transcript;

        setPrompt(transcript);
    };

    recognition.onerror = (event) => {
        console.log(event.error);
    };

    recognition.start();
};

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          NeuroChat{" "}
          <i className="fa-solid fa-chevron-down"></i>
        </span>

        <div
          className="userIconDiv"
          onClick={handleProfileClick}
        >
          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="dropDown">
          <div className="profileSection">

    <div className="profileName">
        👤 {userName}
    </div>

    <div className="profileEmail">
        📧 {userEmail}
    </div>

</div>

<hr />
          <div className="dropDownItem" onClick={() => {
            setShowSettings(true);
            setIsOpen(false);
           }}
          >
          <i className="fa-solid fa-gear"></i>
          Settings
        </div>

          <div className="dropDownItem">
            <i className="fa-solid fa-cloud-arrow-up"></i>
            Upgrade Plan
          </div>

          <div
            className="dropDownItem"
            onClick={() =>
              setTheme(
                theme === "dark"
                  ? "light"
                  : "dark"
              )
            }
          >
            <i className="fa-solid fa-circle-half-stroke"></i>
            {theme === "dark"
              ? " Light Mode"
              : " Dark Mode"}
          </div>

          <div
            className="dropDownItem"
            onClick={handleLogout}
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            Log out
          </div>
        </div>
      )}

     
    {showSettings && (
  <div className="settingsOverlay">

    <div className="settingsModal">

      <h2>Settings</h2>

      <div className="settingItem">
        <strong>Name:</strong> {userName}
      </div>

      <div className="settingItem">
        <strong>Email:</strong> {userEmail}
      </div>

      <div className="settingItem">

  <strong>Theme:</strong>

  <button
    onClick={() =>
      setTheme(
        theme === "dark"
        ? "light"
        : "dark"
      )
    }
  >
    Switch to {theme === "dark"
      ? "Light"
      : "Dark"}
  </button>

</div>
      <div className="settingItem">
          <strong>Total Chats:</strong>
          {allThreads.length}
     </div>
      <button
        className="closeSettings"
        onClick={() => setShowSettings(false)}
      >
        Close
      </button>


    </div>

  </div>
)}

      {showSettings && (
  <div
    className="settingsOverlay"
    onClick={() => setShowSettings(false)}
  >
    <div
      className={`settingsModal ${theme}`}
      onClick={(e) => e.stopPropagation()}
    >
      <h2>Settings</h2>

      <div className="settingsRow">
        <strong>Name:</strong> {userName}
      </div>

      <div className="settingsRow">
        <strong>Email:</strong> {userEmail}
      </div>

      <div className="settingsRow">
        <strong>Theme:</strong>
      </div>

      <div className="settingsButtons">
        <button
          onClick={() =>
            setTheme(
              theme === "dark"
                ? "light"
                : "dark"
            )
          }
        >
          Switch to {theme === "dark"
            ? "Light"
            : "Dark"}
        </button>

        <button
          onClick={() =>
            setShowSettings(false)
          }
        >
          Close
        </button>
      </div>

      <div className="settingsRow">
        <strong>Total Chats:</strong>{" "}
        {allThreads?.length || 0}
      </div>
    </div>
  </div>
)}
      <Chat />

      <ScaleLoader
        color="#fff"
        loading={loading}
      />

      <div className="chatInput">
        <div className="inputBox">
  <input
    placeholder="Ask anything"
    value={prompt}
    onChange={(e) => setPrompt(e.target.value)}
    onKeyDown={(e) =>
      e.key === "Enter"
        ? getReply()
        : null
    }
  />

  <div className="inputActions">

    <div
      className="micButton"
      onClick={startListening}
    >
      <i className="fa-solid fa-microphone"></i>
    </div>

    <div
      id="submit"
      onClick={getReply}
    >
      <i className="fa-solid fa-paper-plane"></i>
    </div>

  </div>
</div>

        <p className="info">
          NeuroChat can make mistakes. Check
          important info.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;