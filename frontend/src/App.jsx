import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MyContext } from "./MyContext.jsx";
import { useState } from "react";
import { v1 as uuidv1 } from "uuid";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const providerValues = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setCurrThreadId,
    newChat,
    setNewChat,
    prevChats,
    setPrevChats,
    allThreads,
    setAllThreads,
  };

  return (
    <Routes>
      {/* default route */}
      <Route path="/" element={<Navigate to="/register" />} />

      {/* auth pages */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* protected chat */}
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <MyContext.Provider value={providerValues}>
              <div className="app">
                <Sidebar />
                <ChatWindow />
              </div>
            </MyContext.Provider>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;