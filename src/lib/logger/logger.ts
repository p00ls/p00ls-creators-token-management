import {createLogger, CurrentLog, LoggerOptions} from '@arpinum/log';

export function createAppLogger(options: LoggerOptions = {}) {
  return createLogger({
    getLogInputs,
    ...options,
  });
}

function getLogInputs({category, args}: CurrentLog) {
  return [category, ...args];
}
