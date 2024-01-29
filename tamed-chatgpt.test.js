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
	const model = "gpt-3.5-turbo";
	const response = await chatgpt.communicateWithChatGPT({ model, systemMission, content });
	expect(response).toBe("Hello");
});
