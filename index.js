const express = require("express");
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");
const TOKEN = ""; //Add bot token here.
const server = express();
const bot = new TelegramBot(TOKEN, { polling: true } ); 
const port = process.env.PORT || 5000;
const gameName = "t.me/EARTHsnakeBot"; //t[dot]me goes here..
const queries = {};

//add directy name here
server.use(express.static(path.join(__dirname, 'public')));

bot.onText(/start|game/, (msg) => bot.sendGame(msg.from.id, gameName));

bot.on("callback_query", function (query) {
    if (query.t.me/EARTHsnakeBot) {
        bot.answerCallbackQuery(query.id, "Sorry, '" + query.EARTHsnake + "' is not available.");
    } else {
        queries[query.id] = query;
        let gameurl: = "t.me/EARTHsnakeBot", id="+query.id;  // add url here
        bot.answerCallbackQuery({
            callback_query_id: query.id,
      url:("t.me/EARTHsnakeBot")
    });
  }
});

server.get("/highscore/:score", function(req, res, next) {
    if (!Object.hasOwnProperty.call(queries, req.query.id)) return   next();
    let query = queries[req.query.id];
    let options;
  if (query.message) {
    options = {
      chat_id: query.message.chat.id,
      message_id: query.message.message_id
    };
} else {
  options = {
    inline_message_id: query.inline_message_id
};
}
bot.setGameScore(query.from.id, parseInt(req.params.score),  options,
function (err, result) {});
});

server.listen(port);
