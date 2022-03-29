import { createLogger, format, transports, config, Logger } from 'winston';
const { combine, timestamp, json } = format;

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
    new transports.File({ filename: 'logs/server-service-notas-aluno.log' }),
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
    new transports.File({ filename: 'logs/student-service-notas-aluno.log' }),
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
    new transports.File({ filename: 'logs/score-service-notas-aluno.log' }),
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
    new transports.File({ filename: 'logs/auth-service-notas-aluno.log' }),
  ]
});

export {
  serverLogger,
  studentLogger,
  scoreLogger,
  authLogger,
};
