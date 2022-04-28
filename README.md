# Serverless OpenAI Interface
Quick deployment of AWS API Gateway which receives SMS data from Twillio, then sends the text message as a question to OpenAI's [default-chat sample](https://beta.openai.com/examples/default-chat), then creates a text message with the response from OpenAI and returns it to the user via SMS. 

## Setup
1. Setup AWS CLI on your machine [AWS Install Guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
2. Install dependencies with NPM. Serverless will need the generated node modules to setup the lambda function
```
npm i
```
3. Declare environment variables as below

```
ACCOUNT_SID=YOURTWILLIOSID
AUTH_TOKEN=YOURTWILLIOAUTHTOKEN
OPENAI_API_KEY=YOUROPENAIAPIKEY
PHONE=YOURTWILLIOPHONENUMBER
```

4. Deploy with serverless
```
serverless deploy
```

## Removing with Serverless
To undo the changes to your aws
```
serverless remove
```

### Notes
I'll eventually explain things better in this readme, but this is a brief explanation. 

