const fetchLean = require('fetch-lean');
const tickLog = require('tick-log');
tickLog.forceColor(true);

const config = {};

const init = (props) => {
	/* istanbul ignore next */
	if (!(props?.apiUrl)) throw new Error('Missing apiUrl');
	/* istanbul ignore next */
	if (!(props?.apiKey)) throw new Error('Missing apiKey');
	/* istanbul ignore next */
	if (!(props?.organization)) throw new Error('Missing organization');
	/* istanbul ignore next */
	if (!(props?.log)) props.log = false;
	Object.assign(config, props);
}

const communicateWithChatGPT = (props) => new Promise(async (resolve, reject) => {
	try {
		/* istanbul ignore next */
		if (!(props?.content)) throw new Error('Missing content');
		/* istanbul ignore next */
		if (!(props?.systemMission)) throw new Error('Missing systemMission');
		/* istanbul ignore next */
		if (props.content.length < 1) throw new Error('content is empty');
		const messages = [];
		/* istanbul ignore next */
		if (props?.systemMission) messages.push({ role: 'system', content: props.systemMission });
		messages.push({ role: 'user', content: props.content });
		/* istanbul ignore next */
		if (JSON.stringify(messages) > 3800) throw new Error('Content and or mission are too long');
		/* istanbul ignore else */
		if (config.log) tickLog.start(`Sending content to ChatGPT: ${props.content}`, true);
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
		/* istanbul ignore else */
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
