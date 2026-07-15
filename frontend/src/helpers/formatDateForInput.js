export const formatDateForInput = (date) => {
    return date.replace(" ", "T").slice(0, 16); // "2026-05-08 11:00:26" → "2026-05-08T11:00"
};