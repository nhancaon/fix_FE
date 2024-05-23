import moment from 'moment';

class DateUtils {
    static instance;

    constructor() {
        if (DateUtils.instance) {
            return DateUtils.instance;
        }
        DateUtils.instance = this;
    }
    formatDateString(dateString) {
        return moment(dateString).format('YYYY-MM-DD');
    }

    formatDate(date, format = 'DD-MM-YYYY HH:mm:ss') {
        return moment(date).format(format);
    }

    convertToDate(dateString, format = 'DD-MM-YYYY HH:mm:ss') {
        return moment(dateString, format).toDate();
    }

    isInRangeXMinutesAgo(date, minutes) {
        const now = moment();
        const pastDate = moment(date).add(minutes, 'minutes');
        return pastDate.isAfter(now);
    }

    isAtLeastXSecondsAgo(date, seconds) {
        const now = moment();
        const pastDate = moment(date).add(seconds, 'seconds');
        return pastDate.isBefore(now);
    }

    startOfDay(date) {
        return moment(date).startOf('day').toDate();
    }

    endOfDay(date) {
        return moment(date).endOf('day').toDate();
    }
}

const dateUtilsInstance = new DateUtils();
Object.freeze(dateUtilsInstance);

export default dateUtilsInstance;
