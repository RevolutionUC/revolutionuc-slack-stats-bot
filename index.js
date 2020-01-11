const request = require('request-promise')

module.exports.run = (event, context, callback) => {
    const revucApiKey = process.env.REVUC_API_KEY;
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    const RANDOM_STATS_OPTIONS = ['gender', 'schools', 'majors', 'ethnicities', 'shirtSizes', 'educationLevels', 'allergens'];
    const requestOptions = {
        uri: 'https://revolutionuc-api.herokuapp.com/api/admin/stats',
        headers: {
            'Content-Type': 'Application/json',
            'X-API-KEY': revucApiKey
        },
        json: true
    }
    request(requestOptions)
        .then(stats => {
            const totalRegs = stats.numRegistrants;
            const last24hrs = stats.last24hrs;
            // prepare the slack message and hit the slack webhook url
            let slackMessage = `Good evening organizers! We currently have *${totalRegs}* (:arrow_up: ${last24hrs} in the past 24 hours) students registered for RevolutionUC!
                                  \n:chart_with_upwards_trend: Now for todays random stat about our participants!\n`
            switch (RANDOM_STATS_OPTIONS[Math.floor(Math.random() * RANDOM_STATS_OPTIONS.length)]) {
                case 'gender':
                    slackMessage += `:female-technologist: Here is the breakdown of our participants genders :male-technologist:`
                    stats.gender.forEach((el) => {
                        slackMessage += `\n• ${el.gender} [${el.count}]`;
                    });
                break;
                case 'schools':
                    slackMessage += `:school: Here are the top 5 schools registered for RevolutionUC!`
                    stats.top5schools.forEach((el) => {
                        slackMessage += `\n• ${el.school} [${el.count}]`;
                    });
                break;
                case 'majors':
                    slackMessage += `Here are the top 5 majors of participants registered for RevolutionUC:`
                    stats.top5majors.forEach((el) => {
                        slackMessage += `\n• ${el.major} [${el.count}]`;
                    });
                break;
                case 'ethnicities':
                    slackMessage += `Here is the breakdown of our participants ethnicities:`
                    stats.ethnicities.forEach((el) => {
                        slackMessage += `\n• ${el.ethnicity} [${el.count}]`;
                    });
                break;
                case 'shirtSizes':
                    slackMessage += `:tshirt: Here is the breakdown of our participants shirt sizes:`
                    stats.shirtSizes.forEach((el) => {
                        slackMessage += `\n• ${el.shirtSize} [${el.count}]`;
                    });
                break;
                case 'educationLevels':
                    slackMessage += `Here is the breakdown of our participants education level:`
                    stats.educationLevels.forEach((el) => {
                        slackMessage += `\n• ${el.educationLevel} [${el.count}]`;
                    });
                break;
                case 'allergens':
                    slackMessage += `:penuts: Here is the breakdown of our participants _known_ allergens level :glass_of_milk:`
                    stats.allergens.forEach((el) => {
                        slackMessage += `\n• ${el.allergens} [${el.count}]`;
                    });
                break;
            }
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
