// @ts-nocheck

import { Event } from "./types"

export const checkEnv = (variable) => {
  if (typeof process !== "undefined" && process.env?.[variable]) {
    return process.env[variable]
  }

  if (typeof Deno !== "undefined" && Deno.env?.get(variable)) {
    return Deno.env.get(variable)
  }

  return undefined
}

// TODO: use colors for different event types
// export const formatLog = (event: Event) => {
//   const { type, message, extra, model } = event

//   return `[LLMonitor: ${type}] ${model ? `(${model})` : ""} ${message || ""} ${
//     extra ? "\n" + JSON.stringify(extra, null, 2) : ""
//   } `
// }

export const formatLog = (event: Event) => {
  console.log(JSON.stringify(event, null, 2))
}

export const debounce = (func, timeout = 50) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

export const LANGCHAIN_ARGS_TO_REPORT = [
  "temperature",
  "modelName",
  "streaming",
  "tags",
  "streaming",
]

export const cleanError = (error: any) => {
  if (typeof error === "string")
    return {
      message: error,
    }

  return {
    message: error.message,
    stack: error.stack,
  }
}

export const getArgumentNames = (func: Function): string[] => {
  const funcString = func.toString().replace(/[\r\n\s]+/g, " ")
  const result = funcString
    .slice(funcString.indexOf("(") + 1, funcString.indexOf(")"))
    .match(/([^\s,]+)/g)
  if (result === null) return []
  else return result
}
