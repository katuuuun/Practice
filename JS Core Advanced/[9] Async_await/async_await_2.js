const firstServerUrl = 'https://firstserver.com/data/';
const secondServerUrl = 'https://secondserver.com/end';


async function loadDataFromFirstServer(url) {
    console.log(`Запрос к первому серверу: ${url}`);
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = { Data: 'Value' };
            console.log('Данные с первого сервера:', data);
            resolve(data);
        }, 1000);
    });
}

async function useDataOnSecondServer(url, data) {
    console.log(`Запрос ко второму серверу: ${url} с данными`, data);
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Данные, отправленные на второй сервер:', data);
            const result = { success: true };
            resolve(result);
        }, 1000);
    });
}

async function mainfunc(firstUrl, secondUrl) {
    try {
        const data = await loadDataFromFirstServer(firstUrl);

        const result = await useDataOnSecondServer(secondUrl, data);

        console.log('Результат от второго сервера:', result);
    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
}

mainfunc(firstServerUrl, secondServerUrl);
