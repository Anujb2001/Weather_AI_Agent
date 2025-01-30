// import ollama from 'ollama'

// const response = await ollama.chat({
//   model: 'deepseek-r1:1.5b',
//   messages: [{ role: 'user', content: 'Why is the sky blue?' }],
// })
// console.log(response.message.content)


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
