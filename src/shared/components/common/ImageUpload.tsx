/**
 * ImageUpload Component
 * Component để upload ảnh với preview và progress
 */

'use client';

import React, { useState, useRef } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';
import { useFileUpload } from '@core/hooks/useFileUpload';
import { AWS_CONFIG } from '@core/config/aws.config';
import Image from 'next/image';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  folder = AWS_CONFIG.FOLDERS.TEMP,
  label = 'Tải lên hình ảnh',
  required = false,
  disabled = false,
  className = '',
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(value || '');
  const inputRef = useRef<HTMLInputElement>(null);
  const { upload, uploading, progress, error } = useFileUpload();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    const result = await upload(file, { folder });

    if (result.success && result.url) {
      onChange(result.url);
      setPreview(result.url);
    } else {
      // Revert preview on error
      setPreview(value || '');
    }
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="mb-1 inline-block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {/* Upload Area */}
        <div
          onClick={handleClick}
          className={`
            relative flex h-32 w-full cursor-pointer flex-col items-center justify-center
            rounded-xl border-2 border-dashed transition-colors
            ${disabled ? 'cursor-not-allowed bg-slate-100 opacity-60' : 'hover:border-indigo-400 hover:bg-indigo-50/50'}
            ${preview ? 'border-slate-300' : 'border-slate-300'}
            ${error ? 'border-red-400 bg-red-50' : ''}
          `}
        >
          {preview ? (
            <>
              <div className="h-full w-full rounded-xl overflow-hidden">
                <Image
                  src={preview}
                  alt="Preview"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-xl"
                />
              </div>
              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                  className="absolute right-2 top-2 rounded-full bg-red-500 p-1.5 text-white shadow-lg transition-colors hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 text-slate-500">
              {uploading ? (
                <>
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
                  <span className="text-sm font-medium">{Math.round(progress)}%</span>
                </>
              ) : (
                <>
                  <div className="rounded-full bg-slate-100 p-3">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">
                      <span className="text-indigo-600">Nhấn để tải lên</span> hoặc kéo thả
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      PNG, JPG, GIF, WEBP (tối đa {AWS_CONFIG.MAX_FILE_SIZE / 1024 / 1024}MB)
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Hidden Input */}
        <input
          ref={inputRef}
          type="file"
          accept={AWS_CONFIG.ALLOWED_IMAGE_TYPES.join(',')}
          onChange={handleFileSelect}
          disabled={disabled || uploading}
          className="hidden"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-1 text-xs text-red-600">
          {error}
        </div>
      )}

      {/* URL Display */}
      {value && !error && (
        <div className="mt-1 text-xs text-slate-500">
          <a href={value} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">
            {value.length > 50 ? `${value.substring(0, 50)}...` : value}
          </a>
        </div>
      )}
    </div>
  );
}

