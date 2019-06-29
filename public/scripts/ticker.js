const subreddit = "livestreamfail";
const numberOfPosts = 10;
var chartCreated = false;


const fetchPosts = async () => {
    const posts = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json`);
    const responseJSON = await posts.json();
    console.log(responseJSON);
    return formatPosts(responseJSON);
}

const formatPosts = (responseJSON) => {
    posts = responseJSON.data.children;
    labels = [];
    data = [];
    
    posts.forEach(({data: {title, score}}) => {
        labels.push(title);
        data.push(score);
    });
    //Debugging
    console.log("Format data");
    //Debugging
    if(chartCreated){
        return {lab: labels, dat: data};
    }else{
        createChart(labels, data);
    };
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
    chartCreated = true;
    poll(() => new Promise(refresh(myChart)), 1000);
};

const refresh = (chart) => {
    console.log("REFRESHED DATA");
    var tableData = fetchPosts();
    addData(chart, tableData.lab, tableData.dat)
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

fetchPosts();