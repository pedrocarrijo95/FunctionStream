const fdk=require('@fnproject/fdk');
var request = require('request');


fdk.handle(function(data){
  
  if(data.message != null){
    //console.log(dados);

    var messagekey = Buffer.from(dados.key, "base64").toString();
    var messagevalue = Buffer.from(dados.value, "base64").toString();
    sodaInsert("fruit",messagekey,messagevalue);
  }
  

  return {'message': 'Sucesso: '+dados}

})

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


