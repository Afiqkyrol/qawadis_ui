export const DataFormatter = {
  /**
   * Format a time string or Date object to 12-hour format HH:MM AM/PM
   * @param {string|Date} time - e.g. "23:15:01.576" or Date object
   * @returns {string} formatted time
   */
  formatTime: (time) => {
    if (!time) return "-";

    // Helper to pad numbers
    const pad = (num) => String(num).padStart(2, "0");

    let hours, minutes, period;

    if (typeof time === "string") {
      // Handle string like "23:15:01.576"
      const [hms] = time.split("."); // remove milliseconds
      [hours, minutes] = hms.split(":").map(Number);
    } else if (time instanceof Date) {
      hours = time.getHours();
      minutes = time.getMinutes();
    } else {
      return "-";
    }

    period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // convert 0 → 12

    return `${pad(hours)}:${pad(minutes)} ${period}`;
  },
};
