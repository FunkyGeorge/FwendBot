var Discord = require("discord.js");

var bot = new Discord.Client();

var helpBlock = "FwendBot V.0.1.0 \nSay hi, \nSay 'bot.obliterate' to shut me down"

bot.on("message", message => {
	if (message.content === "help"){
		message.reply(helpBlock)
	}
	else if (message.content === "bot.obliterate"){
		message.reply("Shutting down...");
		setInterval(function(){
			exit();
		}, 1000);
		
	}
	else if (message.content === "Hi")
	{
		message.reply("Hi there!");
	}
	else if (containsInuendo(message.content)){
		message.reply("That's what she said!");
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

bot.login("MjI1NzkyNTY2Njk0NTEwNTky.CruNSw.u0YDdAIHqUXBdlj7LDb5IQbiIQA");








