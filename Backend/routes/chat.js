import express from "express";
import Thread from "../models/Thread.js";
import getGroqAPIResponse from "../utils/groq.js";
import searchWeb from "../utils/webSearch.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//test 
router.post("/test", auth, async(req, res) => {
    try{
        const thread = new Thread({
            threadId: "xyz",
            title: "testing New Thread"
        });

        const response =  await thread.save();
        res.send(response);
    } catch(err) {
        console.log(err);
        res.status(500).json({error: "Failed to save in DB"});
    }
});

//Get all threads 
router.get("/thread/user/:userId", async(req, res) => {
    try {

        const { userId } = req.params;

        const threads = await Thread.find({
            userId: userId
        }).sort({ updatedAt: -1 });

        res.json(threads);

    } catch(err) {
        console.log(err);

        res.status(500).json({
            error: "Failed to fetch threads"
        });
    }
});

router.get("/thread/:threadId", async(req, res) => {
    const {threadId} = req.params;

    try {
        const thread = await Thread.findOne({threadId});

        if(!thread){
            res.status(404).json({erro: "Thread not found"});
        }
        res.json(thread.messages);
    } catch(err) {
        console.log(err);
        res.status(500).json({error: "Failed to fetch chat"});
    }
});

router.delete("/thread/:threadId", async (req,res) => {
    const {threadId} = req.params;

    try {
        const deletedThread = await Thread.findOneAndDelete({threadId});

        if(!deletedThread){
            res.status(404).json({error: "Thread not found"});
        }

        res.status(200).json({success : "Thread deleted successfully"});

    } catch(err) {
        console.log(err);
        res.status(500).json({error: "Failed to delete thread"});
    }
});

router.put("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;
    const { title } = req.body;

    try {
        const updatedThread = await Thread.findOneAndUpdate(
            { threadId },
            { title },
            { new: true }
        );

        if (!updatedThread) {
            return res.status(404).json({
                error: "Thread not found"
            });
        }

        res.json(updatedThread);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Failed to rename thread"
        });
    }
});

router.post("/chat", async(req, res) => {
    const {threadId, message, userId} = req.body;

    if(!threadId || !message) {
        res.status(400).json({error: "missing required fields"});
    }

    try {
        let thread = await Thread.findOne({threadId});

        if(!thread) {
            //create a new thread in db
            thread = new Thread({
            threadId,
            userId,
            title: message,
            messages: [
        {
            role: "user",
            content: message
        }
    ]
});
        } else{
            thread.messages.push({role: "user", content: message});
        }

        // const assistantReply = await getGroqAPIResponse(message);

            let finalPrompt = message;

            const searchKeywords = [
              "who is",
              "what is",
              "latest",
              "today",
              "news",
              "current",
              "recent"
            ];

        const shouldSearch = searchKeywords.some(keyword =>
        message.toLowerCase().includes(keyword)
        );

        if (shouldSearch) {
         const webResult = await searchWeb(message);

        finalPrompt = `
            User Question: ${message}

         Web Information:
        ${webResult}

        Answer using the above information.
        `;
    }

    const assistantReply = await getGroqAPIResponse(finalPrompt);

        thread.messages.push({role: "assistant", content: assistantReply});
        thread.updatedAt = new Date();

        await thread.save();
        res.json({reply: assistantReply});

    } catch(err){
        console.log(err);
        res.status(500).json({error: "something went wrong"});
    }
})

export default router;