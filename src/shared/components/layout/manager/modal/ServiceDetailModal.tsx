/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

// ===== Utilities
function useIsomorphicLayoutEffect(effect: React.EffectCallback, deps: React.DependencyList) {
    const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
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
export interface ServiceDetailModalProps {
    open: boolean;
    onClose?: () => void;
    title?: React.ReactNode;
    children?: React.ReactNode;
    footer?: React.ReactNode | null;
    onOk?: () => void | Promise<void>;
    onCancel?: () => void;
    okText?: React.ReactNode;
    cancelText?: React.ReactNode;
    confirmLoading?: boolean;
    closable?: boolean;
    maskClosable?: boolean;
    keyboard?: boolean;
    centered?: boolean;
    destroyOnClose?: boolean;
    afterClose?: () => void;
    width?: number | string;
    zIndex?: number;
    className?: string;
    bodyClassName?: string;
    footerClassName?: string;
}

function usePortalContainer() {
    const [el, setEl] = useState<HTMLElement | null>(null);
    useEffect(() => {
        if (typeof document === 'undefined') return;
        const div = document.createElement('div');
        div.setAttribute('data-ui-portal', 'service-detail-modal');
        document.body.appendChild(div);
        setEl(div);
        return () => { document.body.removeChild(div); };
    }, []);
    return el;
}

export function LargeServiceModal(props: ServiceDetailModalProps) {
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
        width = '90vw',
        zIndex = 2000,
        className = '',
        bodyClassName = '',
        footerClassName = '',
    } = props;

    const portalEl = usePortalContainer();
    const panelRef = useRef<HTMLDivElement | null>(null);
    const lastActiveRef = useRef<HTMLElement | null>(null);

    // Body scroll lock when open
    useLockBodyScroll(open);

    // Focus management
    useEffect(() => {
        if (open && typeof document !== 'undefined') {
            lastActiveRef.current = document.activeElement as HTMLElement | null;
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
                afterClose?.();
            } else {
                setRendered(false);
                afterClose?.();
            }
        }
    }, [open, destroyOnClose, afterClose]);

    const panelWidth = useMemo(() => {
        if (width != null) return typeof width === 'number' ? `${width}px` : width;
        return '90vw';
    }, [width]);

    if (!portalEl) return null;
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

            {/* Panel - Full Width Custom */}
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? "service-detail-modal-title" : undefined}
                className={[
                    "relative mx-2 h-auto my-8 outline-none focus:outline-none",
                    "max-h-[90vh] overflow-hidden rounded-xl bg-white dark:bg-slate-900 shadow-2xl",
                    "transition-all duration-200",
                    open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-1",
                    className,
                ].join(' ')}
                ref={panelRef}
                tabIndex={-1}
                onKeyDown={handleKeyDown}
                onAnimationEnd={handleAnimEnd}
                style={{ width: panelWidth, maxWidth: '100vw' }}
            >
                {/* Header */}
                {(title || closable) && (
                    <div className="flex items-center justify-between gap-4 border-b border-slate-200/70 dark:border-slate-700 px-6 py-4 bg-slate-50 dark:bg-slate-800/50 sticky top-0 z-10">
                        <h3 id="service-detail-modal-title" className="text-lg font-bold text-slate-900 dark:text-slate-50">
                            {title}
                        </h3>
                        {closable && (
                            <button
                                type="button"
                                aria-label="Close"
                                onClick={onClose}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-colors"
                            >
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-slate-600 dark:text-slate-400">
                                    <path d="M6.225 4.811 4.811 6.225 10.586 12l-5.775 5.775 1.414 1.414L12 13.414l5.775 5.775 1.414-1.414L13.414 12l5.775-5.775-1.414-1.414L12 10.586 6.225 4.811z" />
                                </svg>
                            </button>
                        )}
                    </div>
                )}

                {/* Body */}
                <div className={["px-6 py-5 overflow-auto", bodyClassName].join(' ')} style={{ maxHeight: 'calc(90vh - 64px - 56px)' }}>
                    {(!open && destroyOnClose) ? null : children}
                </div>

                {/* Footer */}
                {footer !== null && (
                    <div className={["flex h-fit items-center justify-end gap-3 border-t border-slate-200/70 dark:border-slate-700 px-6 py-3 bg-slate-50 dark:bg-slate-800/50 sticky bottom-0 z-10", footerClassName].join(' ')}>
                        {footer !== undefined ? (
                            footer
                        ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={onCancel ?? onClose}
                                    className="inline-flex items-center justify-center rounded-md border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-colors"
                                >
                                    {cancelText}
                                </button>
                                <button
                                    type="button"
                                    disabled={!!confirmLoading}
                                    onClick={async () => {
                                        if (onOk) {
                                            await onOk();
                                        }
                                    }}
                                    className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-colors"
                                >
                                    {confirmLoading && (
                                        <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
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

