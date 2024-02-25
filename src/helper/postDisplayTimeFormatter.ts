import { FormatOnType } from "@/types/index";

export function postDisplayTimeFormatter(postCreationTime: string) {
  const timeObj = {
    seconds: 1000,
    minutes: 1000 * 60,
    hours: 1000 * 60 * 60,
    days: 1000 * 60 * 60 * 24,
    postCreatedTime: new Date(postCreationTime),
    currentTime: new Date(),
    calcTimeDiff(formatOn: FormatOnType) {
      const timeDiff = this.currentTime.valueOf() - this.postCreatedTime.valueOf();
      return Math.round(timeDiff / this[formatOn]);
    },
  };

  if (timeObj.calcTimeDiff("seconds") < 60) {
    return `${timeObj.calcTimeDiff("seconds")}s`;
  } else if (timeObj.calcTimeDiff("minutes") < 60) {
    return `${timeObj.calcTimeDiff("minutes")}m`;
  } else if (timeObj.calcTimeDiff("hours") <= 24) {
    return `${timeObj.calcTimeDiff("hours")}h`;
  } else if (timeObj.calcTimeDiff("days") < 365) {
    return `${timeObj.calcTimeDiff("days")}d`;
  } else {
    return `${timeObj.calcTimeDiff("days") / 365}y`;
  }
}
