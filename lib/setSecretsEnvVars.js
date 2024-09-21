const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

module.exports = async () => {
    const client = new SecretsManagerClient();
  
    const getPrivateKeyCommand = new GetSecretValueCommand({ SecretId: "safe-settings-private-key"});
    const getPrivateKeyResponse = await client.send(getPrivateKeyCommand);
    process.env['PRIVATE_KEY'] = getPrivateKeyResponse.SecretString;
  
    const getWebhookSecretCommand = new GetSecretValueCommand({ SecretId: "safe-settings-webhook-secret"});
    const getWebhookSecretResponse = await client.send(getWebhookSecretCommand);
    process.env['WEBHOOK_SECRET'] = getWebhookSecretResponse.SecretString;
}
