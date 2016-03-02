
1.0.1 / 2016-03-02
==================

  * Correctly fallback missing translations to English

0.0.16 / 2016-02-03
===================

  * Re-add topic-published job

0.0.15 / 2015-11-03
===================

  * Fix locale on comment-reply email
  * Added ability to send notifications in the language of the target user

0.0.14 / 2015-10-29
==================

 * Force disable the topic-published action treatment
 * update mongojs and authentication method
 * update agenda

0.0.12 / 2015-10-02
===================

  * Using democracyos/agenda because npm version is outdated and does not work with MongoLab

0.0.10 / 2015-08-25
===================

  * Replace mailchimp for nodemailer #6
  * Fix missing opts reference
  * Fix default options & add default sender

0.0.9 / 2015-08-06
==================

  * Remove second parameter from done callback

0.0.8 / 2015-08-06
==================

  * Remove checking for 'done' being defined before calling it

0.0.7 / 2015-08-06
==================

  * Add topic-published job handler
  * Add topic voted job handler
  * Add topic commented job handler
  * Add .eslintrc file

0.0.6 / 2015-08-01
==================

 * Add topic-published event

0.0.5 / 2015-07-30
==================

 * Add comment-reply job

0.0.4 / 2015-07-30
==================

 * Update log usage
 * Fix `data` parameter missusage

0.0.3 / 2015-07-30
==================

 * Fix relative require paths

0.0.2 / 2015-07-30
==================

 * Add welcome-email job for events `signup` and `resend-validation`
 * Refactor part of events/jobs tier
 * Refactor forgot-password semantics to reset-password
 * Update debug log labels

0.0.1 / 2015-07-29
==================

 * Notifications engine and support for `forgot-password` event
