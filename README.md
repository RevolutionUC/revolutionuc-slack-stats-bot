# mailchimp-slack-list-updates

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![MIT license](https://img.shields.io/github/license/noahbass/mailchimp-slack-list-updates.svg)]

> Get mailing list updates from MailChimp in your Slack channel :rocket:

__Features__

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

* A MailChimp api key
* A MailChimp list id
* A Slack webhook url

```sh
$ serverless deploy
```

Then set the environment variables found in `.env.example`.
