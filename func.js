const fdk=require('@fnproject/fdk');
const axios = require('axios');

fdk.handle(async function(input,ctx){
  
    
    var resp = "a";
    try {
      for(var i=0;i<input.length;i++){
        var msgdatastr = Buffer.from(input[i].key.toString(), "base64").toString() //key: data+timestamp 
                                                                                   //value:json-customizado
                                                                                   //*Reflection
        //var msgdata = Date(msgdatastr);
        var msgtemp = Buffer.from(input[i].value.toString(), "base64").toString();
        var msgtempint = parseInt(msgtemp,10);
        
        var data = JSON.stringify({"data":msgdatastr,"temperatura":msgtempint}); //bloco inteiro

        var config = {
          method: 'post',
          url: 'https://qeixw2pkavq6sio-atpcarrijodb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/soda/latest/mycollection',
          headers: { 
            'Authorization': 'Basic YWRtaW46T3JhY2xlMTI0NDI5', 
            'Content-Type': 'application/json'
          },
          data : data
        };

        const response = await axios(config);
        console.log(resp);
        resp = response.data;
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.response);
    }



    return {'message': 'Sucesso: '+resp}

})





