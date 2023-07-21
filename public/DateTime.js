class DateTime extends Date {
  constructor(...args) {
    super(...args);
  }

  static get TODAY() {
    return new DateTime();
  }

  static get Month() {
    return Month;
  }

  static get DateTimeFormat() {
    return DateTimeFormat;
  }

  /**
   * Returns whether the specified date is after the original date
   * @param {Date} date
   * @returns {Boolean}
   */
  isAfter(date) {
    return this > date;
  }

  /**
   * Returns whether the specified date is before the original date
   * @param {Date} date
   * @returns {Boolean}
   */
  isBefore(date) {
    return this < date;
  }

  /**
   * Checks whether the specified date is equal to the original date
   * @param {Date} date
   * @returns {Boolean}
   */
  equals(date) {
    return this.getTime() === date.getTime();
  }

  /**
   * Adds a number of days to the original date
   * @param {Number} days
   * @returns {Date}
   */
  plusDays(days) {
    return new Date(this.setDate(this.getDate() + days));
  }

  /**
   * Subtracts a number of days from the original date
   * @param {Number} days
   * @returns {Date}
   */
  minusDays(days) {
    return new Date(this.setDate(this.getDate() - days));
  }

  /**
   * Adds a number of weeks to the original date
   * @param {Number} weeks
   * @returns {Date}
   */
  plusWeeks(weeks) {
    return new Date(this.setDate(this.getDate() + 7 * weeks));
  }

  /**
   * Subtracts a number of weeks from the original date
   * @param {Number} weeks
   * @returns {Date}
   */
  minusWeeks(weeks) {
    return new Date(this.setDate(this.getDate() - 7 * weeks));
  }

  /**
   * Adds a number of months to the original date
   * @param {Number} months
   * @returns {Date}
   */
  plusMonths(months) {
    return new Date(this.setMonth(this.getMonth() + months));
  }

  /**
   * Subtracts a number of months from the original date
   * @param {Number} months
   * @returns {Date}
   */
  minusMonths(months) {
    return new Date(this.setMonth(this.getMonth() - months));
  }

  /**
   * Adds a number of years to the original date
   * @param {Number} years
   * @returns {Date}
   */
  plusYears(years) {
    return new Date(this.setFullYear(this.getFullYear() + years));
  }

  /**
   * Subtracts a number of years from the original date
   * @param {Number} years
   * @returns {Date}
   */
  minusYears(years) {
    return new Date(this.setFullYear(this.getFullYear() - years));
  }

  /**
   * Adds a number of hours to the original date
   * @param {Number} hours
   * @returns {Date}
   */
  plusHours(hours) {
    return new Date(this.setHours(this.getHours() + hours));
  }

  /**
   * Subtracts a number of hours from the original date
   * @param {Number} hours
   * @returns {Date}
   */
  minusHours(hours) {
    return new Date(this.setHours(this.getHours() - hours));
  }

  /**
   * Adds a number of minutes to the original date
   * @param {Number} minutes
   * @returns {Date}
   */
  plusMinutes(minutes) {
    return new Date(this.setMinutes(this.getMinutes() + minutes));
  }

  /**
   * Subtracts a number of minutes from the original date
   * @param {Number} minutes
   * @returns {Date}
   */
  minusMinutes(minutes) {
    return new Date(this.setMinutes(this.getMinutes() - minutes));
  }

  /**
   * Adds a number of seconds to the original date
   * @param {Number} seconds
   * @returns {Date}
   */
  plusSeconds(seconds) {
    return new Date(this.setSeconds(this.getSeconds() + seconds));
  }

  /**
   * Subtracts a number of seconds from the original date
   * @param {Number} seconds
   * @returns {Date}
   */
  minusSeconds(seconds) {
    return new Date(this.setSeconds(this.getSeconds() - seconds));
  }

  /**
   * Adds a number of milliseconds to the original date
   * @param {Number} milliseconds
   * @returns {Date}
   */
  plusMilliseconds(milliseconds) {
    return new Date(
      this.setMilliseconds(this.getMilliseconds() + milliseconds)
    );
  }

  /**
   * Subtracts a number of milliseconds from the original date
   * @param {Number} milliseconds
   * @returns {Date}
   */
  minusMilliseconds(milliseconds) {
    return new Date(
      this.setMilliseconds(this.getMilliseconds() - milliseconds)
    );
  }

  /**
   * Takes in an object containing the number of years/months/days/hours/minutes/seconds/milliseconds to add
   * @param {Object} dateObject
   * @returns {Date}
   */
  plus({
    years = 0,
    months = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0,
  }) {
    const newDate = this;
    newDate.setFullYear(newDate.getFullYear() + years);
    newDate.setMonth(newDate.getMonth() + months);
    newDate.setDate(newDate.getDate() + days);
    newDate.setHours(newDate.getHours() + hours);
    newDate.setMinutes(newDate.getMinutes() + minutes);
    newDate.setSeconds(newDate.getSeconds() + seconds);
    newDate.setMilliseconds(newDate.getMilliseconds() + milliseconds);
    return newDate;
  }

  /**
   * Takes in an object containing the number of years/months/days/hours/minutes/seconds/milliseconds to subtract
   * @param {Object} dateObject
   * @returns {Date}
   */
  minus({
    years = 0,
    months = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0,
  }) {
    const newDate = this;
    newDate.setFullYear(newDate.getFullYear() - years);
    newDate.setMonth(newDate.getMonth() - months);
    newDate.setDate(newDate.getDate() - days);
    newDate.setHours(newDate.getHours() - hours);
    newDate.setMinutes(newDate.getMinutes() - minutes);
    newDate.setSeconds(newDate.getSeconds() - seconds);
    newDate.setMilliseconds(newDate.getMilliseconds() - milliseconds);
    return newDate;
  }

  /**
   * Returns the number of seconds until a specified date-time
   * @param {Date} date
   * @returns {Number}
   */
  secondsUntil(date) {
    return (date.getTime() - this.getTime()) / 1000;
  }

  /**
   * Returns the number of minutes until a specified date-time
   * @param {Date} date
   * @returns {Number}
   */
  minutesUntil(date) {
    return (date.getTime() - this.getTime()) / (1000 * 60);
  }

  /**
   * Returns the number of hours until a specified date-time
   * @param {Date} date
   * @returns {Number}
   */
  hoursUntil(date) {
    return (date.getTime() - this.getTime()) / (1000 * 3600);
  }

  /**
   * Returns the number of days until a specified date
   * @param {Date} date
   * @returns {Number}
   */
  daysUntil(date) {
    return (date.getTime() - this.getTime()) / (1000 * 3600 * 24);
  }

  /**
   * Returns the number of weeks until a specified date
   * @param {Date} date
   * @returns {Number}
   */
  weeksUntil(date) {
    return this.daysUntil(date) / 7;
  }

  /**
   * Returns the number of weeks until a specified date
   * @param {Date} date
   * @returns {Number}
   */
  monthsUntil(date) {
    return this.daysUntil(date) / 30.4167;
  }

  /**
   * Returns the number of weeks until a specified date
   * @param {Date} date
   * @returns {Number}
   */
  yearsUntil(date) {
    return this.daysUntil(date) / 365.25;
  }

  /**
   * Returns the number of seconds until a specified date-time
   * @param {Date} dateTime
   * @returns {Number}
   */
  secondsSince(dateTime) {
    return (this.getTime() - dateTime.getTime()) / 1000;
  }

  /**
   * Returns the number of minutes until a specified date-time
   * @param {Date} dateTime
   * @returns {Number}
   */
  minutesSince(dateTime) {
    return (this.getTime() - dateTime.getTime()) / (1000 * 60);
  }

  /**
   * Returns the number of hours until a specified date-time
   * @param {Date} dateTime
   * @returns {Number}
   */
  hoursSince(dateTime) {
    return (this.getTime() - dateTime.getTime()) / (1000 * 3600);
  }

  /**
   * Returns the number of days since a specified date
   * @param {Date} dateTime
   * @returns {Number}
   */
  daysSince(dateTime) {
    return (this.getTime() - dateTime.getTime()) / (1000 * 3600 * 24);
  }

  /**
   * Returns the number of weeks since a specified date
   * @param {Date} dateTime
   * @returns {Number}
   */
  weeksSince(dateTime) {
    return this.daysSince(dateTime) / 7;
  }

  /**
   * Returns the number of months since a specified date
   * @param {Date} dateTime
   * @returns {Number}
   */
  monthsSince(dateTime) {
    return this.daysSince(dateTime) / 30.4167;
  }

  /**
   * Returns the number of years since a specified date
   * @param {Date} dateTime
   * @returns {Number}
   */
  yearsSince(dateTime) {
    return this.daysSince(dateTime) / 365.25;
  }

  /**
   * Formats the date according to strftime format
   * @param {String} sFormat
   * @returns {String}
   */
  strfTime(sFormat) {
    if (typeof sFormat !== "string") {
      const error = "Invalid format";
      throw new Error(error);
    }

    const nDay = this.getDay();
    const nDate = this.getDate();
    const nMonth = this.getMonth();
    const nYear = this.getFullYear();
    const nHour = this.getHours();
    const nTime = this.getTime();
    const aDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const aMonths = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const aDayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    const isLeapYear = () =>
      (nYear % 4 === 0 && nYear % 100 !== 0) || nYear % 400 === 0;
    const getThursday = () => {
      const target = new Date(this);
      target.setDate(nDate - ((nDay + 6) % 7) + 3);
      return target;
    };
    const zeroPad = (nNum, nPad) => (Math.pow(10, nPad) + nNum + "").slice(1);

    return sFormat.replace(/%[a-z]+\b/gi, (sMatch) => {
      return (
        ({
          "%a": aDays[nDay].slice(0, 3),
          "%A": aDays[nDay],
          "%b": aMonths[nMonth].slice(0, 3),
          "%B": aMonths[nMonth],
          "%c": this.toUTCString().replace(",", ""),
          "%C": Math.floor(nYear / 100),
          "%d": zeroPad(nDate, 2),
          "%e": nDate,
          "%F": new Date(nTime - this.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 10),
          "%G": getThursday().getFullYear(),
          "%g": (getThursday().getFullYear() + "").slice(2),
          "%H": zeroPad(nHour, 2),
          "%I": zeroPad(((nHour + 11) % 12) + 1, 2),
          "%j": zeroPad(
            aDayCount[nMonth] + nDate + (nMonth > 1 && isLeapYear() ? 1 : 0),
            3
          ),
          "%k": nHour,
          "%l": ((nHour + 11) % 12) + 1,
          "%m": zeroPad(nMonth + 1, 2),
          "%n": nMonth + 1,
          "%M": zeroPad(this.getMinutes(), 2),
          "%p": nHour < 12 ? "AM" : "PM",
          "%P": nHour < 12 ? "am" : "pm",
          "%s": Math.round(nTime / 1000),
          "%S": zeroPad(this.getSeconds(), 2),
          "%u": nDay || 7,
          "%V": (() => {
            const target = getThursday();
            const n1stThu = target.valueOf();
            target.setMonth(0, 1);
            const nJan1 = target.getDay();

            if (nJan1 !== 4) {
              target.setMonth(0, 1 + ((4 - nJan1 + 7) % 7));
            }

            return zeroPad(1 + Math.ceil((n1stThu - target) / 604800000), 2);
          })(),
          "%w": nDay,
          "%x": this.toLocaleDateString(),
          "%X": this.toLocaleTimeString(),
          "%y": (nYear + "").slice(2),
          "%Y": nYear,
          "%z": this.toTimeString().replace(/.+GMT([+-]\d+).+/, "$1"),
          "%Z": this.toTimeString().replace(/.+\((.+?)\)$/, "$1"),
          "%Zs": new Intl.DateTimeFormat("default", {
            timeZoneName: "short",
          })
            .formatToParts(this)
            .find((oPart) => oPart.type === "timeZoneName").value,
        }[sMatch] || "") + "" || sMatch
      );
    });
  }
}

