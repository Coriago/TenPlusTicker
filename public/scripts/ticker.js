const subreddit = "livestreamfail";
const numberOfPosts = 10;


const fetchPosts = async () => {
    const posts = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    const responseJSON = await posts.json();
    formatPosts(responseJSON);
}

const formatPosts = (responseJSON) => {
    const posts = [];
    const labels = [];
    const data = [];
    posts.join(...responseJSON.data.children);
    posts.forEach(({data: {title, score}}) => {
        labels.push(title);
        data.push(score);
    });
    createChart(labels, data);
}

const createChart = (labs, dat) => {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labs,
            datasets: [{
                label: 'Score',
                data: dat,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
};

fetchPosts();