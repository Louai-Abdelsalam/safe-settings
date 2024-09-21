const setSecretsEnvVars = require('./lib/setSecretsEnvVars');

const {
  createLambdaFunction,
  createProbot
} = require('@probot/adapter-aws-lambda-serverless')

const appFn = require('./')

module.exports.webhooks = async (event, context, callback) => {
  await setSecretsEnvVars();
  const lambdaFunction = createLambdaFunction(appFn, {
    probot: createProbot()
  });
  return lambdaFunction(event, context);
}

module.exports.scheduler = async function () {
  await setSecretsEnvVars();
  const probot = createProbot()
  const app = appFn(probot, {})
  return app.syncInstallation()
}
