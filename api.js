 const Discord = require("discord.js");
  let esi = require('eve-swagger');
  var eveonlinejs = require('eveonlinejs')
  const client = new Discord.Client();
  

  var role1;
  var member1;
  var corpid = 1;
  var toonID;
  var keyID1;
  var vCode1;


client.login(process.env.BOT_TOKEN);


  client.on("ready", () => {
    console.log("I am ready!");
});


function corpID(newState) {
    setTimeout(function () {
      esi.characters(toonID).info().then(result => {
        corpid = result.corporation_id;

        if(result.corporation_id = "98465358"){
          member1.addRole(role1).catch(console.error);
        }

      }).catch(error => {
        console.error(error);
      });

    }, 1500);
}

function AUTH(){

  // Set default parameters (useful for setting keyID and vCode)
  eveonlinejs.setParams({
    keyID: keyID1,
    vCode: vCode1
  })

  eveonlinejs.fetch('account:Characters', function (err, result) {
    var apiString = JSON.stringify(result.characters);
    var apiArray = apiString.split("\"");
    toonID = apiArray[1];
  })

  corpID();
};





  client.on("message", (message) => {

    //check if message starts with the prefix or its not a bot
        if (!message.content.startsWith("api=") || message.author.bot) return;

                if (message.content.includes("=")){

                  role1 = message.guild.roles.find("name", "FNG");
                  member1 = message.member;

                    var coolVar = message.content;
                    var partsArray = coolVar.split("=");

                  keyID1 = partsArray[1]; 
                  vCode1 = partsArray[2]; 

                    message.delete()
                    AUTH();

                };

        
  });


