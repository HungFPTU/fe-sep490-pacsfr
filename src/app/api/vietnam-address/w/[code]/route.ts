"use server";

import { NextResponse } from "next/server";
import {
    VIETNAM_ADDRESS_REMOTE_BASE,
    getFallbackWardByCode,
} from "../../utils";

interface Params {
    params: {
        code: string;
    };
}

export async function GET(_request: Request, { params }: Params) {
    const { code } = params;

    try {
        const remoteUrl = new URL(`${VIETNAM_ADDRESS_REMOTE_BASE}/w/${code}`);
        const response = await fetch(remoteUrl.toString(), {
            method: "GET",
            headers: { Accept: "application/json" },
            cache: "no-store",
        });

        if (!response.ok) {
            console.error("[vietnam-address] /w/:code remote error:", response.status, response.statusText);
            const fallback = getFallbackWardByCode(code);
            if (!fallback) {
                return NextResponse.json({ message: "Không tìm thấy phường/xã." }, { status: 404 });
            }

            return NextResponse.json(fallback, {
                status: 200,
                headers: { "x-fallback": "true" },
            });
        }

        const data = await response.json();
        return NextResponse.json(data, {
            status: 200,
            headers: {
                "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
            },
        });
    } catch (error) {
        console.error("[vietnam-address] /w/:code fetch error:", error);
        const fallback = getFallbackWardByCode(code);
        if (!fallback) {
            return NextResponse.json({ message: "Không tìm thấy phường/xã." }, { status: 404 });
        }
        return NextResponse.json(fallback, {
            status: 200,
            headers: { "x-fallback": "true" },
        });
    }
}

