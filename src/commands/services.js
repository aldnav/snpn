import path from 'path';
const __dirname = path.resolve();
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
PouchDB.plugin(PouchDBFind);


export default (ports) => {
    
    let db = new PouchDB(__dirname + '/snpndb');
    let dbIndex = db.createIndex({
        index: {fields: ['servicePort']}
    });

    ports.forEach((port) => {
        let parsedValue = parseInt(port, 10);
        if (isNaN(parsedValue) || !isFinite(port)) {
            throw new TypeError(`"${port}" is not a number`);
        }
        port = parsedValue;

        dbIndex.then(() => {
            return db.find({
                selector: {
                    servicePort: {$eq: parseInt(port)}
                }
            }).then(results => {
                console.log(`Looking up services with port ${port}...`);
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
    })
}