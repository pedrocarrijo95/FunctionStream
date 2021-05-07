const fdk=require('@fnproject/fdk');
var request = require('request');


fdk.handle(function(data){
  

    try{
      //console.log(data);
      if(data[0].key != null){
        var messagekey = Buffer.from(data[0].key.toString(), "base64").toString();
        console.log("MessageKey: "+messagekey);
        var messagevalue = Buffer.from(data[0].value.toString(), "base64").toString();
        console.log("MessageValue: "+messagevalue);
        var options = {
          'method': 'POST',
          'url': 'https://k3knrkyh5wbw6k8-ajdatabase.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/soda/latest/fruit',
          'headers': {
            'Authorization': 'Basic YWRtaW46T3JhY2xlMTIzNDU2',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"key":messagekey,"value":messagevalue})
        
        };
        request(options, function (error, response) {
          if (error) throw new Error(error);
          console.log(response.body);
        });  
      }
    }
    catch(err){
      console.log("erro: "+err.message);
    }

    return {'message': 'Sucesso'}

})

//sodaInsert("fruit","a","b");

function sodaInsert(collection,messagekey,messagevalue){
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
    if (error) throw new Error(error);
    console.log(response.body);
  });
}


