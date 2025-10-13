import dayjsLib from 'dayjs';
import 'dayjs/locale/fr';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

dayjsLib.extend(relativeTime);
dayjsLib.extend(utc);
dayjsLib.locale('fr');

const dayjs = dayjsLib;

export { dayjs };
