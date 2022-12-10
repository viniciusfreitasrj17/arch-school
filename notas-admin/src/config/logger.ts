import { createLogger, format, transports, config, Logger } from 'winston';
const { combine, timestamp, json, errors, metadata } = format;

const serverLogger: Logger = createLogger({
  levels: config.syslog.levels,
  defaultMeta: { component: 'server-service' },
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/server-service-notas-admin.log' }),
  ]
});
const adminLogger: Logger = createLogger({
  levels: config.syslog.levels,
  defaultMeta: { component: 'admin-service' },
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    json(),
    errors({ stack: true }),
    metadata(),
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/admin-service-notas-admin.log' }),
  ]
});
const studentLogger: Logger = createLogger({
  levels: config.syslog.levels,
  defaultMeta: { component: 'student-service' },
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/student-service-notas-admin.log' }),
  ]
});
const scoreLogger: Logger = createLogger({
  levels: config.syslog.levels,
  defaultMeta: { component: 'score-service' },
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/score-service-notas-admin.log' }),
  ]
});
const authLogger: Logger = createLogger({
  levels: config.syslog.levels,
  defaultMeta: { component: 'auth-service' },
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/auth-service-notas-admin.log' }),
  ]
});

export {
  serverLogger,
  adminLogger,
  studentLogger,
  scoreLogger,
  authLogger,
};
