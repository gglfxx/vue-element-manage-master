import dayjs from 'dayjs';


export default function formatDate(date, format) {
  return dayjs(date).format(format);
}
