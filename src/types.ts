import { BaseChatMessage as LangchainChatMessage } from "langchain/schema"

export interface LLMonitorOptions {
  appId?: string
  convoId?: string
  agentRunId?: string
  toolRunId?: string
  userId?: string
  apiUrl?: string
  log?: boolean
  name?: string
}

export type EventType = "log" | "tool" | "agent" | "llm" | "convo"

export interface Event {
  type: EventType
  app: string
  event?: string
  agentRunId?: string
  toolRunId?: string
  convo?: string
  timestamp: number
  input?: any
  output?: any
  message?: string
  extra?: Record<string, unknown>
  error?: {
    message: string
    stack?: string
  }
  [key: string]: unknown
}

// Same as Langchain's
type MessageType = "human" | "ai" | "generic" | "system" | "function"

// export interface Event {
//   [key: string]: any
// }

// Inspired from OpenAi's format, less heavy than Langchain's type
export type ChatMessage = {
  role: MessageType
  text: string
  function_call?: any
  [key: string]: unknown
}

export type LLMessage = ChatMessage | ChatMessage[] | string | string[]
