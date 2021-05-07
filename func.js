const fdk=require('@fnproject/fdk');
var request = require('request');
const axios = require('axios');

fdk.handle(async function(input){
  

    /**try{
      //console.log(data);
      //if(data[0].key != null){
        //var messagekey = Buffer.from(data[0].key.toString(), "base64").toString();
        //console.log("MessageKey: "+messagekey);
        //var messagevalue = Buffer.from(data[0].value.toString(), "base64").toString();
        sodaInsert("fruit","teste","testes");
        console.log("inseriu");
        //console.log("MessageValue: "+messagevalue);
    
      //}
    }
    catch(err){
      console.log("erro: "+err.message);
    }**/

    var data = JSON.stringify({"name":"msgFUNC","count":500});


    var config = {
      method: 'post',
      url: 'https://k3knrkyh5wbw6k8-ajdatabase.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/soda/latest/fruit',
      headers: { 
        'Authorization': 'Basic YWRtaW46T3JhY2xlMTIzNDU2', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    var resp = "a";
    (async () => {
      try {
        const response = await axios(config);
        resp = response.data;
        console.log(response.data);
      } catch (error) {
        console.log(error.response.body);
      }
    })();


    return {'message': 'Sucesso: '+response}

})

//sodaInsert("fruit","teste","testes");

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
    if (error){
      console.log(error.message);
    }
    console.log(response.body);
  });

 
}

async function delay(s) {
  return new Promise(resolve => setTimeout(resolve, s * 1000));
}





