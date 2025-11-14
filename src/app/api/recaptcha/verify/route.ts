import { NextRequest, NextResponse } from "next/server";

const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { token } = body;

        if (!token || typeof token !== "string") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Token reCAPTCHA không hợp lệ.",
                },
                { status: 400 }
            );
        }

        // Get secret key from environment
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        if (!secretKey) {
            console.error("[reCAPTCHA] Missing RECAPTCHA_SECRET_KEY in environment");
            return NextResponse.json(
                {
                    success: false,
                    message: "Cấu hình reCAPTCHA chưa hoàn tất. Vui lòng liên hệ quản trị viên.",
                },
                { status: 500 }
            );
        }

        // Log token info for debugging (without exposing full token)
        console.log("[reCAPTCHA] Verifying token:", {
            tokenLength: token.length,
            tokenPrefix: token.substring(0, 20),
            secretKeyPrefix: secretKey.substring(0, 10) + "...",
        });

        // Verify token with Google
        const verifyResponse = await fetch(RECAPTCHA_VERIFY_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                secret: secretKey,
                response: token,
            }),
        });

        if (!verifyResponse.ok) {
            console.error("[reCAPTCHA] Google API error:", verifyResponse.status, verifyResponse.statusText);
            return NextResponse.json(
                {
                    success: false,
                    message: "Không thể kết nối đến Google reCAPTCHA. Vui lòng thử lại sau.",
                },
                { status: 500 }
            );
        }

        const verifyData = await verifyResponse.json();

        if (!verifyData.success) {
            const errorCodes = verifyData["error-codes"] || [];
            console.warn("[reCAPTCHA] Verification failed:", {
                errors: errorCodes,
                tokenLength: token.length,
                tokenPrefix: token.substring(0, 20),
            });

            // Provide more specific error messages
            let errorMessage = "Xác thực CAPTCHA thất bại. Vui lòng thử lại.";

            if (errorCodes.includes("browser-error")) {
                errorMessage = "Domain không khớp với cấu hình reCAPTCHA. Vui lòng kiểm tra domain trong Google reCAPTCHA Console hoặc thử lại sau.";
            } else if (errorCodes.includes("invalid-input-response")) {
                errorMessage = "Token reCAPTCHA không hợp lệ hoặc đã hết hạn. Vui lòng thử lại.";
            } else if (errorCodes.includes("invalid-input-secret")) {
                errorMessage = "Cấu hình reCAPTCHA không đúng. Vui lòng liên hệ quản trị viên.";
            } else if (errorCodes.includes("timeout-or-duplicate")) {
                errorMessage = "Token reCAPTCHA đã được sử dụng hoặc hết hạn. Vui lòng thử lại.";
            }

            return NextResponse.json(
                {
                    success: false,
                    message: errorMessage,
                    errors: errorCodes,
                },
                { status: 400 }
            );
        }

        // Check score (for reCAPTCHA v3, score should be >= 0.5)
        const score = verifyData.score || 0;
        if (score < 0.5) {
            console.warn("[reCAPTCHA] Low score:", score);
            return NextResponse.json(
                {
                    success: false,
                    message: "Xác thực CAPTCHA không đạt yêu cầu. Vui lòng thử lại.",
                    score,
                },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Xác thực CAPTCHA thành công.",
            score,
            action: verifyData.action,
        });
    } catch (error) {
        console.error("[reCAPTCHA] Verification error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Đã xảy ra lỗi khi xác thực CAPTCHA. Vui lòng thử lại.",
            },
            { status: 500 }
        );
    }
}

