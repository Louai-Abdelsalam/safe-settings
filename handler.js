const setSecretsEnvVars = require('./lib/setSecretsEnvVars');

const {
  createLambdaFunction,
  createProbot
} = require('@probot/adapter-aws-lambda-serverless')

const appFn = require('./')

module.exports.webhooks = async () => {
  await setSecretsEnvVars();
  return createLambdaFunction(appFn, {
    probot: createProbot()
  })
}

module.exports.scheduler = async function () {
  await setSecretsEnvVars();
  const probot = createProbot()
  const app = appFn(probot, {})
  return app.syncInstallation()
}
