const Agenda = require('agenda');

const { MONGO_URL } = process.env;

const agenda = new Agenda({
  db: {
    address: MONGO_URL
  }
});

const jobTypes = require('../../constants/jobs');

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