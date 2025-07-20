import { List, Task } from '@flowmo/types';

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.EXPO_PUBLIC_SUPABASE_URL;

export interface Integration {
  access_token: string;
  refresh_token: string;
}

export enum Source {
  Flowmo = 'Flowmo',
  Todoist = 'Todoist',
  TickTick = 'TickTick',
  GoogleTasks = 'Google Tasks',
  MicrosoftToDo = 'Microsoft To Do',
}

export interface TaskSource {
  addTask(
    name: string,
    options?: {
      listId?: string;
      label?: string;
    },
  ): Promise<Task>;
  editTask(taskId: string, name: string, listId?: string): Promise<void>;
  deleteTask(taskId: string, listId?: string): Promise<void>;
  completeTask(taskId: string, listId?: string): Promise<void>;
  undoCompleteTask(taskId: string, listId: string | null): Promise<void>;
  fetchTasks(listId?: string, signal?: AbortSignal): Promise<Task[]>;
  fetchLists(): Promise<List[]>;
  fetchLabels(): Promise<string[]>;
  supportsLabels: boolean;
}
