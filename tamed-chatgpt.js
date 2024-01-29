const fetchLean = require('fetch-lean');
const tickLog = require('tick-log');
tickLog.forceColor(true);

const config = {};

const init = (props) => {
	if (!(props?.apiUrl)) throw new Error('Missing apiUrl');
	if (!(props?.apiKey)) throw new Error('Missing apiKey');
	if (!(props?.organization)) throw new Error('Missing organization');
	if (!(props?.log)) props.log = false;
	Object.assign(config, props);
}

const communicateWithChatGPT = (props) => new Promise(async (resolve, reject) => {
	try {
		if (!(props?.content)) throw new Error('Missing p_content');
		if (!(props?.systemMission)) throw new Error('Missing systemMission');
		if (props.content.length < 1) throw new Error('p_content is empty');
		if (props.systemMission.length < 1) throw new Error('systemMission is empty');
		const messages = [{ role: 'system', content: props.systemMission }, { role: 'user', content: props.content }];
		if (JSON.stringify(messages) > 3800) throw new Error('Content and or mission are too long');
		if (config.log) tickLog.start(`Sending content to ChatGPT for moderation: ${props.content}`, true);
		const response = await fetchLean('POST',
			config.apiUrl,
			{
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${config.apiKey}`,
				'OpenAI-Organization': `${config.organization}`
			},
			{
				model: props.model,
				messages: messages
			},
			true
		);
		/* istanbul ignore next */
		if (response.status !== 200) throw response.error;
		if (config.log) tickLog.success(`Received response from ChatGPT: ${JSON.stringify(response)}`, true);
		return resolve(response);
	} catch (error) /* istanbul ignore next */ {
		if (config.log) tickLog.error(`Error in communicateWithChatGPT: \x1b[0;31m${JSON.stringify(error)}\x1b[0m`, true);
		return reject(error);
	}
});

module.exports = {
	init,
	communicateWithChatGPT
}
