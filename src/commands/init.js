import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();
import parse from 'csv-parse';
import PouchDB from 'pouchdb';

const NOT_PROVIDED = '';

let initDb = (data) => {
    let db = new PouchDB(__dirname + '/snpndb');
    let services = [];
    for (let index = 0; index < data.length; index++) {
        const el = data[index];
        services.push({
            serviceName: el['Service Name'] ?? NOT_PROVIDED,
            servicePort: parseInt(el['Port Number']) ?? NOT_PROVIDED,
            transportProtocol: el['Transport Protocol'] ?? NOT_PROVIDED,
            description: el['Description'] ?? NOT_PROVIDED,
            assignee: el['Assignee'] ?? NOT_PROVIDED,
            contact: el['Contact'] ?? NOT_PROVIDED,
            reg_date: el['Registration Date'] ?? NOT_PROVIDED,
            modified_date: el['Modification Date'] ?? NOT_PROVIDED,
            reference: el['Reference'] ?? NOT_PROVIDED,
            serviceCode: el['Service Code'] ?? NOT_PROVIDED,
            unauthorizedUseReported: el['Unauthorized Use Reported'] ?? NOT_PROVIDED,
            assignmentNotes: el['Assignment Notes'] ?? NOT_PROVIDED
        });
    }
    db.bulkDocs(services);
}

export default () => {
    console.log('Reading data from tmp csv...');
    fs.readFile(__dirname + '/src/tmp/service-names-port-numbers.csv', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return; // @TODO fetch from url
        }
        parse(data, {
            delimiter: ",",
            trim: true,
            columns: true
        }, (err, output) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Building db...');
            initDb(output);
            console.log('Done.');
        });
    });
    return;
}