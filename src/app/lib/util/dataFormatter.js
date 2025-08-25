export const DataFormatter = {
  /**
   * Format a time string or Date object to 12-hour format HH:MM AM/PM
   * @param {string|Date} time - e.g. "23:15:01.576" or Date object
   * @returns {string} formatted time
   */
  formatTime: (time) => {
    if (!time) return "-";

    const pad = (num) => String(num).padStart(2, "0");

    let hours, minutes, period;

    if (typeof time === "string") {
      const [hms] = time.split("."); // remove milliseconds
      [hours, minutes] = hms.split(":").map(Number);
    } else if (time instanceof Date) {
      hours = time.getHours();
      minutes = time.getMinutes();
    } else {
      return "-";
    }

    period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${pad(hours)}:${pad(minutes)} ${period}`;
  },

  /**
   * Extracts date (YYYY-MM-DD) from ISO string or Date.
   * @param {string|Date} dateTime
   * @returns {string} formatted date YYYY-MM-DD
   */
  dateTimeToDate: (dateTime) => {
    if (!dateTime) return "-";

    const dateObj = dateTime instanceof Date ? dateTime : new Date(dateTime);
    if (isNaN(dateObj)) return "-";

    const pad = (num) => String(num).padStart(2, "0");
    const year = dateObj.getFullYear();
    const month = pad(dateObj.getMonth() + 1);
    const day = pad(dateObj.getDate());

    return `${year}-${month}-${day}`;
  },

  /**
   * Extracts time (HH:MM AM/PM) from ISO string or Date.
   * @param {string|Date} dateTime
   * @returns {string} formatted time HH:MM AM/PM
   */
  dateTimeToTime: (dateTime) => {
    if (!dateTime) return "-";

    const dateObj = dateTime instanceof Date ? dateTime : new Date(dateTime);
    if (isNaN(dateObj)) return "-";

    return DataFormatter.formatTime(dateObj);
  },

  /**
   * Formats both date and time into one string: YYYY-MM-DD HH:MM AM/PM
   * @param {string|Date} dateTime
   * @returns {string} formatted date and time
   */
  formatDateTime: (dateTime) => {
    if (!dateTime) return "-";

    const date = DataFormatter.dateTimeToDate(dateTime);
    const time = DataFormatter.dateTimeToTime(dateTime);

    if (date === "-" || time === "-") return "-";

    return `${date} ${time}`;
  },
};
