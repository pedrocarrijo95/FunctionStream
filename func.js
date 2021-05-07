const fdk=require('@fnproject/fdk');

var fs = require('fs');
const st = require("oci-streaming");
const common = require("oci-common");

var messageslist = [];
//const oracledb = require('oracledb');
//oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient_19_8' });

/**fdk.handle(function(data){
  let dados = "nao chegou nada";
  if(data){
    dados = data;
  }
  console.log(dados);
  return {'message': 'Sucesso: '+dados}

})**/

console.log(Buffer.from('eyJrZXkiOiAib2kiLCAidmFsdWUiOiAidmFsb3JPSSJ9', "base64").toString());

