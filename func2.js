const fdk=require('@fnproject/fdk');


var fs = require('fs');
const st = require("oci-streaming");
const common = require("oci-common");

var messageslist = [];
//const oracledb = require('oracledb');
//oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient_19_8' });

fdk.handle(function(data){
// TODO: Fill in appropriate values for tenancy (str) / fingerprint (str) / passphrase(optional) (str | null) / privateKey (str) / region (common.Region)
const tenancy = "ocid1.tenancy.oc1..aaaaaaaah2c25pobzyzvkcznnozputxfxtz3qvewrqaga7z66tdjrgvigbiq";
const user = "ocid1.user.oc1..aaaaaaaakkczxk5vdewknybdqfkogenlhu2isoymowv7kze6mdmvt23qg6oa";
const fingerprint = "79:37:8b:64:13:2d:e7:f8:2e:dc:7d:64:88:e2:bc:b6";
const passphrase = null; // optional parameter
const privateKey = fs.readFileSync("./key/privatekey.pem");
const region = common.Region.US_ASHBURN_1; // Change to appropriate region

const provider = new common.SimpleAuthenticationDetailsProvider(
  tenancy,
  user,
  fingerprint,
  privateKey,
  passphrase,
  region
);

const compartmentId = "ocid1.compartment.oc1..aaaaaaaaf6jo7uwxdg3k3qngbvw43wodwzyxwamvxtejqb7hnrb5j6rsrfjq";
const exampleStreamName = "StreamingHubiTeam";
const partitions = 1;

const adminClient = new st.StreamAdminClient({ authenticationDetailsProvider: provider });
const client = new st.StreamClient({ authenticationDetailsProvider: provider });
const waiters = adminClient.createWaiters();

var jsonstring = "Iniciando...";
console.log("mensagem:"+ jsonstring); 


(async () => {
  try{
    let connection = await oracledb.getConnection({ user: "admin", password: "Oracle123456", connectionString: "ajdiotdemo_high" });

  
    // Create the parent object for SODA
    const soda = connection.getSodaDatabase();
   
    // Create a new SODA collection
    //collection = await soda.createCollection("mycollection");
    collection = await soda.openCollection("mycollection");
            
    var messagekey = Buffer.from(data.key, "base64").toString();
    var messagevalue = Buffer.from(data.value, "base64").toString();
    
    // Insert a document.  A system generated key is created by default.
    content = {key: messagekey, value: messagevalue};
    doc = await collection.insertOneAndGet(content);
    const key = doc.key;
    console.log("The key of the new SODA document is: ", key);
         
    // Fetch the document back
    doc = await collection.find().fetchArraySize(0).key(key).getOne(); // A SodaDocument
    content = doc.getContent();                                        // A JavaScript object
    console.log(content);
      
  } catch (err) {
     console.error(err);
  } finally {
  if (connection) {
    try {
      await connection.close();
    } catch (err) {
      console.error(err);
    }
  }
  }
  
})();

return {'message': 'Sucesso'}
})


async function getOrCreateStream(compartmentId, paritions, exampleStreamName) {
  const listStreamsRequest = {
    compartmentId: compartmentId,
    name: exampleStreamName,
    lifecycleState: st.models.Stream.LifecycleState.Active.toString()
  };
  const listStreamsResponse = await adminClient.listStreams(listStreamsRequest);

  if (listStreamsResponse.items.length !== 0) {
    console.log("An active stream with name %s was found.", exampleStreamName);
    const getStreamRequest = {
      streamId: listStreamsResponse.items[0].id
    };
    const getStreamResponse = await adminClient.getStream(getStreamRequest);
    return getStreamResponse.stream;
  }
  console.log("No active stream named %s was found.", exampleStreamName);
  console.log("Creatong stream with paritions" + partitions);
  const createStreamDetails = {
    name: exampleStreamName,
    compartmentId: compartmentId,
    partitions: partitions
  };
  const creatStreamRequest = {
    createStreamDetails: createStreamDetails
  };
  const createStreamResponse = await adminClient.createStream(creatStreamRequest);
  // GetStream provides details about a specific stream.
  // Since stream creation is asynchronous; we need to wait for the stream to become active.
  const getStreamRequest = {
    streamId: createStreamResponse.stream.id
  };
  const activeStream = await waiters.forStream(
    getStreamRequest,
    st.models.Stream.LifecycleState.Active
  );
  console.log("Create Stream executed successfully.");
  // Give a little time for the stream to be ready.
  await delay(1);
  return activeStream.stream;
}

async function getCursorByPartition(client, streamId, partition) {
  console.log("Creating a cursor for partition %s.", partition);
  let cursorDetails = {
    partition: partition,
    type: st.models.CreateCursorDetails.Type.TrimHorizon
  };
  const createCursorRequest = {
    streamId: streamId,
    createCursorDetails: cursorDetails
  };
  const createCursorResponse = await client.createCursor(createCursorRequest);
  return createCursorResponse.cursor.value;
}

async function simpleMessageLoop(client, streamId, initialCursor) {
  let cursor = initialCursor;
  for (var i = 0; i < 15; i++) {
    const getRequest = {
      streamId: streamId,
      cursor: cursor,
      limit: 15
    };
    const response = await client.getMessages(getRequest);
    console.log("Read %s messages.", response.items.length);
    var i = 0;
    for (var message of response.items) {
      messageslist[i] = new Object();
      messageslist[i].key = Buffer.from(message.key, "base64").toString();
      messageslist[i].value = Buffer.from(message.value, "base64").toString();
      i++;
    }
    // getMessages is a throttled method; clients should retrieve sufficiently large message
    // batches, as to avoid too many http requests.
    await delay(2);
    cursor = response.opcNextCursor;
  }
}

async function getCursorByGroup(client, streamId, groupName, instanceName) {
  console.log("Creating a cursor for group %s, instance %s.", groupName, instanceName);
  const cursorDetails = {
    groupName: groupName,
    instanceName: instanceName,
    type: st.models.CreateGroupCursorDetails.Type.TrimHorizon,
    commitOnGet: true
  };
  const createCursorRequest = {
    createGroupCursorDetails: cursorDetails,
    streamId: streamId
  };
  const response = await client.createGroupCursor(createCursorRequest);
  return response.cursor.value;
}

async function delay(s) {
  return new Promise(resolve => setTimeout(resolve, s * 1000));
}



  