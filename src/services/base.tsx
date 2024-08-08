export function getPreviousDays(previousDate: string) {
    const date = new Date(previousDate);
    const currentDate = new Date();
    const dateMilliseconds = date.getTime();
    const currentDateMilliseconds = currentDate.getTime();
    const differenceMilliseconds = currentDateMilliseconds - dateMilliseconds;
    const days = Math.floor(differenceMilliseconds / (1000 * 60 * 60 * 24));
    return days;
}
export function getPreviousMonth(): string {
    const months = [
        "janeiro", "fevereiro", "março", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];

    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    const previousMonthIndex = (currentMonthIndex - 1 + 12) % 12;
    const previousMonth = months[previousMonthIndex];

    return `em relação a ${previousMonth}`;
}

export function formatCurrency (value: number | string): string  {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    const formattedValue = numericValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const parts = formattedValue.split(',');
    const integerPart = parts[0];
    const decimalPart = parts.length > 1 ? `,${parts[1]}` : '';

    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `${formattedIntegerPart}${decimalPart}`;
};