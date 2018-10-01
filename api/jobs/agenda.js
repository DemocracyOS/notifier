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

async function graceful() {
  console.log('Stopping agenda service...')
  try {
    await agenda.stop();
    process.exit(0)
  } catch (error) {
    process.exit(1)
  }  
}

process.on('SIGTERM', graceful)
process.on('SIGINT', graceful)

module.exports = agenda;