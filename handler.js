(async () => {
  const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");
  await Promise.resolve(console.log('🎉'));
  console.log("about to get secrets ...");
  const client = new SecretsManagerClient();
  console.log("client created ...");

  const getPrivateKeyCommand = new GetSecretValueCommand({ SecretId: "safe-settings-private-key"});
  console.log("getPrivateKeyCommand created ...");
  const getPrivateKeyResponse = await client.send(getPrivateKeyCommand);
  console.log("getPrivateKeyResponse created ...");
  console.log(`PRIVATE_KEY: ${process.env['PRIVATE_KEY']}`);
  process.env['PRIVATE_KEY'] = getPrivateKeyResponse.SecretString;
  console.log(`PRIVATE_KEY: ${process.env['PRIVATE_KEY']}`);

  const getWebhookSecretCommand = new GetSecretValueCommand({ SecretId: "safe-settings-webhook-secret"});
  console.log("getWebhookSecretCommand created ...");
  const getWebhookSecretResponse = await client.send(getWebhookSecretCommand);
  console.log("getPrivateKeyResponse created ...");
  console.log(`WEBHOOK_SECRET: ${process.env['WEBHOOK_SECRET']}`);
  process.env['WEBHOOK_SECRET'] = getWebhookSecretResponse.SecretString;
  console.log(`WEBHOOK_SECRET: ${process.env['WEBHOOK_SECRET']}`);
// })();
// console.log("after the async function ...");

// const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");
// // await Promise.resolve(console.log('🎉'));
// console.log("about to get secrets ...");
// const client = new SecretsManagerClient();
// console.log("client created ...");
// const getPrivateKeyCommand = new GetSecretValueCommand({ SecretId: "safe-settings-private-key"});
// console.log("getPrivateKeyCommand created ...");
// // console.log("Hello world!");
// client.send(getPrivateKeyCommand)
//   .then(getPrivateKeyResponse => {
//     console.log(process.env['PRIVATE_KEY']);
//     process.env['PRIVATE_KEY'] = getPrivateKeyResponse.SecretString;
//     console.log(process.env['PRIVATE_KEY']);
//   })
//   .catch(err => {
//     console.error(err);
//   });

console.log("Completed setting all environment variables ...");

const {
  createLambdaFunction,
  createProbot
} = require('@probot/adapter-aws-lambda-serverless')

const appFn = require('./')

module.exports.webhooks = createLambdaFunction(appFn, {
  probot: createProbot()
})

module.exports.scheduler = function () {
  const probot = createProbot()
  const app = appFn(probot, {})
  return app.syncInstallation()
}
})();
console.log("after the async function ...");