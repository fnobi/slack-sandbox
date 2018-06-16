require('dotenv').config();

const { fetchMemberDictionary, postBotMessage } = require('./lib/slackApi');

const TARGET_CHANNEL = 'sandbox';
const TARGET_USER = 'fnobi';

Promise.resolve().then(() => {
    return fetchMemberDictionary();
}).then((dict) => {
    const userId = dict[TARGET_USER];
    if (!userId) throw new Error(`User '${TARGET_USER}' is not found.`);
    
    return postBotMessage({
        channel: TARGET_CHANNEL,
        text: `<@${userId}> :ghost:`
    }).then((res) => {
        console.log(res);
    });
}).catch((e) => {
    console.error(e);
});
