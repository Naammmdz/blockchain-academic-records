import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoSearchOutline, IoCloseOutline } from 'react-icons/io5';
import { Button } from './Button';

interface SearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  suggestions?: string[];
  disabled?: boolean;
  className?: string;
  autoFocus?: boolean;
  debounceMs?: number;
}

export const Search: React.FC<SearchProps> = ({
  placeholder = "Search...",
  value = "",
  onChange,
  onSearch,
  onClear,
  suggestions = [],
  disabled = false,
  className = "",
  autoFocus = false,
  debounceMs = 300
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const debouncedOnChange = useCallback((searchValue: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      onChange?.(searchValue);
    }, debounceMs);
  }, [onChange, debounceMs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    setActiveSuggestion(-1);
    debouncedOnChange(newValue);
    
    if (newValue.length > 0 && suggestions.length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0 || !showSuggestions) {
      if (e.key === 'Enter') {
        handleSearch();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestion(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (activeSuggestion >= 0) {
          selectSuggestion(suggestions[activeSuggestion]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setActiveSuggestion(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSearch = () => {
    onSearch?.(localValue);
    setShowSuggestions(false);
  };

  const handleClear = () => {
    setLocalValue("");
    setShowSuggestions(false);
    setActiveSuggestion(-1);
    onChange?.("");
    onClear?.();
    inputRef.current?.focus();
  };

  const selectSuggestion = (suggestion: string) => {
    setLocalValue(suggestion);
    setShowSuggestions(false);
    setActiveSuggestion(-1);
    onChange?.(suggestion);
    onSearch?.(suggestion);
  };

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(localValue.toLowerCase())
  );

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <IoSearchOutline className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={localValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (localValue.length > 0 && filteredSuggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          onBlur={() => {
            // Delay hiding suggestions to allow clicking on them
            setTimeout(() => setShowSuggestions(false), 150);
          }}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            block w-full pl-10 pr-12 py-2.5 text-sm
            border border-gray-300 rounded-lg
            bg-white placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            transition-colors duration-200
          `}
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-2">
          {localValue && (
            <button
              onClick={handleClear}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              type="button"
            >
              <IoCloseOutline className="h-4 w-4" />
            </button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSearch}
            disabled={disabled || !localValue.trim()}
            className="px-2"
          >
            Search
          </Button>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                onClick={() => selectSuggestion(suggestion)}
                className={`
                  w-full px-4 py-3 text-left text-sm hover:bg-gray-50 
                  ${index === activeSuggestion ? 'bg-primary-50 text-primary-700' : 'text-gray-900'}
                  ${index === 0 ? 'rounded-t-lg' : ''}
                  ${index === filteredSuggestions.length - 1 ? 'rounded-b-lg' : ''}
                  transition-colors duration-150
                `}
              >
                {suggestion}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
