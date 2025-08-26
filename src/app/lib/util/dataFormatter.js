export const DataFormatter = {
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

  formatDate: (dateStr) => {
    if (!dateStr) return "-";

    // Expecting yyyy-mm-dd
    const [year, month, day] = dateStr.split("-");
    if (!year || !month || !day) return "-";

    return `${day}-${month}-${year}`;
  },

  formatDateTime: (dateTime) => {
    if (!dateTime) return "-";

    const date = DataFormatter.dateTimeToDate(dateTime);
    const time = DataFormatter.dateTimeToTime(dateTime);

    if (date === "-" || time === "-") return "-";

    return `${date} ${time}`;
  },

  dateTimeToDate: (dateTime) => {
    if (!dateTime) return "-";

    const dateObj = dateTime instanceof Date ? dateTime : new Date(dateTime);
    if (isNaN(dateObj)) return "-";

    const pad = (num) => String(num).padStart(2, "0");
    const year = dateObj.getFullYear();
    const month = pad(dateObj.getMonth() + 1);
    const day = pad(dateObj.getDate());

    return `${day}-${month}-${year}`;
  },

  dateTimeToTime: (dateTime) => {
    if (!dateTime) return "-";

    const dateObj = dateTime instanceof Date ? dateTime : new Date(dateTime);
    if (isNaN(dateObj)) return "-";

    return DataFormatter.formatTime(dateObj);
  },
};
