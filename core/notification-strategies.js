const agenda = require('../api/jobs/agenda');
const { NODE_ENV } = process.env;

const basePath = NODE_ENV === 'production' ? '../dist/templates' : '../templates';

const execute = (to, subject, template) => {
  const emailOptions = {
    to,
    subject,
    template
  }
  agenda.now('send-email', emailOptions)
}

const buildTemplate = (fileName, props) => {
  const path = `${basePath}/${fileName}`;
  const reactTemplate = require(path);

  return reactTemplate({...props});
}

const commentRead = (info) => {
  const template = buildTemplate('comment-read', info.document);
  execute(info.to, '¡Coment Read!', template);
}

const commentLiked = (info) => {
  const template = buildTemplate('comment-liked', info.document);
  execute(info.to, '¡Comment Liked!', template);
}

const commentClosed = (info) => {
  const template = buildTemplate('comment-closed', info.document);
  execute(info.to, '¡Comment Closed!', template);
}

const commentContribution = (info) => {
  const template = buildTemplate('comment-contribution', info.document);
  execute(info.to, '¡Comment Contribution!', template);
}

const strategies = [
  ['comment-read', commentRead],
  ['comment-liked', commentLiked],
  ['comment-contribution', commentContribution],
  ['comment-closed', commentClosed]
];

const strategiesMap = new Map(strategies);

function sendEmail(type, info) {
  if (!strategiesMap.has(type)) {
    throw new Error("The type does'n exists.");
  }

  strategiesMap.get(type)(info);
};

module.exports.sendEmail = sendEmail;
