## WHY?

This is just to quickly start using ChatGPT API in javascript projects.

## SETUP

1. Get your ChatGPT API key from [here](https://platform.openai.com/api-keys).
2. Get your organization id from [here](https://platform.openai.com/account/organization).
3. Save them into the `./keys/chatgpt-key.txt` and `./keys/chatgpt-org.txt` files.
4. Add the `keys` folder to your `.gitignore` file.
5. Add the library to the backend of your project.

```bash
yarn add tamed-chatgpt
```


## API

### init

The `init` function initializes the connection parameters. Additionally it provides a method to log.

| Parameter | Type | Description |
| --- | --- | --- |
| apiUrl | string | API url of the ChatGPT server. Usually it is `https://api.openai.com/v1/chat/completions` |
| apiKey | string | API key of the ChatGPT server. If you followed step 3 above, ypu can use ` fs.readFileSync('./keys/chatgpt-org.txt', 'utf8').trim()` |
| organization | string | Organization id of the ChatGPT server. If you followed step 3 above, you can use `fs.readFileSync('./keys/chatgpt-org.txt', 'utf8').trim()` |
| log | boolean | Optional. If provided, the library will log. |


#### Returns

Returns `undefined`.

#### Example

```javascript
const chatgpt = require('tamed-chatgpt');

const config = {
	organization: fs.readFileSync('./keys/chatgpt-org.txt', 'utf8').trim(), // modify this to your organization
	apiKey: fs.readFileSync('./keys/chatgpt-key.txt', 'utf8').trim(), // modify this to your API key
	apiUrl: "https://api.openai.com/v1/chat/completions",
	log: true
};

chatgpt.init(config);

```

### communicateWithChatGPT

Sends the content to the ChatGPT server and returns the response.

#### Example

```javascript
	const model = "gpt-3.5-turbo";
	const systemMission = "You are a friend which replies with only one word, which is the first word of the user's message.";
	const content = "Hello world";
	const response = await chatgpt.communicateWithChatGPT({ model, systemMission, content });
	// use response.choices[0].message.content here
``````

## License

The license is MIT and full text [here](https://github.com/MehmetKaplan/tamed-stripe/blob/master/LICENSE).

#### Used Modules

Please refer to the [Other Licenses](https://github.com/MehmetKaplan/tamed-chatgpt/tree/main/OtherLicenses) folder for the list of used modules. 