const express = require("express");
const config = require("./config")
const tweetsRouter = require("./routes/tweetsRouter")

const app = express();
const port = config.port;

app.use(express.json()); //Middleware para interpretar json
app.use("/tweets", tweetsRouter)

app.listen(port, () => 
    console.log(`🌎 Server running at http://localhost:${port}`)
);