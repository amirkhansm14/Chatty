// categorize-incoming-messages.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for categorizing incoming messages.
 *
 * The flow takes an incoming message and a set of predefined labels as input,
 * and uses an LLM to categorize the message based on those labels.
 *
 * @fileOverview categorizeIncomingMessages - A function that categorizes incoming messages based on predefined labels.
 * @fileOverview CategorizeIncomingMessagesInput - The input type for the categorizeIncomingMessages function.
 * @fileOverview CategorizeIncomingMessagesOutput - The return type for the categorizeIncomingMessages function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeIncomingMessagesInputSchema = z.object({
  message: z.string().describe('The content of the incoming message.'),
  labels: z.array(z.string()).describe('A list of predefined labels for categorization.'),
});

export type CategorizeIncomingMessagesInput = z.infer<typeof CategorizeIncomingMessagesInputSchema>;

const CategorizeIncomingMessagesOutputSchema = z.object({
  category: z.string().describe('The most appropriate category for the message based on the provided labels.'),
  confidence: z.number().describe('A confidence score (0-1) indicating the certainty of the categorization.'),
});

export type CategorizeIncomingMessagesOutput = z.infer<typeof CategorizeIncomingMessagesOutputSchema>;


export async function categorizeIncomingMessages(input: CategorizeIncomingMessagesInput): Promise<CategorizeIncomingMessagesOutput> {
  return categorizeIncomingMessagesFlow(input);
}

const categorizeIncomingMessagesPrompt = ai.definePrompt({
  name: 'categorizeIncomingMessagesPrompt',
  input: {schema: CategorizeIncomingMessagesInputSchema},
  output: {schema: CategorizeIncomingMessagesOutputSchema},
  prompt: `You are an AI assistant that categorizes incoming messages based on a predefined set of labels.

  Given the following message:
  """
  {{message}}
  """

  And the following labels:
  """
  {{#each labels}}
  - {{this}}
  {{/each}}
  """

  Determine the most appropriate category for the message. Provide a confidence score between 0 and 1 indicating the certainty of your categorization.

  Return the category and confidence score in JSON format.
  `,
});

const categorizeIncomingMessagesFlow = ai.defineFlow(
  {
    name: 'categorizeIncomingMessagesFlow',
    inputSchema: CategorizeIncomingMessagesInputSchema,
    outputSchema: CategorizeIncomingMessagesOutputSchema,
  },
  async input => {
    const {output} = await categorizeIncomingMessagesPrompt(input);
    return output!;
  }
);
