require('dotenv').config()

const assert = require('chai').assert
const proxyquire = require('proxyquire')
const nock = require('nock')
const index = require('./index')

const mailchimpListId = process.env.MAILCHIMP_LIST_ID
const mailchimpApiKey = process.env.MAILCHIMP_API_KEY
const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL

let indexMock = null

describe('mailchimp-slack-list-updates', () => {
    beforeEach(() => {
        // mock requests to the `random` method in the `node-emoji` dependency
        indexMock = proxyquire('./index', {
            'node-emoji': { random: () => { return { key: 'dragon' } }}
        })
        // GET request to the MailChimp api
        nock(`https://${mailchimpApiKey.substring(33)}.api.mailchimp.com/3.0`)
            .get(`/lists/${mailchimpListId}?fields=stats`)
            .reply(200, { stats: { member_count: 10 } })
        // POST request to the Slack api
        nock('https://hooks.slack.com/services/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')
            .post('', { text: 'Mailing list subscriber count as of today: *10* :dragon: :dragon: :dragon:' })
            .reply(200, {})
    })

    it('should retrieve from MailChimp and post to Slack', (done) => {
        indexMock.run(null, null, (error, result) => {
            if (error) {
                throw new Error(error)
            }

            assert.isOk(result)
            assert.isTrue(result.message.ok)
            done()
        })
    })
})
