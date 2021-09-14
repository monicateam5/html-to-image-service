import {createLogger, format, Logger as LoggerType, transports} from "winston";
import * as Transport from "winston-transport";
import * as moment from "moment";

export let Logger: LoggerType;

const Colors = {
    info: "\x1b[34m",
    error: "\x1b[31m",
    warn: "\x1b[33m",
    debug: "\x1b[32m",
    silly: "\x1b[36m",
};

/**
 * initLogger - creates logger.
 * @function
 * @author Danil Andreev
 */
export function initLogger(logLevel: string = "error"): LoggerType {

    const logFormat = format.printf(({level, message, label, timestamp}) => {
        const host: string | undefined = process.env.COMPUTERNAME;
        return `${Colors[level] || ""}(${host})  ${label}[${moment(timestamp).format("LLL")}] <${level}>: ${message}`;
    });

    const logTransports: Transport[] = [new transports.Console()];

    Logger = createLogger({
        level: logLevel,
        format: format.combine(format.label({label: "GHTB"}), format.timestamp(), logFormat),
        transports: logTransports,
    });
    return Logger;
}
