export enum UserRole {
  USER = 'user',
  MODEL = 'model'
}

export interface Message {
  id: string;
  role: UserRole;
  text: string;
  image?: string; // Base64 string
  timestamp: Date | string; // Allow string for deserialization from JSON
  isError?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  lastModified: number;
}
