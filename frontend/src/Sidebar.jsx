import "./Sidebar.css";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

function Sidebar() {
    const {
        allThreads,
        setAllThreads,
        currThreadId,
        setNewChat,
        setPrompt,
        setReply,
        setCurrThreadId,
        setPrevChats
    } = useContext(MyContext);

    const [showRenameModal, setShowRenameModal] = useState(false);
    const [renameText, setRenameText] = useState("");
    const [selectedThread, setSelectedThread] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const getAllThreads = async () => {
    try {
        const userId = localStorage.getItem("userId");

        const response = await fetch(
        `http://localhost:8000/api/thread/user/${userId}`
        );

        const res = await response.json();

        const filteredData = res.map(thread => ({
            threadId: thread.threadId,
            title: thread.title
        }));

        setAllThreads(filteredData);

    } catch (err) {
        console.log(err);
    }
};

    useEffect(() => {
        getAllThreads();
    }, [currThreadId]);

    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
    };

    const changeThread = async (newThreadId) => {
        setCurrThreadId(newThreadId);

        try {
            const response = await fetch(
                `http://localhost:8000/api/thread/${newThreadId}`
            );

            const res = await response.json();

            setPrevChats(res);
            setNewChat(false);
            setReply(null);

        } catch (err) {
            console.log(err);
        }
    };

    const renameThread = (threadId) => {
        setSelectedThread(threadId);
        setShowRenameModal(true);
    };

    const saveRename = async () => {
        try {
            await fetch(
                `http://localhost:8000/api/thread/${selectedThread}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: renameText
                    })
                }
            );

            getAllThreads();
            setShowRenameModal(false);
            setRenameText("");

        } catch (err) {
            console.log(err);
        }
    };

    const deleteThread = async (threadId) => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/thread/${threadId}`,
                {
                    method: "DELETE"
                }
            );

            const res = await response.json();
            console.log(res);

            setAllThreads(prev =>
                prev.filter(
                    thread => thread.threadId !== threadId
                )
            );

            if (threadId === currThreadId) {
                createNewChat();
            }

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className="sidebar">

            <button onClick={createNewChat}>
                <img
                    src="src/assets/blacklogo.png"
                    alt="logo"
                    className="logo"
                />
                <span>
                    <i className="fa-solid fa-pen-to-square"></i>
                </span>
            </button>

            <ul className="history">
                {allThreads?.map((thread, idx) => (
                    <li
    key={idx}
    onClick={() => changeThread(thread.threadId)}
    className={thread.threadId === currThreadId ? "highlighted" : ""}
>
    <span>{thread.title}</span>

    <div className="thread-actions">
            <i
                 className="fa-solid fa-pen"
                onClick={(e) => {
                e.stopPropagation();
                renameThread(thread.threadId);
            }}
             ></i>

             <i
                className="fa-solid fa-trash"
                onClick={(e) => {
                e.stopPropagation();
                deleteThread(thread.threadId);
            }}
             ></i>
        </div>
        </li>
                ))}
            </ul>

            {showRenameModal && (
                <div className="rename-modal">
                    <div className="rename-box">

                        <h3>Rename Thread</h3>

                        <input
                            type="text"
                            value={renameText}
                            onChange={(e) =>
                                setRenameText(e.target.value)
                            }
                            placeholder="Enter new thread name"
                        />

                        <div className="rename-buttons">
                            <button onClick={saveRename}>
                                Save
                            </button>

                            <button
                                onClick={() => {
                                    setShowRenameModal(false);
                                    setRenameText("");
                                }}
                            >
                                Cancel
                            </button>
                        </div>

                    </div>
                </div>
            )}

            <div className="sign">
                <p>
                    By Rutuja Khade &hearts;
                </p>
            </div>

        </section>
    );
}

export default Sidebar;

