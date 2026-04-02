'use client';

import { type ReactNode, useState, useEffect, useCallback } from 'react';

type ModalSize = 'sm' | 'md' | 'lg';

const SIZE_CLASSES: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: ModalSize;
}

export function Modal({ open, onClose, children, size = 'sm' }: ModalProps): ReactNode {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), 250);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, handleKeyDown]);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-sm transition-opacity duration-250 ease-out"
        style={{
          background: 'rgba(0,0,0,0.6)',
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Panel */}
      <div
        className={`relative w-full ${SIZE_CLASSES[size]} mx-4 rounded-2xl p-6 shadow-2xl transition-all duration-300 ease-out`}
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border-card)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(8px)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

interface ModalHeaderProps {
  children: ReactNode;
}

export function ModalHeader({ children }: ModalHeaderProps): ReactNode {
  return (
    <h3
      className="text-lg font-semibold mb-2"
      style={{ color: 'var(--color-text-primary)' }}
    >
      {children}
    </h3>
  );
}

interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}

export function ModalBody({ children, className }: ModalBodyProps): ReactNode {
  return (
    <div
      className={`text-sm mb-5 ${className ?? ''}`}
      style={{ color: 'var(--color-text-secondary)' }}
    >
      {children}
    </div>
  );
}

interface ModalFooterProps {
  children: ReactNode;
}

export function ModalFooter({ children }: ModalFooterProps): ReactNode {
  return <div className="flex justify-end gap-3">{children}</div>;
}
