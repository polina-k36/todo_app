export const getErrorTitle = (statusCode: number): string => {
    
    if (statusCode >= 500) {
        return 'Ошибка сервера';        
    }
    
    switch (statusCode) {
        case 401:
            return 'Ошибка авторизации';

        case 403:
            return 'Доступ запрещен';

        case 404:
            return 'Не найдено';

        case 409:
            return 'Конфликт данных';

        default:
            return 'Непредвиденная ошибка';
    }
}