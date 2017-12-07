const Discord = require("discord.js");
  let esi = require('eve-swagger');
  var eveonlinejs = require('eveonlinejs')
  const client = new Discord.Client();
  
  var GoogleSpreadsheet = require('google-spreadsheet');
  var async = require('async');

  var role1;
  var member1;
  var corpid = 1;
  var toonID;
  var toonName;
  var toonCorp;
  var toon2ID;
  var toon2Name;
  var toon2Corp;
  var toon3ID;
  var toon3Name;
  var toon3Corp;
  var keyID1;
  var vCode1;
  var accessMask = "https://community.eveonline.com/support/api-key/CreatePredefined?accessMask=8388608";

  // spreadsheet key is the long id in the sheets URL 
var doc = new GoogleSpreadsheet(process.env.GOOGLESHEET);
var sheet;
var oldRow = 0;
var oldCol = 0;


client.login(process.env.BOT_TOKEN);


  client.on("ready", () => {
    console.log("I am ready!");
});


function AUTH(){

  // Set default parameters (useful for setting keyID and vCode)
  eveonlinejs.setParams({
    keyID: keyID1,
    vCode: vCode1
  })



  eveonlinejs.fetch('account:Characters', function (err, result) {
    if (result !== undefined){
  //console.log(result.characters);
    var apiString = JSON.stringify(result.characters);
    var apiArray = apiString.split("\"");
    toonID = apiArray[1];
    toonName = apiArray[5];
    toonCorp = apiArray[17];
    toon2ID = apiArray[43];
    toon2Name = apiArray[39];
    toon2Corp = apiArray[51];
    toon3ID = apiArray[77];
    toon3Name = apiArray[73];
    toon3Corp = apiArray[85];
    corpIDOld();
    }else {
      client.fetchUser(member2)
         .then(user => {user.send("There was a problem with your API, Please use the below link to create an accepatble API: \n" + accessMask)})
    }
  })
};

function corpIDOld(newState) {


        if(toonCorp == 98465358 || toon2Corp == 98465358 || toon3Corp == 98465358 ){

          client.fetchUser(member2)
              .then(user => {user.send("You are officially a new member to Sleeper Dreams \nYour roles have been assigned!!")})

                      doc.getInfo(function(err, info) {
                        sheet = info.worksheets[0];
                        oldRow = sheet.rowCount
                        oldCol = sheet.colCount
                      });
           
                setTimeout(function () {
                  sheet.getCells({
                    'min-row': oldRow,
                      //'max-row': 3,
                    'return-empty': true
                    }, function(err, cells) {

                    //console.log(cells[0].value+cells[1].value+cells[2].value);

                    sheet.resize({rowCount: oldRow+1, colCount: oldCol}); //async 
                    oldRow=oldRow+1

                    // bulk updates make it easy to update many cells at once 
                    cells[0].value = memberUserName;
                    cells[1].value = member2;
                    cells[2].value = keyID1;
                    cells[3].value = vCode1;
                    cells[4].value = toonName;
                    cells[5].value = toonID;
                    cells[6].value = toon2Name;
                    cells[7].value = toon2ID;
                    cells[8].value = toon3Name;
                    cells[9].value = toon3ID;
                    cells[10].value = toonCorp;
                    cells[11].value = toon2Corp;
                    cells[12].value = toon3Corp;
                    sheet.bulkUpdateCells(cells); //async 

                  });
                }, 1500);


          member1.addRole(role1).catch(console.error);
        } 




}



  client.on("message", (message) => {

    //check if message starts with the prefix or its not a bot
        if (!message.content.startsWith("api") || message.author.bot) return;
              
              member1 = message.member;
              member2 = message.author.id
              memberUserName = message.author.username

                if (message.content.startsWith("api=")){
                    var coolVar = message.content;
                    var partsArray = coolVar.split("=");

                  keyID1 = partsArray[1]; 
                  vCode1 = partsArray[2]; 

                  if (message.channel.type === 'dm'){
                      message.author.send("Please enter your api key in the public channel.\nDon't worry, it will be deleted instantly.");
                    return;
                  };
                    role1 = message.guild.roles.find("name", "FNG");
                    AUTH();
                    message.delete()
                };
                        
    if (message.channel.type === 'dm'){
            message.author.send("Please enter your api key in the public channel.\nDon't worry, it will be deleted instantly.");
        return;
        };

        if (message.content === ("api")){
            message.author.send("Hello and welcome to the Sleeper Dreams discord server! If you're a new member to our corp, head over to: " + accessMask + "\n \n Create/submit a new api key (you don't have to change any fields if you used the aformentioned link, just give it a name), and then enter your api key in the public channel (it will be deleted instantly) in the following format api=[keyID]=[vCode]without brackets, no space on the equals sign. \n \n Example: api=1771670=hjasldf8asdfihasdfi09aasdf09");
        };
  });


async.series([
  function setAuth(step) {
    var creds_json = {
      client_email: process.env.EMAIL_TOKEN,
      private_key: process.env.PRIVATE_KEY
    }
 
    doc.useServiceAccountAuth(creds, step);
  },
  function getInfoAndWorksheets(step) {
    doc.getInfo(function(err, info) {
      sheet = info.worksheets[0];
      oldRow = sheet.rowCount
      oldCol = sheet.colCount
      step();
    });
  },
  ], function(err){
    if( err ) {
      console.log('Error: '+err);
    }
});
