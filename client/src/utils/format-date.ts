export const formatDate = (dateString: string, time: boolean = true): string => {
    const date = new Date(dateString);

    return (time) ?
    new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date)
    : new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'short'
    }).format(date);
};