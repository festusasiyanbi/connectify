export const FormatDateAndTime = (postDate: any) => {
  const currentDate: any = new Date();
  const timeDiff = currentDate - postDate;

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return seconds + 's';
  } else if (minutes < 60) {
    return minutes + 'm';
  } else if (hours < 24) {
    return hours + 'h';
  } else if (days < 30) {
    return days + 'd';
  } else if (months < 12) {
    return months + 'mo';
  } else {
    return years + 'yr';
  }
};

export default FormatDateAndTime;
