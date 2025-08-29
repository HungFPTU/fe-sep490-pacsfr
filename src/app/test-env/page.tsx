"use client";

import { ENV } from "@/core/config/env";

export default function TestEnvPage() {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Environment Variables Test</h1>

            <div className="space-y-4">
                <div className="p-4 bg-gray-100 rounded">
                    <h2 className="font-semibold">From ENV Object:</h2>
                    <p>API_BASE_URL: {ENV.API_BASE_URL}</p>
                    <p>APP_NAME: {ENV.APP_NAME}</p>
                    <p>LOG_LEVEL: {ENV.LOG_LEVEL}</p>
                    <p>IS_DEV: {ENV.IS_DEV.toString()}</p>
                </div>

                <div className="p-4 bg-blue-100 rounded">
                    <h2 className="font-semibold">Direct process.env:</h2>
                    <p>NEXT_PUBLIC_API_BASE_URL: {process.env.NEXT_PUBLIC_API_BASE_URL || "undefined"}</p>
                    <p>NEXT_PUBLIC_APP_NAME: {process.env.NEXT_PUBLIC_APP_NAME || "undefined"}</p>
                    <p>NODE_ENV: {process.env.NODE_ENV || "undefined"}</p>
                </div>

                <div className="p-4 bg-green-100 rounded">
                    <h2 className="font-semibold">Runtime Info:</h2>
                    <p>typeof window: {typeof window}</p>
                    <p>IS_CLIENT: {ENV.IS_CLIENT.toString()}</p>
                    <p>IS_SERVER: {ENV.IS_SERVER.toString()}</p>
                </div>
            </div>
        </div>
    );
}