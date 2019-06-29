const subreddit = "livestreamfail";
const numberOfPosts = 10;


const startPosts = async () => {
    const posts = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json`);
    const responseJSON = await posts.json();
    createFormatPosts(responseJSON);
}

const fetchPosts = async () => {
    const posts = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json`);
    const responseJSON = await posts.json();
    return responseJSON
}

//Only formats for the first creation
const createFormatPosts = (responseJSON) => {
    //Debugging
    console.log("Format data for chart creation");
    //Debugging
    var tableData = formatPosts(responseJSON);
    createChart(tableData.labs, tableData.dats);
}

const formatPosts = (responseJSON) => {
    posts = responseJSON.data.children;
    labels = [];
    data = [];
    
    posts.forEach(({data: {title, score}}) => {
        labels.push(title);
        data.push(score);
    });
    return {labs: labels, dats: data};
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
    
    poll(() => new Promise(refreshChart(myChart)), 1000);
};


const refreshChart = async (chart) => {
    console.log("--REFRESHING DATA--");
    const posts = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json`);
    const responseJSON = await posts.json();
    var tableData = formatPosts(responseJSON);
    addData(chart, tableData.labs, tableData.dats);
}

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

var sleep = time => new Promise(resolve => setTimeout(resolve, time))

var poll = (promiseFn, time) => promiseFn().then(
             sleep(time).then(() => poll(promiseFn, time)))

startPosts();