
export const diffFromToday = (timestamp: Date): string => {

    // this utility function returns only months or equivalent
    // can be modified for years, hours, minutes etc
    // assumption is that the timestamp is on a different day

    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const today = new Date();

    const utc1 = Date.UTC(timestamp.getFullYear(), timestamp.getMonth(), timestamp.getDate());
    const utc2 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());

    const diff = utc2 - utc1
    const days = Math.floor(diff / MS_PER_DAY);
    const months = Math.floor(days / 30);

    return months === 0 ? `${days} days ago` : `${months} months ago`;
}