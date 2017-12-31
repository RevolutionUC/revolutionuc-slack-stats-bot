# mailchimp-slack-list-updates

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
![MIT license](https://img.shields.io/github/license/noahbass/mailchimp-slack-list-updates.svg)
![GitHub tag](https://img.shields.io/github/tag/noahbass/mailchimp-slack-list-updates.svg)

> Get mailing list updates from MailChimp in your Slack channel :rocket:

__Features__

* Runs on serverless (AWS Lambda by default, but configurable for other providers in `serverless.yml`)
* Gets the number of subscribers in a MailChimp list
* Hits a Slack webhook with a message
* _Three_ random emoji included in each message :gem: :taco: :whale:
* Runs every other day (customizable in `serverless.yml`)

__Example Message__

```
Mailing list subscriber count as of today: *80* :dromedary_camel: :open_book: :baby_chick:
```

## Deploy

You'll need these to get started:

* [A MailChimp api key](https://kb.mailchimp.com/integrations/api-integrations/about-api-keys#Find-or-Generate-Your-API-Key): `MAILCHIMP_API_KEY`
* [A MailChimp list id](https://kb.mailchimp.com/lists/manage-contacts/find-your-list-id): `MAILCHIMP_LIST_ID`
* [A Slack incoming webhook](https://my.slack.com/services/new/incoming-webhook/): `SLACK_WEBHOOK_URL`

Then, to deploy:

```sh
$ serverless deploy
```

Then set the environment variables (from above) in the Lambda console.

To test immediately (without waiting for the scheduled event), invoke the function from the CLI:

```sh
$ serverless invoke --function run
```
