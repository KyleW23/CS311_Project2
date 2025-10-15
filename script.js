let url = 'https://eventregistry.org/api/v1/article/getArticles';
let apiKey = '';

const getData = async () => {
    const search = document.getElementById('search');

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'getArticles',
                keyword: search.value,
                sourceLocationUri: 'http://en.wikipedia.org/wiki/United_States',
                ignoreSourceGroupUri: 'paywall/paywalled_sources',
                articlesPage: 1,
                articlesCount: 20,
                articlesSortBy: 'date',
                articlesSortByAsc: false,
                dataType: ['news', 'pr'],
                forceMaxDataTimeWindow: 31,
                resultType: 'articles',
                apiKey: apiKey,
            }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error: ', error);
        return {
            error: true,
            message: error.message,
        };
    }
};

const displayNews = async () => {
    const container = document.getElementById('results');
    container.innerHTML = '';

    const data = await getData();

    if (data.error) {
        container.innerHTML = `<p class="error">Failed to load articles: ${data.message}</p>`;
        return;
    }

    const results = data.articles.results;
    if (!results || results.length == 0) {
        container.innerHTML = `<p>No articles found.</p>`;
        return;
    }

    results.forEach((result) => {
        const link = document.createElement('a');
        link.href = result.url;
        link.target = '_blank';
        link.className = 'articleLink';
        // Need to add alt to img
        link.innerHTML = `
                <div class="articleCard">
                    <div class="left">
                        <img src="${result.image}" alt="Image From article: ${result.title}"  />
                    </div>
                    <div class="middle">
                        <h1 class="title">${result.title}</h1>
                        <p class="description">${result.body}</p>
                    </div>
                    <div class="right">
                        <p class="source">${result.source.title}</p>
                        <p class="time">${result.date}</p>
                    </div>
                </div>
            `;
        container.appendChild(link);
    });
};

const button = document.getElementById('button');
button.addEventListener('click', displayNews);

const form = document.getElementById('searchForm');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    displayNews();
});
