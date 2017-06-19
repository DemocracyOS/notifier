// var mail = require('../../transports').mail
// var jobs = require('../../jobs')
//
// var jobName = 'topic-published'
// var jobNameForSingleUser = 'topic-published-single-recipient'
//
// jobs.define(jobNameForSingleUser, function (job, done) {
//   // email and user *will* exist because only a 'topic-public'
//   // may trigger this job and that queary already scans the DB
//   var data = job.attrs.data
//
//   var params = {
//     template: jobName,
//     to: data.to,
//     vars: [
//       { name: 'TOPIC', content: data.topic.mediaTitle },
//       { name: 'URL', content: data.url },
//       { name: 'USER_NAME', content: data.to.name }
//     ]
//   }
//
//   mail(params, done)
// })
