const fdk=require('@fnproject/fdk');
var request = require('request');


fdk.handle(function(data){
  
  (async () => {
    try{
      //console.log(data);
      if(data[0].key != null){
        var messagekey = Buffer.from(data[0].key.toString(), "base64").toString();
        console.log("MessageKey: "+messagekey);
        var messagevalue = Buffer.from(data[0].value.toString(), "base64").toString();
        console.log("MessageValue: "+messagevalue);
        await sodaInsert("fruit","teste","testes");
        await delay(1);
      }
    }
    catch(err){
      console.log("erro: "+err.message);
    }
  })();

    return {'message': 'Sucesso'}

})

//sodaInsert("fruit","a","b");

async function sodaInsert(collection,messagekey,messagevalue){
  var options = {
    'method': 'POST',
    'url': 'https://k3knrkyh5wbw6k8-ajdatabase.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/soda/latest/'+collection,
    'headers': {
      'Authorization': 'Basic YWRtaW46T3JhY2xlMTIzNDU2',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"key":messagekey,"value":messagevalue})
  
  };
  request(options, function (error, response) {
    if (error){
      console.log(error.message);
    }
    console.log(response.body);
  });

  await delay(2);
}

async function delay(s) {
  return new Promise(resolve => setTimeout(resolve, s * 1000));
}

