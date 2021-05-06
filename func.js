const fdk=require('@fnproject/fdk');


var fs = require('fs');
const st = require("oci-streaming");
const common = require("oci-common");

var messageslist = [];
//const oracledb = require('oracledb');
//oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient_19_8' });

fdk.handle(function(data){

  console.log(data);
  return {'message': 'Sucesso: '+data}

})

