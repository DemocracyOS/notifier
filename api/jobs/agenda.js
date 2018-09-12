const Agenda = require('agenda');

const { AGENDA_COLLECTION, MONGO_URL, JOB_TYPES } = process.env;

let agenda = new Agenda({
  db: {
    address: MONGO_URL,
    collection: AGENDA_COLLECTION
  }
});

let jobTypes = JOB_TYPES ? JOB_TYPES.split(',') : [];

jobTypes.forEach(type => {
  require(`./jobs/${type}`)(agenda);
});

if(jobTypes.length) {
  agenda.on('ready', () => {
    agenda.start();
  });
}

function graceful() {
  agenda.stop(() => process.exit(0));
}

process.on('SIGTERM', graceful)
process.on('SIGINT', graceful)

module.exports = agenda;