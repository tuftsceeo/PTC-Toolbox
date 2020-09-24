const {plot, Plot} = require('nodeplotlib');
const data: Plot[] = [{x: [1,3,4,5], y:[3,12,1,4], type: 'line'}];
plot(data);