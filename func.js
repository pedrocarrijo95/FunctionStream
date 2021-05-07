const fdk=require('@fnproject/fdk');
const axios = require('axios');

fdk.handle(async function(input,ctx){
  
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
    try {
      const response = await axios(config);
      console.log(resp);
      resp = response.data;
      console.log(response.data);
    } catch (error) {
      console.log(error.response.body);
    }



    return {'message': 'Sucesso: '+resp}

})





