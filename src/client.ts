import {Options, query } from '@anthropic-ai/claude-agent-sdk'
import { ENV } from './config.js'

export const callLLMClient = async (prompt: string, options?: Options ) => {
  const result = await query({
    prompt,
    options: {
      ...(options || {}),
      env: {
        ...ENV,
        ...(options?.env || {})
      },
    }
  })

  let content = ''
  for await (const chunk of result) {
    if (chunk.type === 'result' && chunk.subtype === 'success') {
      content = chunk.result
    }
  }

  return content
}
