// ============================================
// CONFIG — Winston logger + Morgan middleware
// ============================================
import { createLogger, format, transports } from 'winston';
import morgan from 'morgan';

const isDev = process.env['NODE_ENV'] !== 'production';

// Winston logger
export const logger = createLogger({
  level: isDev ? 'http' : 'warn',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    isDev
      ? format.combine(
          format.colorize(),
          format.printf(({ timestamp, level, message }) => {
            return `${timestamp} ${level}: ${message}`;
          })
        )
      : format.json()
  ),
  transports: [
    new transports.Console(),
    ...(!isDev
      ? [new transports.File({ filename: 'logs/error.log', level: 'error' })]
      : []),
  ],
});

// Morgan stream → redirige a logger.http
const morganStream = {
  write: (message: string) => logger.http(message.trim()),
};

// Morgan middleware
const morganFormat = isDev ? 'dev' : 'combined';
export const morganMiddleware = morgan(morganFormat, { stream: morganStream });
