const fs = require('fs');
const chatgpt = require('./tamed-chatgpt');

const config = {
	organization: fs.readFileSync('./keys/chatgpt-org.txt', 'utf8').trim(), // modify this to your organization
	apiKey: fs.readFileSync('./keys/chatgpt-key.txt', 'utf8').trim(), // modify this to your API key
	apiUrl: "https://api.openai.com/v1/chat/completions",
	log: true
};

const systemMission = "You are a friend which replies with only one word, which is the first word of the user's message.";

beforeAll(() => {
	chatgpt.init(config);
});

test('communicateWithChatGPT', async () => {
	const content = "Hello world";
	const response = await chatgpt.communicateWithChatGPT({ content, systemMission });
	expect(response.status).toBe(200);
	expect(response.data?.choices?.[0]?.text).toBe("Hello");
});
