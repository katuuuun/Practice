
async function CatchWithTimeout(url, timeout = 5000) {
    let timer;
    const CatchDataPromise = fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка : ' + response.status);
            }
            return response.json();
        });

    const timeoutPromise = new Promise((resolve, reject) => {
        timer = setTimeout(() => {
            reject(new Error('Превышено время ожидания'));
        }, timeout);
    });

    try {
        const result = await Promise.race([CatchDataPromise, timeoutPromise]);
        clearTimeout(timer);
        return result;
    }

    catch (error) {
        throw error;
    }
}

async function catchData() {
    try {
        let data = await CatchWithTimeout('https://jsonplaceholder.typicode.com/posts/10', 500);
        console.log(data);
    } catch (error) {
        console.error('Ошибка при получении данных:', error.message);
    }
}

catchData();
