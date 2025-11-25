"use server";

import { NextRequest, NextResponse } from "next/server";
import {
    VIETNAM_ADDRESS_REMOTE_BASE,
    getFallbackProvinceByCode,
} from "../../utils";

interface Params {
    params: {
        code: string;
    };
}

export async function GET(request: NextRequest, { params }: Params) {
    const { code } = params;
    const { searchParams } = new URL(request.url);
    const depth = searchParams.get("depth") ?? "2";

    try {
        const remoteUrl = new URL(`${VIETNAM_ADDRESS_REMOTE_BASE}/p/${code}`);
        remoteUrl.searchParams.set("depth", depth);

        const response = await fetch(remoteUrl.toString(), {
            method: "GET",
            headers: { Accept: "application/json" },
            cache: "no-store",
        });

        if (!response.ok) {
            console.error("[vietnam-address] /p/:code remote error:", response.status, response.statusText);
            const fallback = getFallbackProvinceByCode(code);
            if (!fallback) {
                return NextResponse.json({ message: "Không tìm thấy tỉnh/thành." }, { status: 404 });
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
        console.error("[vietnam-address] /p/:code fetch error:", error);
        const fallback = getFallbackProvinceByCode(code);
        if (!fallback) {
            return NextResponse.json({ message: "Không tìm thấy tỉnh/thành." }, { status: 404 });
        }
        return NextResponse.json(fallback, {
            status: 200,
            headers: { "x-fallback": "true" },
        });
    }
}

