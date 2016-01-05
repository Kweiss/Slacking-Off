var monk = require('monk');
var db = monk(process.env.MONGOLAB_URI);
var errorText = "Something broke :cry:";

var userHandlers = {

  //Add a new user to the game! Make sure they're not already playing first.
  addUser: function(bot, message) {
    bot.api.users.info({user: message.user}, function(err, data) {
      if(err) { return bot.reply(message, errorText); }
      db.get('users').findById(message.user, function (err, doc){
        if(doc) {
          return bot.reply(message, "You're already playing :face_with_rolling_eyes:");
        } else {
          //rename id so mongo isn't dumb
          data.user["id"] = data.user["_id"];
          delete data.user["id"];
          db.get('users').insert(user, function (err, doc) {
            if(err) { return bot.reply(message, errorText); }
            return bot.reply(message, "Alright dude, you're in the game!");
          });
        }
      });
    });
  }
}

module.exports = userHandlers;