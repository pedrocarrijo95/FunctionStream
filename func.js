const fdk=require('@fnproject/fdk');
const axios = require('axios');

fdk.handle(async function(input,ctx){
  
    
    var resp = "a";
    try {
      for(var i=0;i<input.length;i++){
        var msgdata = Buffer.from(input[i].key.toString(), "base64").toString()
        var msgtemp = Buffer.from(input[i].value.toString(), "base64").toString()
        
        var data = JSON.stringify({"data":msgdata,"temperatura":msgtemp});

        var config = {
          method: 'post',
          url: 'https://k3knrkyh5wbw6k8-db202105101327.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/soda/latest/mycollection',
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





