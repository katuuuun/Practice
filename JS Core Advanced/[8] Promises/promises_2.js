const examples = [
    'https://randomurl.org',
    'https://testurl.com'
];
async function parallelUrl(examples) {
    try {
        const Promises = examples.map(url =>
            fetch(url).then(response => {
                if (!response.ok) {
                    throw new Error(`Ошибка загрузки ${url}: ${response.statusText}`);
                }
                return response.text();
            })
        );

        const results = await Promise.all(Promises);
        return results;
    } catch (error) {
        console.error('Ошибка при загрузке URL:', error);
        throw error;
    }
}

parallelUrl(examples)
    .then(content => {
        content.forEach((content, i) => {
            console.log(`Содержимое URL ${examples[i]}:`, content);
        });
    })
    .catch(error => {
        console.error('Ошибка при загрузке URL:', error);
    });

