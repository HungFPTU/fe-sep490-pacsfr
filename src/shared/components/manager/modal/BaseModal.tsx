/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

// ===== Utilities
function useIsomorphicLayoutEffect(effect: React.EffectCallback, deps: React.DependencyList) {
  const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
  // On the server, useEffect is fine; on the client, prefer layout effect to avoid flicker
  const useLayout = isBrowser ? useLayoutEffect : useEffect;
  return useLayout(effect, deps);
}

function useLockBodyScroll(locked: boolean) {
  useIsomorphicLayoutEffect(() => {
    if (!locked) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, [locked]);
}

function getFocusable(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];
  const selectors = [
    'a[href]', 'area[href]', 'button:not([disabled])', 'input:not([disabled])', 'select:not([disabled])',
    'textarea:not([disabled])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex="-1"])'
  ];
  return Array.from(container.querySelectorAll<HTMLElement>(selectors.join(',')))
    .filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
}

// ===== Types
export type ModalSize = 'small' | 'medium' | 'large' | 'xl';

export interface ModalProps {
  open: boolean;
  onClose?: () => void;               // called on mask click / ESC / close btn
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode | null;    // null to hide footer entirely
  onOk?: () => void | Promise<void>;
  onCancel?: () => void;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  confirmLoading?: boolean;           // loading state of OK button
  closable?: boolean;                 // show the top-right close button
  maskClosable?: boolean;             // clicking mask closes the modal
  keyboard?: boolean;                 // ESC to close
  centered?: boolean;                 // vertically centered
  destroyOnClose?: boolean;           // unmount children when closed
  afterClose?: () => void;            // callback after closing animation ends
  size?: ModalSize;                   // preset width
  width?: number | string;            // override width (e.g. 520 or '40rem')
  zIndex?: number;
  className?: string;                 // wrapper (panel) classes
  bodyClassName?: string;             // body classes
  footerClassName?: string;           // footer classes
}

const sizeToWidth: Record<ModalSize, string> = {
  small: 'w-[360px] max-w-[90vw]',
  medium: 'w-[520px] max-w-[90vw]',
  large: 'w-[720px] max-w-[95vw]',
  xl: 'w-[960px] max-w-[98vw]',
};

function usePortalContainer() {
  const [el, setEl] = useState<HTMLElement | null>(null);
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const div = document.createElement('div');
    div.setAttribute('data-ui-portal', 'modal');
    document.body.appendChild(div);
    setEl(div);
    return () => { document.body.removeChild(div); };
  }, []);
  return el;
}

export function BaseModal(props: ModalProps) {
  const {
    open,
    onClose,
    title,
    children,
    footer,
    onOk,
    onCancel,
    okText = 'OK',
    cancelText = 'Cancel',
    confirmLoading,
    closable = true,
    maskClosable = true,
    keyboard = true,
    centered = true,
    destroyOnClose = false,
    afterClose,
    size = 'medium',
    width,
    zIndex = 1000,
    className = '',
    bodyClassName = '',
    footerClassName = '',
  } = props;

  const portalEl = usePortalContainer();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  // Body scroll lock when open
  useLockBodyScroll(open);

  // Focus management: save last active, focus first focusable
  useEffect(() => {
    if (open && typeof document !== 'undefined') {
      lastActiveRef.current = document.activeElement as HTMLElement | null;
      // slight delay to ensure elements are in DOM
      const id = window.setTimeout(() => {
        const focusables = getFocusable(panelRef.current);
        (focusables[0] ?? panelRef.current)?.focus?.();
      }, 10);
      return () => window.clearTimeout(id);
    }
    return;
  }, [open]);

  // Restore focus when closing
  useEffect(() => {
    if (!open && lastActiveRef.current) {
      lastActiveRef.current.focus?.();
    }
  }, [open]);

  const handleMaskClick = useCallback((e: React.MouseEvent) => {
    if (!maskClosable) return;
    if (e.target === e.currentTarget) onClose?.();
  }, [maskClosable, onClose]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (keyboard && e.key === 'Escape') {
      e.stopPropagation();
      onClose?.();
      return;
    }
    if (e.key === 'Tab') {
      // simple focus trap
      const focusables = getFocusable(panelRef.current);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  }, [keyboard]);

  // Animation state
  const [rendered, setRendered] = useState(open);
  useEffect(() => {
    if (open) setRendered(true);
  }, [open]);

  const handleAnimEnd = useCallback(() => {
    if (!open) {
      if (!destroyOnClose) {
        // keep DOM, but it's hidden; still call afterClose
        afterClose?.();
      } else {
        // fully unmount content
        setRendered(false);
        afterClose?.();
      }
    }
  }, [open, destroyOnClose, afterClose]);

  const panelWidth = useMemo(() => {
    if (width != null) return typeof width === 'number' ? `${width}px` : width;
    return undefined; // let size classes drive it
  }, [width]);

  if (!portalEl) return null; // SSR safe: no portal until mounted

  // Keep mounted while animating out
  if (!rendered && !open) return null;

  return createPortal(
    <div
      className={[
        "fixed h-auto inset-0 flex", centered ? "items-center" : "items-start", "justify-center",
        open ? "" : "pointer-events-none",
      ].join(' ')}
      style={{ zIndex }}
      onMouseDown={handleMaskClick}
      aria-hidden={!open}
    >
      {/* Mask */}
      <div
        className={[
          "absolute inset-0 bg-black/50 transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0",
        ].join(' ')}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        className={[
          "relative mx-4 h-auto my-8 outline-none focus:outline-none",
          sizeToWidth[size],
          "max-h-[85vh] overflow-hidden rounded-xl bg-white dark:bg-slate-900 shadow-2xl",
          "transition-all duration-200",
          open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-1",
          className,
        ].join(' ')}
        ref={panelRef}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        onAnimationEnd={handleAnimEnd}
        style={{ width: panelWidth }}
      >
        {/* Header */}
        {(title || closable) && (
          <div className="flex items-center justify-between gap-4 border-b border-slate-200/70 dark:border-slate-700 px-5 py-3">
            <h3 id="modal-title" className="text-base font-semibold text-slate-900 dark:text-slate-50">
              {title}
            </h3>
            {closable && (
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="text-slate-500">
                  <path d="M6.225 4.811 4.811 6.225 10.586 12l-5.775 5.775 1.414 1.414L12 13.414l5.775 5.775 1.414-1.414L13.414 12l5.775-5.775-1.414-1.414L12 10.586 6.225 4.811z"/>
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className={["px-5 h-auto py-4 overflow-auto", bodyClassName].join(' ')} style={{ maxHeight: 'calc(85vh - 65px - 56px)' }}>
          {(!open && destroyOnClose) ? null : children}
        </div>

        {/* Footer */}
        {footer !== null && (
          <div className={["flex h-fit items-center justify-end gap-2 border-t border-slate-200/70 dark:border-slate-700 px-5 py-3", footerClassName].join(' ')}>
            {footer !== undefined ? (
              footer
            ) : (
              <>
                <button
                  type="button"
                  onClick={onCancel ?? onClose}
                  className="inline-flex items-center justify-center rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  {cancelText}
                </button>
                <button
                  type="button"
                  disabled={!!confirmLoading}
                  onClick={onOk}
                  className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  {confirmLoading && (
                    <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                    </svg>
                  )}
                  {okText}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>,
    portalEl
  );
}
