'use client';

import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { useEffect, useRef, useState } from 'react';
import { Done, Plus } from '@/components/Icons';
import { useModifyingTask, useTasksActions } from '@/hooks/useTasks';

export default function Toolbar() {
  const [inputValue, setInputValue] = useState<string>('');
  const [isComposing, setIsComposing] = useState(false);
  const { addTask, setTask } = useTasksActions();
  const isDisabled = inputValue.trim() === '';
  const modifyingTask = useModifyingTask();
  const [isModifying, setIsModifying] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onAddTask = () => {
    addTask(inputValue.trim());
    setInputValue('');
  };

  const onSetTask = () => {
    if(!modifyingTask) return;
    setTask({ ...modifyingTask, name: inputValue.trim() });
    setIsModifying(false);
    setInputValue('');
  }

  useEffect(() => {
    if (modifyingTask) {
      setIsModifying(true)
      setInputValue(modifyingTask.name);
      
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
          inputRef.current.setSelectionRange(modifyingTask.name.length, modifyingTask.name.length)
          inputRef.current.scrollLeft = inputRef.current.scrollWidth
        }
      }, 100) 
    }
  }, [modifyingTask])

  return (
    <div className="mt-auto flex items-center gap-3">
      <Input
        ref={inputRef}
        radius="sm"
        className="w-full bg-transparent text-[16px] outline-none"
        placeholder="Enter task name"
        value={inputValue}
        classNames={{
          inputWrapper:
            'h-full bg-secondary data-[hover=true]:bg-secondary data-[focus=true]:!bg-secondary',
          input: 'text-[16px]',
        }}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        onValueChange={setInputValue}
        onKeyDown={(e) => {
          if (isDisabled || isComposing) {
            return;
          }

          if (e.key === 'Enter' && !isModifying) {
            onAddTask();
          }

          if (e.key === 'Enter' && isModifying) {
            onSetTask();
          }
        }}
      />
      {isModifying ? (
        <Button
          type="button"
          variant="flat"
          radius="sm"
          isIconOnly
          onPress={onSetTask}
          isDisabled={isDisabled}
          className="bg-secondary fill-white"
        >
          <Done fill='white' />
        </Button>
      ) : (
        <Button
          type="button"
          variant="flat"
          radius="sm"
          isIconOnly
          onPress={onAddTask}
          isDisabled={isDisabled}
          className="bg-secondary fill-white"
        >
          <Plus />
        </Button>
      )}
    </div>
  );
}
