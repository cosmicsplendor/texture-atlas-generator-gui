var margin = 1;   
var padding = 1;  
var isMulti = false; 
var rects = [ { id: '10682046', width: '232', height: '44' },
    { id: '13882862', width: '72', height: '36' },
    { id: '14922707', width: '75', height: '168' },
    { id: '12124153', width: '105', height: '128' },
    { id: '13484486', width: '162', height: '188' },
    { id: '13541554', width: '207', height: '207' },
    { id: '16036037', width: '12', height: '202' },
    { id: '13482376', width: '123', height: '90' } ]
 
 
var MaxRects = require("max-rects-bin-pack").MaxRects;
 
var mr = new MaxRects(margin, padding, isMulti)
 

mr.calc(rects, function(err, results) {
    console.log(results)
});