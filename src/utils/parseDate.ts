import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(relativeTime);

/**
 * Parses and formats a date object appropriately.
 * @param {Date} date - The date object to parse/format
 * @returns {string} `ddd, D MMM YYYY HH:mm:ss UTC (Roughly [time] ago)`
 * @example
 * import { parseDate } from './src/utils/parse';
 *
 * const d = parseDate(new Date());
 * console.log(d);
 */
export function parseDate(date: Date): string {
  const actualDate: string = dayjs(date)
    .utc()
    .format("ddd[,] D MMM YYYY HH:mm:ss");
  const agoTime: string = dayjs().to(dayjs(actualDate));
  const completeDate = `${actualDate} UTC (Roughly ${agoTime})`;
  return completeDate;
}
