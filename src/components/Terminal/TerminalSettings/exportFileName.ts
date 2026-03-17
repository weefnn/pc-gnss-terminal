const formatDate = (date: Date) =>
    `${date.getDate().toString().padStart(2, '0')}${(
        date.getMonth() + 1
    )
        .toString()
        .padStart(2, '0')}${date.getFullYear()}_${date
        .getHours()
        .toString()
        .padStart(2, '0')}${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}${date.getSeconds().toString().padStart(2, '0')}`;

export const getExportFileName = (date: Date) =>
    `gnss-terminal-${formatDate(date)}.txt`;
