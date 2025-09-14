'use server';
import { categorizeIncomingMessages } from '@/ai/flows/categorize-incoming-messages';
import { z } from 'zod';

const CategorizeSchema = z.object({
  message: z.string(),
  labels: z.array(z.string()),
});

export async function getCategoryForMessage(formData: FormData) {
  try {
    const message = formData.get('message') as string;
    const labelsString = formData.get('labels') as string;

    if (!message || !labelsString) {
      return { success: false, error: 'Message and labels are required.' };
    }

    const labels = labelsString.split(',');
    
    const validatedData = CategorizeSchema.parse({ message, labels });
    
    const result = await categorizeIncomingMessages(validatedData);
    
    return { success: true, data: result };
  } catch (error) {
    console.error('Categorization error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during categorization.';
    return { success: false, error: errorMessage };
  }
}
