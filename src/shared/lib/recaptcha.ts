declare global {
    interface Window {
        grecaptcha?: {
            ready: (callback: () => void) => void;
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
        };
    }
}

let recaptchaScriptPromise: Promise<void> | null = null;

const RECAPTCHA_BASE_URL = "https://www.google.com/recaptcha/api.js";

const buildRecaptchaUrl = (siteKey: string) => `${RECAPTCHA_BASE_URL}?render=${siteKey}`;

const appendRecaptchaScript = (siteKey: string): Promise<void> => {
    if (typeof window === "undefined" || typeof document === "undefined") {
        return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
        const existingScript = document.querySelector<HTMLScriptElement>(`script[src^="${RECAPTCHA_BASE_URL}"]`);
        if (existingScript) {
            existingScript.addEventListener("load", () => resolve(), { once: true });
            existingScript.addEventListener("error", (event) => reject(event), { once: true });
            if (existingScript.hasAttribute("data-loaded")) {
                resolve();
            }
            return;
        }

        const script = document.createElement("script");
        script.src = buildRecaptchaUrl(siteKey);
        script.async = true;
        script.defer = true;
        script.dataset.loaded = "false";

        script.onload = () => {
            script.dataset.loaded = "true";
            resolve();
        };

        script.onerror = (event) => {
            script.remove();
            reject(event);
        };

        document.head.appendChild(script);
    });
};

export const loadRecaptcha = (siteKey: string): Promise<void> => {
    if (!siteKey) {
        return Promise.reject(new Error("Thiếu cấu hình reCAPTCHA site key."));
    }

    if (typeof window === "undefined") {
        return Promise.resolve();
    }

    if (window.grecaptcha) {
        return Promise.resolve();
    }

    if (!recaptchaScriptPromise) {
        recaptchaScriptPromise = appendRecaptchaScript(siteKey).catch((error) => {
            recaptchaScriptPromise = null;
            throw error;
        });
    }

    return recaptchaScriptPromise;
};

export const executeRecaptcha = async (siteKey: string, action: string): Promise<string> => {
    if (!siteKey || typeof siteKey !== "string" || siteKey.trim().length === 0) {
        throw new Error("Site key reCAPTCHA không hợp lệ.");
    }

    if (!action || typeof action !== "string" || action.trim().length === 0) {
        throw new Error("Action reCAPTCHA không hợp lệ.");
    }

    await loadRecaptcha(siteKey);

    return new Promise<string>((resolve, reject) => {
        if (!window.grecaptcha) {
            reject(new Error("Google reCAPTCHA chưa sẵn sàng. Vui lòng tải lại trang."));
            return;
        }

        try {
            window.grecaptcha.ready(() => {
                window.grecaptcha!
                    .execute(siteKey, { action })
                    .then((token) => {
                        if (!token || typeof token !== "string" || token.trim().length === 0) {
                            reject(new Error("Không nhận được token từ Google reCAPTCHA. Vui lòng thử lại."));
                            return;
                        }
                        console.log("[reCAPTCHA] Token generated successfully, length:", token.length);
                        resolve(token.trim());
                    })
                    .catch((error) => {
                        console.error("[reCAPTCHA] Error executing:", error);
                        reject(
                            error instanceof Error
                                ? error
                                : new Error("Lỗi khi thực thi Google reCAPTCHA. Vui lòng thử lại."),
                        );
                    });
            });
        } catch (error) {
            console.error("[reCAPTCHA] Unexpected error:", error);
            reject(error instanceof Error ? error : new Error("Google reCAPTCHA gặp lỗi không xác định."));
        }
    });
};

export const resetRecaptchaLoader = () => {
    recaptchaScriptPromise = null;
};

/**
 * Verify reCAPTCHA token with Next.js API route
 * This calls our internal API route which verifies with Google
 */
export const verifyRecaptchaToken = async (token: string): Promise<{
    success: boolean;
    message?: string;
    score?: number;
    action?: string;
}> => {
    if (!token || typeof token !== "string" || token.trim().length === 0) {
        return {
            success: false,
            message: "Token reCAPTCHA không hợp lệ.",
        };
    }

    try {
        const response = await fetch("/api/recaptcha/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Xác thực CAPTCHA thất bại.",
            };
        }

        return data;
    } catch (error) {
        console.error("[reCAPTCHA] Verification error:", error);
        return {
            success: false,
            message: "Đã xảy ra lỗi khi xác thực CAPTCHA. Vui lòng thử lại.",
        };
    }
};

