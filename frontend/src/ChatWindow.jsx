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
  } = useContext(MyContext);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
          <div className="dropDownItem">
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
            onChange={(e) =>
              setPrompt(e.target.value)
            }
            onKeyDown={(e) =>
              e.key === "Enter"
                ? getReply()
                : null
            }
          />

          <div
            id="submit"
            onClick={getReply}
          >
            <i className="fa-solid fa-paper-plane"></i>
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