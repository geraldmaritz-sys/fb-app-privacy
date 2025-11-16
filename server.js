import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// VERIFY TOKEN YOU WILL ENTER IN META
const VERIFY_TOKEN = "geraldverify123";

// 1️⃣ VERIFICATION ENDPOINT (Facebook calls this first)
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    console.log("Webhook verified!");
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

// 2️⃣ RECEIVE EVENTS (Messages, Status updates, etc.)
app.post("/webhook", (req, res) => {
  console.log("Incoming webhook event:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// Render uses PORT provided by environment
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Webhook running on port ${PORT}`));
