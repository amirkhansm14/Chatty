'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Tag, Loader2 } from 'lucide-react';
import { getCategoryForMessage } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Message } from '@/lib/types';
import { Progress } from '../ui/progress';

interface CategorizeButtonProps {
  message: Message;
  chatId: string;
  onCategorizeMessage: (chatId: string, messageId: string, category: string, confidence: number) => void;
}

const PREDEFINED_LABELS = ['Work', 'Personal', 'Urgent', 'Finance', 'Travel'];

export function CategorizeButton({ message, chatId, onCategorizeMessage }: CategorizeButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategorizing, setIsCategorizing] = useState(false);
  const [categoryResult, setCategoryResult] = useState<{ category: string, confidence: number } | null>(null);
  const { toast } = useToast();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setCategoryResult(null);
    }
    setIsOpen(open);
  };

  const handleCategorize = async () => {
    setIsCategorizing(true);
    setCategoryResult(null);

    const formData = new FormData();
    formData.append('message', message.content);
    formData.append('labels', PREDEFINED_LABELS.join(','));
    
    const response = await getCategoryForMessage(formData);
    
    if (response.success && response.data) {
      setCategoryResult(response.data);
      onCategorizeMessage(chatId, message.id, response.data.category, response.data.confidence);
      toast({
        title: 'Message Categorized',
        description: `Message marked as "${response.data.category}".`,
      });
      setIsOpen(false);
    } else {
      toast({
        variant: 'destructive',
        title: 'Categorization Failed',
        description: response.error,
      });
    }
    
    setIsCategorizing(false);
  };

  return (
    <>
      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setIsOpen(true)}>
        <Tag className="h-4 w-4 text-muted-foreground" />
        <span className="sr-only">Categorize Message</span>
      </Button>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Categorize Message</DialogTitle>
            <DialogDescription>
              Use AI to automatically sort this message into one of the following labels.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Message:</p>
              <blockquote className="text-sm p-3 bg-muted rounded-md border-l-4">
                {message.content}
              </blockquote>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Available Labels:</p>
              <div className="flex flex-wrap gap-2">
                {PREDEFINED_LABELS.map(label => <Badge key={label} variant="secondary">{label}</Badge>)}
              </div>
            </div>
            {categoryResult && (
              <div className="pt-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">Result:</p>
                <div className="flex items-center gap-4 p-3 bg-secondary rounded-md">
                    <p>Category: <Badge className="bg-primary/20 text-primary-foreground hover:bg-primary/30">{categoryResult.category}</Badge></p>
                    <div className="flex-1">
                        <Progress value={categoryResult.confidence * 100} className="w-full h-2" />
                        <p className="text-xs text-right mt-1 text-muted-foreground">
                            {Math.round(categoryResult.confidence * 100)}% confidence
                        </p>
                    </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleOpenChange(false)}>Cancel</Button>
            <Button onClick={handleCategorize} disabled={isCategorizing}>
              {isCategorizing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isCategorizing ? 'Categorizing...' : 'Run AI Categorization'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
