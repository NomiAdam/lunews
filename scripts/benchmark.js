// eslint-disable-next-line import/no-extraneous-dependencies
const apiBenchmark = require('api-benchmark');

const service = {
    server1: 'http://192.168.88.235:3333',
};

const routes = { route1: '/api/v1/articles?group=hkfree.test&page=1&step=10' };

apiBenchmark.measure(service, routes, { runMode: 'parallel', debug: true, minSamples: 5 }, (err, results) => {
    console.log(results);
});
