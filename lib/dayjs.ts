import dayjs from 'dayjs';
import 'dayjs/locale/fr.js';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.locale('fr');
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);

export type { Dayjs } from 'dayjs';

export const date = dayjs;
