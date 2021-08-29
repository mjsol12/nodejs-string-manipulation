import express from 'express';
import bodyParser from 'body-parser';
import { readFile } from 'fs/promises';

const app = express();
const port = 8081;

// create application/json parser
var jsonParser = bodyParser.json();

app.post('/message', jsonParser, async (req, res) => {
    // goes here
    try{
        const {conversation_id, message} = req.body;

        if(!conversation_id || !message){
            throw new Error('Property missing')
        }

        const { data } = JSON.parse(await readFile("mock-data.json"));

        // take off special character and space
        const arrayMessages = message.split(/[^A-Za-z]/);

        let matched = {};
        matched['response_id'] = conversation_id;
        for(let a of arrayMessages) {
            let holds;
            for(let m of data) {
                if(m.matches  && m.matches.length > 0) {
                    const matches = m.matches.filter(i => i.toLowerCase() === a.toLowerCase());
                    if(matches && matches.length > 0) {
                        holds = m;
                    }
                }
            }

            if(holds) {
                matched['response'] = holds.response;
                break
            }
        }
        if(matched && matched.response == null) {
            matched['response'] = "Sorry, I don't understand";
        }
        res.send(matched);
    }catch(e){
        console.log(e);
        res.status(500).send(e.message)
    }
});

app.listen(port, () => {
    console.log(`listening to port ${port}`)
});