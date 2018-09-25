const agenda = require('../api/jobs/agenda');

const execute = (to, subject, template) => {
  const emailOptions = {
    to,
    subject,
    template
  }
  agenda.now('send-email', emailOptions)
}

const commentResolved = (info) => {
  const template = require('../templates/comment-resolved')(info.document);
  execute(info.to, '¡Comment Resolved!', template);  
}

const documentEdited = (info) => {
  const template = require('../templates/document-edited')(info.document);
  execute(info.to, '¡Documnet Edited!', template);
}

const commentLiked = (info) => {
  const CommentLikedTemplate = require('../react-templates/comment-liked');
  const template = CommentLikedTemplate.default({...info.document})

  execute(info.to, '¡Comment Liked!', template);  
}

const strategies = [
  ['comment-resolved', commentResolved],
  ['document-edited', documentEdited],
  ['comment-liked', commentLiked]
];

const strategiesMap = new Map(strategies);

function sendEmail(type, info) {
  if (!strategiesMap.has(type)) {
    throw new Error("The type does'n exists.");
  }
  
  strategiesMap.get(type)(info);
};

module.exports.sendEmail = sendEmail;
