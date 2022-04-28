require('dotenv').config()
const qs = require("querystring");

const contact = async (event, context, callback) => {



        const body = JSON.parse('{"' + event.body.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
        const headers = event.headers;
        let name;


    
        // Your Account SID from www.twilio.com/console
        // See http://twil.io/secure for important security information
        const accountSid = process.env.ACCOUNT_SID;
        // Your Auth Token from www.twilio.com/console 
        // See http://twil.io/secure for important security information
        const authToken = process.env.AUTH_TOKEN;
        // Import Twilio's Node Helper library
        // Create an authenticated Twilio Client instance
        const client = require('twilio')(accountSid, authToken);
    
    
    
        // ! OPENAI DAVINNCI CODE
        const { Configuration, OpenAIApi } = require("openai");
    
        const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);
    
        
        // quick little filter to give to the AI a name for who's talking to it
        // * this can be expanded upon later
        switch(body.From) {
            case "+11231231234": {
                name = 'Bob:';
            }break;
            case '+11231231234': {
                name = 'Marie'
            } break;
            default: {
                name = 'Human'
            }
        }
        
        // make sure to change this if you don't want to use davinci...
        const response = await openai.createCompletion("text-davinci-002", {
            prompt: "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n" + name + ": Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\n" + name + ": "+ body.Body,
            temperature: 0.9,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6,
            stop: [` ${name}:`, " AI:"],
        }).then(data => {

            return data.data.choices[0].text
            
        }).catch(err => {
        })

        await client.messages.create({
            body: response.replace('AI:', ''),
            from: body.To,
            to: body.From
            

        }).then(message => {
        }).catch(err => {
        }).finally(() => {
            return {
                status : 200
            }
        })
        
    
        

};

module.exports = {
    contact
}