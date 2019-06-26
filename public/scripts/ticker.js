const subreddit = "livestreamfail";
const numberOfPosts = 10;


const fetchPosts = async () => {
    const posts = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json`);
    const responseJSON = await posts.json();
    formatPosts(responseJSON);
}

const formatPosts = (responseJSON) => {
    posts = [];
    labels = [];
    data = [];
    
    posts.join(...responseJSON.data.children);
    posts.forEach(({data: {title, score}}) => {
        labels.push(title);
        data.push(score);
    });
    console.log("Here");
    console.log(responseJSON);
    console.log(labels);
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