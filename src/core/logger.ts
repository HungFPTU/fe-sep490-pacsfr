type LogLevel = "debug" | "info" | "warn" | "error";

const levelOrder: Record<LogLevel, number> = {
    debug: 10,
    info: 20,
    warn: 30,
    error: 40,
};

const currentLevel: LogLevel = (process.env.NEXT_PUBLIC_LOG_LEVEL as LogLevel) || "info";

function log(level: LogLevel, ...args: unknown[]) {
    if (levelOrder[level] < levelOrder[currentLevel]) return;
    // eslint-disable-next-line no-console
    console[level === "debug" ? "log" : level](...args);
}

export const logger = {
    debug: (...args: unknown[]) => log("debug", ...args),
    info: (...args: unknown[]) => log("info", ...args),
    warn: (...args: unknown[]) => log("warn", ...args),
    error: (...args: unknown[]) => log("error", ...args),
}; 