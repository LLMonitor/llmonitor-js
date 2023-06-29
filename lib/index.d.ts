import { LLMonitorOptions, LLMOutput, LLMInput } from "./types";
declare class LLMonitor {
    appId: string;
    convoId: string;
    log: boolean;
    convoTags: string | string[] | undefined;
    apiUrl: string;
    private queue;
    private queueRunning;
    /**
     * @param {string} appId - App ID generated from the LLMonitor dashboard, required if LLMONITOR_APP_ID is not set in the environment
     * @param {string} convoId - Tie to an existing conversation ID
     * @param {boolean} log - Log events to the console
     * @param {string | string[]} convoTags - Add a label to the conversation
     * @param {string} apiUrl - Custom tracking URL if you are self-hosting (can also be set with LLMONITOR_API_URL)
     * @constructor
     * @example
     * const monitor = new LLMonitor({
     *   appId: "00000000-0000-0000-0000-000000000000",
     *   convoId: "my-convo-id",
     *   convoTags: "home",
     *   apiUrl: "https://app.llmonitor.com/api"
     * })
     */
    constructor(options: LLMonitorOptions);
    private trackEvent;
    private debouncedProcessQueue;
    private processQueue;
    /**
     * Get the conversation ID to continue tracking an existing conversation.
     * @returns {string} - Conversation ID
     * @example
     * const monitor = new LLMonitor()
     * const convoId = monitor.id
     *
     * // Later on...
     * const monitor = new LLMonitor({ convoId })
     **/
    get id(): string;
    /**
     * Use this for higher accuracy as soon as the user sends a message.
     * @param {string} msg - User message
     **/
    userMessage(msg: LLMInput): void;
    /**
     * Use this just before calling a model
     * @param {string | ChatHistory} prompt - Prompt sent to the model
     **/
    call(prompt: LLMInput, model?: string): void;
    /**
     * Use this when the model returns an answer.
     * @param {string | ChatHistory} answer - Answer returned by the model
     * @example
     * const answer = await model.generate("Hello")
     * monitor.result(answer)
     **/
    result(result: LLMOutput): void;
    /**
     * Use this when the model returns the final answer you'll show to the user.
     * @param {string | ChatHistory} answer - Answer returned by the model
     * @example
     * const answer = await model.generate("Hello")
     * monitor.assistantAnswer(answer)
     **/
    assistantAnswer(answer: LLMOutput): void;
    /**
     * Use this when you start streaming the model's output to the user.
     * Used to measure the time it takes for the model to generate the first response.
     */
    streamingStarts(): void;
    /**
     * Vote on the quality of the conversation.
     */
    userUpvotes(): void;
    /**
     * Vote on the quality of the conversation.
     */
    userDownvotes(): void;
    /**
     * Use this to log any external action or tool you use.
     * @param {string} message - Log message
     * @param {any} extra - Extra data to pass
     * @example
     * monitor.info("Running tool Google Search")
     **/
    info(message: string, extra?: any): void;
    /**
     * Use this to warn
     * @param {string} message - Warning message
     * @param {any} extra - Extra data to pass
     * @example
     * monitor.log("Running tool Google Search")
     **/
    warn(message: string, extra?: any): void;
    /**
     * Report any errors that occur during the conversation.
     * @param {string} message - Error message
     * @param {any} error - Error object
     * @example
     * try {
     *   const answer = await model.generate("Hello")
     *   monitor.result(answer)
     * } catch (error) {
     *   monitor.error("Error generating answer", error)
     * }
     **/
    error(message: string | any, error?: any): void;
}
export default LLMonitor;
