'use client';

import React from 'react';
import Image from 'next/image';

interface Props {
    iconUrl?: string;
    groupName: string;
    groupCode: string;
}

export const ServiceGroupIcon: React.FC<Props> = ({
    iconUrl,
    groupName,
    groupCode,
}) => {
    return (
        <div className="flex items-center gap-4">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-slate-200">
                {iconUrl ? (
                    <div className="relative h-full w-full">
                        <Image
                            src={iconUrl}
                            alt={groupName}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100">
                        <span className="text-sm text-slate-500">No image</span>
                    </div>
                )}
            </div>
            <div>
                <h3 className="text-lg font-semibold text-slate-900">
                    {groupName}
                </h3>
                <p className="text-sm text-slate-500">Mã: {groupCode}</p>
            </div>
        </div>
    );
};

