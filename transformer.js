import { AutoTokenizer } from '@xenova/transformers';

const tokenizer = await AutoTokenizer.from_pretrained('Xenova/gpt-4o');
const tokens = tokenizer.encode('hello world'); // [24912, 2375]