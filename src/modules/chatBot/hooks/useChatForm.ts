import { useState, useCallback, useRef } from 'react';
// import type { ChatMessage } from '../types';
import { CHAT_CONFIG } from '../constants';

interface UseChatFormProps {
    onSubmit: (message: string) => void;
    disabled?: boolean;
}

export const useChatForm = ({ onSubmit, disabled = false }: UseChatFormProps) => {
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleInputChange = useCallback((value: string) => {
        if (value.length <= CHAT_CONFIG.MAX_MESSAGE_LENGTH) {
            setInput(value);
        }
    }, []);

    const handleSubmit = useCallback(
        (e?: React.FormEvent) => {
            e?.preventDefault();
            
            const trimmedInput = input.trim();
            if (!trimmedInput || disabled) return;

            onSubmit(trimmedInput);
            setInput('');
            
            // Focus input after submit
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        },
        [input, disabled, onSubmit]
    );

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            // Submit on Enter (without Shift)
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
            }
        },
        [handleSubmit]
    );

    const clear = useCallback(() => {
        setInput('');
    }, []);

    const focus = useCallback(() => {
        inputRef.current?.focus();
    }, []);

    const isValid = input.trim().length > 0;
    const characterCount = input.length;
    const maxCharacters = CHAT_CONFIG.MAX_MESSAGE_LENGTH;
    const isNearLimit = characterCount > maxCharacters * 0.9;

    return {
        input,
        inputRef,
        isValid,
        characterCount,
        maxCharacters,
        isNearLimit,
        handleInputChange,
        handleSubmit,
        handleKeyDown,
        clear,
        focus,
    };
};

