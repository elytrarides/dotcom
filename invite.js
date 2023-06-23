function format_time(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');
    const paddedSeconds = seconds.toString().padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}

const MONTHS = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const span_fmt = (d) => {
    let hours_24 = d.getHours(); 
    let hours = hours_24;
    if (hours > 12) hours -= 12;
    if (!hours) hours = 12;
    const min = d.getMinutes();
    return `${hours}${!min ? "" : `:${min}`}${hours_24 > 12 ? "pm" : "am"}`;
}

function format_date(date) {
    const d = new Date(date.getTime());

    const day = DAYS[d.getDay()];
    const month = MONTHS[d.getMonth()];

    return `${day}, ${month} ${d.getDate()} ${span_fmt(d)}`;
}

document.addEventListener("DOMContentLoaded", () => {
    // wait for this to go wrong lol
    const event = JSON.parse(document.head.querySelector("meta[property=elytra_event]").content);
    const start = new Date(event.reservations_start * 1000);
    const end = new Date(event.reservations_end * 1000);
    const now = new Date();

    const el_date = document.getElementById("event-date");
    el_date.innerText = format_date(start);

    const el_container = document.getElementById("button-container");
    const el_button = document.createElement("button");
    el_button.style = "padding: 10px; font-size: 200%; font-weight: bold";

    if (start.getTime() < now.getTime() && now.getTime() < end.getTime()) {
        el_button.innerText = "Reserve a ride";
        el_button.addEventListener("click", () => window.location.href = "https://ride.elytra.to/-/" + event.code)
    } else if (end.getTime() < now.getTime()) {
        el_button.innerText = "Event has ended";
        el_button.disabled = true;
    } else {
        el_button.innerText = "Event not started";
        el_button.disabled = true;

        setInterval(() => {
            const now = new Date();

            const diff = start.getTime() - now.getTime();
            if (diff < 0) window.location.href = "";

            el_button.innerText = diff < 0 ? "Opening..." : format_time(diff);
        });
    }

    el_container.appendChild(el_button);
});
