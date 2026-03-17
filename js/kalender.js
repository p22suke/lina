function getCustomDate() {
    const now = new Date();

    // Base date for custom year
    const baseDate = new Date(1918, 1, 24); // 24 Feb 1918
    const yearOffset = 13000;

    let customYear = now.getFullYear() - baseDate.getFullYear() + yearOffset;

    // If current date is before Feb 24, subtract 1
    const thisYearsBase = new Date(now.getFullYear(), 1, 24);
    if (now < thisYearsBase) {
        customYear--;
    }

        const calendarYear = now.getFullYear();

        // Age from epoch start: 1990-12-14 16:38 (Rapla/local time)
        const epochStart = new Date(1990, 11, 14, 16, 38, 0, 0);
        let age = now.getFullYear() - epochStart.getFullYear();
        const birthdayThisYear = new Date(
                now.getFullYear(),
                epochStart.getMonth(),
                epochStart.getDate(),
                epochStart.getHours(),
                epochStart.getMinutes(),
                epochStart.getSeconds(),
                epochStart.getMilliseconds()
        );
        if (now < birthdayThisYear) {
                age--;
        }

        // Custom week counter starts at Week1 on 16.03.2026
        const weekStart = new Date(2026, 2, 16, 0, 0, 0, 0);
        const weekMs = 7 * 24 * 60 * 60 * 1000;
        const elapsedWeeks = Math.floor((now - weekStart) / weekMs);
        const weekNumber = Math.max(1, elapsedWeeks + 1);

        const nowMarker = 0;

        return {
                customYear,
                calendarYear,
                age,
                nowMarker,
                weekNumber
        };
}

function updateTime() {
        const kalender = document.getElementById("kalender");
        if (!kalender) return;

        const dateParts = getCustomDate();
        kalender.innerHTML = `<a class="kal-week-link" href="/koodikoolis/index.html">Week${dateParts.weekNumber}</a><span class="kal-separator">;</span><span class="kalender-code"><span class="kal-number kal-year">${dateParts.customYear}</span>.<span class="kal-number kal-year">${dateParts.calendarYear}</span>.<span class="kal-number kal-age">${dateParts.age}</span>.<span class="kal-number kal-day">${dateParts.nowMarker}</span></span>`;
}

updateTime();
setInterval(updateTime, 60000); // update every minute