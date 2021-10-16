import path from 'path';
const __dirname = path.resolve();
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
PouchDB.plugin(PouchDBFind);


export default (port) => {
    let parsedValue = parseInt(port, 10);
    if (isNaN(parsedValue) || !isFinite(port)) {
      throw new TypeError('Not a number.');
    }
    port = parsedValue;

    let db = new PouchDB(__dirname + '/snpndb');
    db.createIndex({
        index: {fields: ['servicePort']}
    }).then(() => {
        console.log(`Looking up services with port ${port}...`);
        return db.find({
            selector: {
                servicePort: {$eq: parseInt(port)}
            }
        }).then(results => {
            if (results.docs.length > 0) {
                for (let index = 0; index < results.docs.length; index++) {
                    const doc = results.docs[index];
                    console.log(`${doc.serviceName} (${doc.transportProtocol})\t${doc.description}`);
                }
            } else {
                console.log("No results.");
            }
        });
    });
}