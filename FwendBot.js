var express = require("express");
var Discord = require("discord.js");

var port = 8000;
var app = express();
var bot = new Discord.Client();
var key = require('./keys');

var active = true;

var helpBlock = 
`FwendBot V.0.1.1 
Say hi,
Say 'bot.off' to shut me down,
Say 'bot.on' to start me back up`;

bot.on("message", message => {
	if (active){
		switch (message.content){
			case "bot.help":
			case "bot version":
			case "bot -v":
				message.reply(helpBlock);
				break;
			case "bot.off":
				active = false;
				message.reply("Shutting down...");
				break;
			case "Hi":
				message.reply("Hi there!");
				break;
			default:
				if (containsInuendo(message.content)){
					message.reply("That's what she said!");
				}
				break;
		}
	} else {
		if (message.content === "bot.on"){
			active = true;
			message.reply("I'm back...");
		}
	}
});

var containsInuendo = function(message){
	var nouns = ["this","that","thats","that's","it","it's"];
	var verbs = ["hard","thick","big","large","long","gigantic","wet"];
	var containsNoun = false;
	var containsVerb = false;
	var i = 0

	while (i < nouns.length && !containsNoun){
		if (containsSubstring(nouns[i], message.toLowerCase())){
			containsNoun = true;
		}
		i++;
	}
	i = 0;

	while (i < verbs.length && ! containsVerb){
		if (containsSubstring(verbs[i], message.toLowerCase())){
			containsVerb = true;
		}
		i++;
	}

	if (containsVerb && containsNoun){
		return true
	}
	else {
		return false
	}
}

var containsSubstring = function(str, message){
	var word = ""
	message += " "
	for (var i = 0; i < message.length; i++){
		if (message[i] != " "){
			word += message[i];
		} 
		else {
			if (word == str){
				return true;
			}
			else {
				word = "";
			}
		}
	}
	return false;

}

bot.login(key);

app.listen(port, function(){
	console.log(`Listening on port ${port}`);
});







