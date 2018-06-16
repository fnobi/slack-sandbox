const request = require('request-promise');
const _ = require('lodash');

const API_ORIGIN = 'https://slack.com/api/';
const API_TOKEN = process.env.API_TOKEN;

function callApi({ method = 'get', path, params = {} }) {
    return request({
        method,
        uri: `${API_ORIGIN}${path}`,
        json: true,
        qs: _.assignIn({
            pretty: 1,
            token: API_TOKEN
        }, params)
    });
}

function fetchMemberDictionary() {
    return callApi({ path: 'users.list' }).then((body) => {
        const { members } = body;
        return _(members).mapKeys('name').mapValues('id').value();
    });
}

function postBotMessage({ channel, text }) {
    return callApi({
        path: 'chat.postMessage',
        params: {
            channel,
            text,
            as_user: true,
        }
    });
}

module.exports = {
    fetchMemberDictionary,
    postBotMessage,
};
