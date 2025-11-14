'use client';

export interface HomeNavigationItem {
    key: string;
    label: string;
    href?: string;
    type?: 'home' | 'link' | 'dropdown';
    subItems?: Array<{ key: string; label: string; href: string }>;
}

export interface HomeBreadcrumbItem {
    label: string;
    href?: string;
}

export const HOME_NAVIGATION_ITEMS: HomeNavigationItem[] = [
    {
        key: 'home',
        label: 'Trang chủ',
        href: '/',
        type: 'home',
    },
    {
        key: 'news',
        label: 'Giới thiệu',
        href: '/tin-tuc',
        type: 'link',
    },
    {
        key: 'procedures',
        label: 'Thủ tục hành chính',
        href: '/thu-tuc-hanh-chinh',
        type: 'link',
    },
    {
        key: 'submit',
        label: 'Nộp hồ sơ trực tuyến',
        href: '/submit',
        type: 'link',
    },
    {
        key: 'lookup',
        label: 'Tra cứu hồ sơ',
        href: '/lookup',
        type: 'link',
    },
    {
        key: 'feedback',
        label: 'Phản ánh - Kiến nghị',
        href: '/feedback',
        type: 'link',
    },
    {
        key: 'evaluation',
        label: 'Đánh giá',
        href: '/evaluation',
        type: 'link',
    },
    {
        key: 'statistics',
        label: 'Thống kê',
        href: '/statistics',
        type: 'link',
    },
    {
        key: 'support',
        label: 'Hỗ trợ',
        type: 'dropdown',
        subItems: [
            { key: 'support-lookup', label: 'Tra cứu hồ sơ TTHC', href: '/lookup' },
            { key: 'support-guide', label: 'Hướng dẫn sử dụng', href: '/guide' },
            { key: 'support-faq', label: 'Câu hỏi thường gặp', href: '/faq' },
            { key: 'support-survey', label: 'Khảo sát ý kiến', href: '/survey' },
            { key: 'support-search-questions', label: 'Tra cứu câu hỏi', href: '/search-questions' },
            { key: 'support-contact', label: 'Số điện thoại hướng dẫn giải quyết TTHC', href: '/contact' },
        ],
    },
];

export const HOME_BREADCRUMB_MAP: Record<string, HomeBreadcrumbItem[]> = {
    home: [{ label: 'Trang chủ', href: '/' }],
    news: [
        { label: 'Trang chủ', href: '/' },
        { label: 'Giới thiệu' },
    ],
    procedures: [
        { label: 'Trang chủ', href: '/' },
        { label: 'Thủ tục hành chính' },
    ],
    submit: [
        { label: 'Trang chủ', href: '/' },
        { label: 'Nộp hồ sơ trực tuyến' },
    ],
    lookup: [
        { label: 'Trang chủ', href: '/' },
        { label: 'Tra cứu hồ sơ' },
    ],
    feedback: [
        { label: 'Trang chủ', href: '/' },
        { label: 'Phản ánh - Kiến nghị' },
    ],
    evaluation: [
        { label: 'Trang chủ', href: '/' },
        { label: 'Đánh giá' },
    ],
    statistics: [
        { label: 'Trang chủ', href: '/' },
        { label: 'Thống kê' },
    ],
    support: [
        { label: 'Trang chủ', href: '/' },
        { label: 'Hỗ trợ' },
    ],
};

/**
 * Map concrete path (prefix match) to navigation key.
 * Order matters: more specific paths should appear before more generic ones.
 */
export const HOME_PATH_KEY_MAP: Record<string, string> = {
    '/': 'home',
    '/tin-tuc': 'news',
    '/thu-tuc-hanh-chinh': 'procedures',
    '/thu-tuc-hanh-chinh/': 'procedures',
    '/submit': 'submit',
    '/lookup': 'lookup',
    '/feedback': 'feedback',
    '/evaluation': 'evaluation',
    '/statistics': 'statistics',
    '/guide': 'support',
    '/faq': 'support',
    '/survey': 'support',
    '/search-questions': 'support',
    '/contact': 'support',
};

export function getHomeNavigationKeyByPath(pathname: string): string {
    const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '');

    let matchedKey = 'home';
    let maxLength = 0;

    Object.entries(HOME_PATH_KEY_MAP).forEach(([path, key]) => {
        const normalizedEntry = path === '/' ? '/' : path.replace(/\/$/, '');
        if (normalizedPath === normalizedEntry || normalizedPath.startsWith(normalizedEntry === '/' ? '/' : `${normalizedEntry}/`)) {
            if (normalizedEntry.length > maxLength) {
                maxLength = normalizedEntry.length;
                matchedKey = key;
            }
        }
    });

    return matchedKey;
}

const HOME_DETAIL_BREADCRUMB_LABEL: Partial<Record<string, string>> = {
    procedures: 'Chi tiết thủ tục hành chính',
    news: 'Chi tiết bài viết',
};

export function getHomeBreadcrumbsByPath(pathname: string): HomeBreadcrumbItem[] {
    const rawPath = pathname || '/';
    const normalizedPath = rawPath === '/' ? '/' : rawPath.replace(/\/$/, '');

    if (normalizedPath === '/') {
        return [];
    }

    let matchedKey: string = 'home';
    let matchedEntry = '/';
    let maxLength = 0;

    Object.entries(HOME_PATH_KEY_MAP).forEach(([path, key]) => {
        const normalizedEntry = path === '/' ? '/' : path.replace(/\/$/, '');
        if (normalizedPath === normalizedEntry || normalizedPath.startsWith(normalizedEntry === '/' ? '/' : `${normalizedEntry}/`)) {
            if (normalizedEntry.length > maxLength) {
                maxLength = normalizedEntry.length;
                matchedKey = key;
                matchedEntry = normalizedEntry;
            }
        }
    });

    const baseBreadcrumbs = HOME_BREADCRUMB_MAP[matchedKey] ?? [{ label: 'Trang chủ', href: '/' }];
    const hasDeeperPath = normalizedPath !== matchedEntry;

    if (!hasDeeperPath) {
        return baseBreadcrumbs;
    }

    const detailLabel = HOME_DETAIL_BREADCRUMB_LABEL[matchedKey] ?? 'Trang hiện tại';
    return [...baseBreadcrumbs, { label: detailLabel }];
}
