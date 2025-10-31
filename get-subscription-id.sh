#!/bin/bash

# This will show you all subscription types and their IDs
# You'll need a HubSpot API key from Settings > Integrations > Private Apps

echo "Enter your HubSpot API key (create one in Settings > Integrations > Private Apps):"
read -s API_KEY

curl -s "https://api.hubapi.com/email/public/v1/subscriptions" \
  -H "Authorization: Bearer $API_KEY" | jq '.subscriptionDefinitions[] | {id: .id, name: .name, description: .description}'