const Month = {
  JANUARY: 0,
  FEBRUARY: 1,
  MARCH: 2,
  APRIL: 3,
  MAY: 4,
  JUNE: 5,
  JULY: 6,
  AUGUST: 7,
  SEPTEMBER: 8,
  OCTOBER: 9,
  NOVEMBER: 10,
  DECEMBER: 11,
};

const DateTimeFormat = {
  DD_MM_YYYY: "%d/%m/%Y",
  DD_MMM_YYYY: "%d %b %Y",
  DD_MMMM_YY: "%d %B %y",
  DD_MMMM_YYYY: "%d %B %Y",

  MM_DD_YYYY: "%m/%d/%Y",
  MMM_DD_YY: "%b %d, %y",
  MMMM_DD_YY: "%B %d, %y",
  MMMM_DD_YYYY: "%B %d, %Y",
  MMM_DD_YYYY: "%b %d, %Y",

  YYYY_DD_MMMM: "%Y, %d %B",
  YYYY_MMMM_DD: "%Y %B, %d",

  WWWW_MMMM_DD_YYYY: "%A, %B %d, %Y",
  WWW_MMMM_DD_YYYY: "%a, %B %d, %Y",
  WWW_MMM_DD_YYYY: "%a, %b %d, %Y",
  WWW_MM_DD_YY: "%a, %m/%d/%Y",

  DD_MMMM_YY_HH_MM_SS: "%d-%B-%y %H:%M:%S",
  DD_MMMM_YY_H_MM_SS_AMPM: "%d-%B-%y %I:%M:%S %p",

  MMMM_DD_YY_H_MM_SS_AMPM: "%B %d, %y %I:%M:%S %p",
  MMM_DD_YY_H_MM_SS_AMPM: "%b %d, %y %I:%M:%S %p",
  MM_DD_YY_H_MM_SS_AMPM: "%m %d, %y %I:%M:%S %p",
  MMMM_DD_YY_HH_MM_SS: "%B %d, %y %H:%M:%S",

  DD_MMMM_YYYY_HH_MM_SS: "%d-%B-%Y %H:%M:%S",
  DD_MMMM_YYYY_H_MM_SS_AMPM: "%d-%B-%Y %I:%M:%S %p",

  MMMM_DD_YYYY_H_MM_SS_AMPM: "%B %d, %Y %I:%M:%S %p",
  MMM_DD_YYYY_H_MM_SS_AMPM: "%b %d, %Y %I:%M:%S %p",
  MM_DD_YYYY_H_MM_SS_AMPM: "%m %d, %Y %I:%M:%S %p",
  MMMM_DD_YYYY_HH_MM_SS: "%B %d, %Y %H:%M:%S",

  DD_MMMM_YY_HH_MM: "%d-%B-%y %H:%M",
  DD_MMMM_YY_H_MM_AMPM: "%d-%B-%y %I:%M %p",

  MMMM_DD_YY_H_MM_AMPM: "%B %d, %y %I:%M %p",
  MMM_DD_YY_H_MM_AMPM: "%b %d, %y %I:%M %p",
  MMMM_DD_YY_HH_MM: "%B %d, %y %H:%M",

  WWWW_DD_MMMM_YYYY_H_MM_SS_AMPM: "%A, %d %B %Y %I:%M:%S %p",
  WWW_DD_MMMM_YYYY_H_MM_AMPM: "%a, %d %B %Y %I:%M %p",
  WWW_DD_MMMM_YYYY_HH_MM: "%a, %d %B %Y %I:%M:%S %p",
  WWW_DD_MMMM_YYYY_HH_MM_SS: "%a, %d %B %Y %H:%M:%S",

  HH_MM_SS: "%H:%M:%S",
  HH_MM: "%H:%M",
  HH_MM_AMPM: "%I:%M %p",
  HH_MM_SS_AMPM: "%I:%M:%S %p",
  // WWW: "%A",
  // WW: "%a",
  // MM: "%m",
  // MMM: "%b",
  // MMMM: "%B",
  // DD: "%d",
  // YY: "%y",
  // YYYY: "%Y",
  // HH: "%H",
  // h: "%I",
  // mm: "%M",
  // SS: "%S",
  // s: "%S",
  // AMPM: "%p",
  TZ: "%Z",
  tz: "%Zs",
};

function dateTimeOf(...args) {
  return new DateTime(...args);
}

module.exports = {
  dateTimeOf,
  DateTime,
  Month,
  DateTimeFormat,
};
