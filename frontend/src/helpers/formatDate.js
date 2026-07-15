export function formatDate(date, locale = "en-US") {
    return new Date(date).toLocaleDateString(locale, {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}