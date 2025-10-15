let data = {
    articles: {
        results: [
            {
                0: {
                    uri: '8909189793',
                    lang: 'eng',
                    isDuplicate: false,
                    date: '2025-10-14',
                    time: '23:42:01',
                    dateTime: '2025-10-14T23:42:01Z',
                    dateTimePub: '2025-10-14T23:31:09Z',
                    dataType: 'news',
                    sim: 0.6274510025978088,
                    url: 'https://finance.yahoo.com/news/elon-musk-says-bitcoin-energy-233109041.html',
                    title: "Elon Musk Says Bitcoin Has Energy: 'You Can Issue Fake Fiat...But It Is Impossible To Fake Energy'",
                    body: 'Benzinga and Yahoo Finance LLC may earn commission or revenue on some items through the links below. Elon Musk said Tuesday that Bitcoin (CRYPTO: BTC) is based on energy and, unlike fiat currencies, governments cannot fake it and issue their own. The Tesla and SpaceX CEO responded to an X post ...',
                    source: {
                        uri: 'finance.yahoo.com',
                        dataType: 'news',
                        title: 'Yahoo! Finance',
                    },
                    image: 'https://media.zenfs.com/en/benzinga_79/76eb89aabdb290497bfa4796cb018f35',
                    eventUri: 'eng-11051153',
                    sentiment: 0.1764705882352942,
                    wgt: 498181321,
                    relevance: 51,
                },
            },
        ],
    },
};

const displayNews = () => {
    const container = document.getElementById('results');
    container.innerHTML = '';

    const resultsArray = data.articles.results;
    resultsArray.forEach((resultObj) => {
        Object.values(resultObj).forEach((result) => {
            const link = document.createElement('a');
            link.href = result.url;
            link.target = '_blank';
            link.className = 'articleLink';
            // Need to add alt to img
            link.innerHTML = `
                <div class="articleCard">
                    <div class="left">
                        <img src="${result.image}"  />
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
    });
};

const button = document.getElementById('button');
button.addEventListener('click', displayNews);
