require('dotenv').config()

const MailChimp = require('mailchimp-api-v3')
const request = require('request-promise')
const emoji = require('node-emoji')

module.exports.run = (event, context, callback) => {
    const mailchimpListId = process.env.MAILCHIMP_LIST_ID
    const mailchimpApiKey = process.env.MAILCHIMP_API_KEY
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL

    const mailchimp = new MailChimp(mailchimpApiKey)

    mailchimp.get(`/lists/${mailchimpListId}`, { fields: 'stats' })
        .then(result => {
            // get the current member count from the MailChimp list
            const stats = result.stats
            const memberCount = stats.member_count
            return memberCount
        })
        .then(memberCount => {
            // prepare the slack message and hit the slack webhook url
            const randomEmoji = [1,2,3].map(() => `:${emoji.random().key}:`).join(' ')
            const slackMessage = `Mailing list subscriber count as of today: *${memberCount}*`
            const options = {
                method: 'POST',
                uri: slackWebhookUrl,
                body: { text: slackMessage },
                json: true
            }
            return request(options)
        })
        .then(() => {
            // all done!
            callback(null, { message: { ok: true } })
        })
        .catch(error => {
            // something went wrong... :(
            console.error(error)
            callback(error, null)
        })
}
