import ollama from 'ollama'
import readlineSync from 'readline-sync'
// Tools

function getWeatherInfo(location) {
    //   return new Promise((resolve, reject) => {
    //     // Call weather API
    //     resolve("The weather is sunny in " + location);
    //   });
    console.log("function getWeatherInfo called with location: ", location);
    if (location.toLowerCase() === 'New York'.toLowerCase()) return '10°C';
    if (location.toLowerCase() === 'San Francisco'.toLowerCase()) return '15°C';
    if (location.toLowerCase() === 'Tokyo'.toLowerCase()) return '20°C';
    if (location.toLowerCase() === 'London'.toLowerCase()) return '5°C';
    if (location.toLowerCase() === 'Paris'.toLowerCase()) return '8°C';
    if (location.toLowerCase() === 'Berlin'.toLowerCase()) return '3°C';
    if (location.toLowerCase() === 'Sydney'.toLowerCase()) return '25°C';
    if (location.toLowerCase() === 'Delhi'.toLowerCase()) return '30°C';
}

const tools = {
    "getWeatherInfo": getWeatherInfo
}

const SYSTEM_PROMPT = `
You are an AI Assistant with START, PLAN, ACTION, Observation and Output State.
Wait for the user prompt and First PLAN using available tools.
After Planning, Take the action with appropriate tools and wait for Observation based on Action.
Once you get the Observation, Return the AI response based on START prompt an observations.

Strictly follow the JSON output format as in example.

Available Tools:
- function getWeatherInfo(location: string): string
getWeatherInfo is a function that accepts a Location or city name as string and returns the weather info.

Example:
START
{"type": "user", "user": "What is the sum of weather of New York and Tokyo?"}
{"type":"plan", "plan": "I will call the getWeatherInfo for New York"}
{"type":"action", "function": "getWeatherInfo", "input": "New York"}
{"type":"observation", "observation": "10°C"}
{"type":"plan", "plan": "I will call the getWeatherInfo for Tokyo"}
{"type":"action", "function": "getWeatherInfo", "input": "Tokyo"}
{"type":"observation", "observation": "20°C"}
{"type":"output", "output": "The sum of weather of New York and Tokyo is 30°C"}
`

const user = "Hey, what is the weather in New York?";

async function chat() {
    const response = await ollama.chat({
          model: 'chevalblanc/gpt-4o-mini',
          messages: [
            {role: "system", content: SYSTEM_PROMPT},
            {role: "user", content:  "what is the weather in New York?"},
            {
                role: 'assistant',
                content: '{"type": "start", "user": "What is the weather in New York?"}'
            },
            {
                role: 'assistant',
                content: `{"type": "plan", "plan": "I will call the getWeatherInfo function with 'New York' as input."}`
            },
            {
                role: 'assistant',
                content: '{"action":"function", "input": "getWeatherInfo", "argument": "New York" }'
            },
            {
                role: 'assistant',
                content: `{"type":"observation", "observation": "10°C"}`
            }

        ],
          format: 'json'
          
        })
    console.log(response.message);
}
// chat();

async function autoPrompting() {
    const messages = [
        {role: "system", content: SYSTEM_PROMPT}
    ];

    while (true){
        const query = readlineSync.question("Enter your query: ");
        if (query === "exit" || query == 'q') break;
        const q = {
            type:"user",
            user: query,
        };
        messages.push({role: "user", content: JSON.stringify(q)});

        while (true ) {
            const chat = await ollama.chat({
                model: 'chevalblanc/gpt-4o-mini',
                messages: messages,
                format: 'json'
            });

            const result = chat.message.content;
            messages.push({role: "assistant", content: result});
            console.log(`\n\n------------------Output Start AI------------------\n\n`);
            console.log(result);
            console.log(`\n\n------------------Output End AI--------------------\n\n`);

            const call = JSON.parse(result);
            if (call.type == "output") {
                console.log(call.output);
                break;
            } else if (call.type == "action") {
                const fn = tools[call.function];
                const observation = fn(call.input);
                const obs = {"type": "observation", "observation": observation};
                messages.push({role: "assistant", content: JSON.stringify(obs)});
            } else if (!call.type) {
                console.log(result)
                break;
            }
        }
    }

}

autoPrompting();