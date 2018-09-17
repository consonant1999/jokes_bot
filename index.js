var request = require("request");
var SlackBot = require('slackbots');
// create a bot
console.log(process.env)
var bot = new SlackBot({
    token: envBotToken, // Add a bot https://my.slack.com/services/new/bot and put the token
    name: 'Jokes Bot'
});

bot.on("message", msg => {
  switch (msg.type) {
  case "message":
    if (msg.channel[0] === "D" && msg.bot_id === undefined) {
      getRandomJoke(postMessage, msg.user)
    }
    break
  }
})

const getRandomJoke = (callback, user) => {
  return request("https://icanhazdadjoke.com/slack", (error, response) => {
    if (error) {
      console.log("Error: ", error)
    } else {
      let jokeJSON = JSON.parse(response.body)
      let joke = jokeJSON.attachments[0].text
      return callback(joke, user)
    }
  })
}

const postMessage = (message, user) => {
  bot.postMessage(user, message, { as_user: true })
}