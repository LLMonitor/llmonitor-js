# LLMonitor JS SDK

LLMonitor is an open-source logging and analytics platform for LLM-powered apps.

You can use it with any LLM models, not limited to GPT.

This is the JS isomorphic library compatible with Node.js, Deno and the browser.

It is compatible with Langchain JS, AutoGPT and all the other libraries.

## Installation

```bash
npm install llmonitor
```

## Simple usage

```typescript
import LLMonitor from 'llmonitor';

const systemMessage = {role: 'system', content: `You are an assistant...`}

const handleUserMessage = async (prompt) => {

  // If you already have a convo id, set it as parameter, otherwise leave empty
  const monitor = new LLMonitor({
    convoId, // Optional (uuid): tie to an existing conversation
    convoType, // Optional (string): to filter conversations in the dashboard by type
    appId, // Optional (uuid): if you haven't defined process.env.LLMONITOR_APP_ID
  })

  try {

    monitor.call(prompt)

    const answer = await doLLMquery(prompt)

    monitor.result(answer)

    return { answer, convoId: monitor.id }

  } catch (err)

    monitor.error(err)
  }
}
```

## Advanced Usage (agents with chains and multiple steps)

```typescript
import LLMonitor from "llmonitor"

const handleUserMessage = (userPrompt) => {
  const monitor = new LLMonitor({
    convoId, // Optional (uuid): tie to an existing conversation
    convoType, // Optional (string): to filter conversations in the dashboard by type. Ie: 'web_agent'
    appId, // Optional (uuid): if you haven't defined process.env.LLMONITOR_APP_ID
  })

  try {
    // An user message was received and you're starting a chain / agent.

    let finished = false

    while (!finished) {
      try {
        const chat = [systemMessage, userPrompt]

        monitor.call(chat, model)
        const intermediaryResult = await doLLMquery(chat)
        monitor.intermediateResult(intermediaryResult)

        // Log anything else you use (tools, APIs, etc..)
        monitor.log(`Running tool Google Search with input xxxxx`)
      } catch (e) {
        monitor.error("Error at step x", e)
      }
    }

    // Optional: track when the response starts streaming to the user
    monitor.streamingStarts()

    // Track when you've received the final answer (streaming finished) to send the user
    monitor.finalResult(answer)

    // pass the convoId to keep the context in the next queries
    return { answer, convoId: convo.id }
  } catch (err) {
    // Track errors at any point
    monitor.error("Some error", error)
  }
}
```
