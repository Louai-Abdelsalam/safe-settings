const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

module.exports = async () => {
    // console.log("about to get secrets ...");
    const client = new SecretsManagerClient();
    // console.log("client created ...");
  
    const getPrivateKeyCommand = new GetSecretValueCommand({ SecretId: "safe-settings-private-key"});
    // console.log("getPrivateKeyCommand created ...");
    const getPrivateKeyResponse = await client.send(getPrivateKeyCommand);
    // console.log("getPrivateKeyResponse created ...");
    // console.log(`PRIVATE_KEY: ${process.env['PRIVATE_KEY']}`);
    process.env['PRIVATE_KEY'] = getPrivateKeyResponse.SecretString;
    // console.log(`PRIVATE_KEY: ${process.env['PRIVATE_KEY']}`);
  
    const getWebhookSecretCommand = new GetSecretValueCommand({ SecretId: "safe-settings-webhook-secret"});
    // console.log("getWebhookSecretCommand created ...");
    const getWebhookSecretResponse = await client.send(getWebhookSecretCommand);
    // console.log("getPrivateKeyResponse created ...");
    // console.log(`WEBHOOK_SECRET: ${process.env['WEBHOOK_SECRET']}`);
    process.env['WEBHOOK_SECRET'] = getWebhookSecretResponse.SecretString;
    // console.log(`WEBHOOK_SECRET: ${process.env['WEBHOOK_SECRET']}`);
};
