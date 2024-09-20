#!/bin/bash -e

# npm install --global serverless@3.39.0

# npm install --omit=dev

deploy_cmd_flags="--stage prod"

if [[ -f 'secrets.json' ]]; then
    # sudo apt-get update
    # sudo apt-get install jq

    app_id="$(jq --exit-status --raw-output '.app_id' secrets.json)"
    webhook_secret="$(jq --exit-status --raw-output '.webhook_secret' secrets.json)"
    # extract as single line to later render it into the serverless template
    private_key="$(jq --exit-status '.private_key' secrets.json | sed --expression 's/\"//g')"
    # https://www.serverless.com/framework/docs/guides/parameters
    deploy_cmd_flags+=" --param=\"APP_ID=$app_id\" --param=\"WEBHOOK_SECRET=$webhook_secret\" --param=\"PRIVATE_KEY=$private_key\""

    printf -- "\n\nDeployment flags: '$deploy_cmd_flags'\n\n"
# TODO: allow not passing secrets.json where secretsmanager secret is just not deployed/updated
else
    echo 'secrets.json not found!'
    exit 1
fi

# echo "bash -c \"serverless package $deploy_cmd_flags\""
# bash -c "serverless package $deploy_cmd_flags"

# echo "bash -c \"serverless deploy $deploy_cmd_flags\""
bash -c "serverless deploy $deploy_cmd_flags"
