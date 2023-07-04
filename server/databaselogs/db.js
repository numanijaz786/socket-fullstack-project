const Pool = require('pg').Pool;

const client = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "12345678",
    database: "projectonoff"

});

// client.connect();

client.query("SELECT * FROM button", (err, { rows })=>{

    if ( err ){
        console.log({ err });
    } else {
        console.log( rows );
    }

    // client.end();

});
module.exports={client}