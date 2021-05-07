const fdk=require('@fnproject/fdk');
const axios = require('axios');

fdk.handle(async function(input,ctx){
  
    
    var resp = "a";
    try {
      for(var i=0;i<input.length;i++){
        var msgkey = Buffer.from(input[i].key.toString(), "base64").toString()
        var msgvalue = Buffer.from(input[i].value.toString(), "base64").toString()
        
        var data = JSON.stringify({"key":msgkey,"value":msgvalue});

        var config = {
          method: 'post',
          url: 'https://k3knrkyh5wbw6k8-ajdatabase.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/soda/latest/fruit',
          headers: { 
            'Authorization': 'Basic YWRtaW46T3JhY2xlMTIzNDU2', 
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
      console.log(error.response.body);
    }



    return {'message': 'Sucesso: '+resp}

})





