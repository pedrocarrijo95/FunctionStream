const oracledb = require('oracledb');

oracledb.initOracleClient({ libDir: './instantclient_19_6' });
oracledb.autoCommit = true;
async function run() {

  let connection;

  try {

    connection = await oracledb.getConnection({ user: "admin", password: "Oracle123456", connectionString: "ajdiotdemo_high" });

    // Create the parent object for SODA
    const soda = connection.getSodaDatabase();
 
    // Create a new SODA collection
    // This will open an existing collection, if the name is already in use.
    //collection = await soda.createCollection("mycollection");
    collection = await soda.openCollection("mycollection");
    
    // Insert a document.  A system generated key is created by default.
    content = {name: "Teste3", address: {city: "Melbourne"}};
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
}

run();





    // Create a table

    /**await connection.execute(`begin
                                execute immediate 'drop table nodetab';
                                exception when others then if sqlcode <> -942 then raise; end if;
                              end;`);

    await connection.execute(`create table nodetab (id number, data varchar2(20))`);

    // Insert some rows

    const sql = `INSERT INTO nodetab VALUES (:1, :2)`;

    const binds =
      [ [1, "First" ],
        [2, "Second" ],
        [3, "Third" ],
        [4, "Fourth" ],
        [5, "Fifth" ],
        [6, "Sixth" ],
        [7, "Seventh" ] ];

    await connection.executeMany(sql, binds);

    //connection.commit();     // uncomment to make data persistent

    // Now query the rows back

    const result = await connection.execute(`SELECT * FROM nodetab`);

    console.dir(result.rows, { depth: null });**/