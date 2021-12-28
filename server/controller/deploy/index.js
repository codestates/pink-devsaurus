const { verifyIntegrity } = require('../utils/githubFunctions');
const { exec } = require('child_process');
require('dotenv').config();

module.exports = async (req, res) => {
  if (!verifyIntegrity(req)) {
    console.log('[GITHUB Webhook] Unauthorized request detected');
    return;
  }

  if (req.header('X-GitHub-Event') !== 'pull_request')
    return res.status(200).send('OK');
  if (!req.body.pull_request.merged) return res.status(200).send('OK');
  if( req.body.base.repo.id !== process.env.GITHUB_REPO_ID ) {
    console.log(`[GITHUB Webhook] Repo ID mismatch: ${req.body.base.repo.id} / TARGET: ${process.env.GITHUB_REPO_ID}`);
    return res.status(200).send('OK');
  }
  //automation here
  console.log('[GITHUB Webhook] Pull request merged, automation here');

  //req.body.base.ref  <- req.body.head.ref
  //req.body.base.repo.html_url,  process.env.GITHUB_DEPLOY_CLIENT
  switch (req.body.base.ref) {
    case 'main':

      break;
    case 'dev':

      break;
    case 'dev-back':

      break;
  }

  res.status(200).send('OK');
};
