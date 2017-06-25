const Graceful = require('node-graceful')
const pify = require('pify')
const config = require('./lib/config')

// Load translations
require('./lib/translations')

const notifier = module.exports = {}

/**
 * Notifier Init
 * Initialize async dependencies, including DB connection, jobs, etc
 *
 * @method init
 * @return {Notifier}
 */

notifier.init = function init () {
  return Promise.all([
    require('./lib/db'),
    require('./lib/mailer'),
    require('./lib/agenda')
  ]).then(([db, mailer, agenda]) => {
    notifier.db = db
    notifier.mailer = mailer
    notifier.agenda = agenda

    /**
     * Promisified verions of Agenda#every, Agenda#schedule and
     * Agenda#now methods
     */
    ;['every', 'schedule', 'now'].forEach((method) => {
      notifier[method] = pify(agenda[method].bind(agenda))
    })

    return Promise.resolve(notifier)
  }).then((notifier) => {
    return require('./lib/jobs').init(notifier)
  }).catch((err) => { throw err })
}

/**
 * Notifier Server Start
 * Start processing jobs
 *
 * @method start
 * @return {Notifier}
 */

notifier.start = function start () {
  return notifier.init().then(() => {
    notifier.agenda.start()

    Graceful.on('exit', () => notifier.agenda.stop())

    return Promise.resolve(notifier)
  }).catch((err) => { throw err })
}

/**
 * Expose config, this allows the overriding of any config option.
 * @return {Config}
 */

notifier.config = config

/**
 * Expose db connection using mongojs
 * Will be defined after the call of init()
 * @return {MongoJS}
 */

notifier.db = null

/**
 * Expose Agenda instance
 * Will be defined after the call of init()
 * @return {Agenda}
 */

notifier.agenda = null

/**
 * Email sender utility
 * Will be defined after the call of init()
 * @return {Mailer}
 */

notifier.mailer = null
