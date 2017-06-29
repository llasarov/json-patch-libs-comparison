var clone = require('clone');

var jsonpatch = require('fast-json-patch');
var jiff = require('jiff');
var ooPatch = require('json8-patch');
var jsondiffpatch = require('jsondiffpatch');
var patcher = require('patcher');


module.exports = {
    addTogether: function(x,y){
        return x + y
    },
    doSomethingWithObject: function(object){
        object.newKey = "easy AF";
        return object;
    },
    simpleValue: 'also works',



    foo: function() {

        var a = {
            firstName: "Albert",
            lastName: "Einstein" ,

            children: [
                { firstName: 'Child 1', lastName: 'Child 1 Last Name', prop3: { inprop: 'abc 1' } },
                { firstName: 'Child 2', lastName: 'Child 2 Last Name', prop3: { inprop: 'abc 2' } },
                { firstName: 'Child 3', lastName: 'Child 3 Last Name', prop3: { inprop: 'abc 3' } },
            ]
        };
        var b = clone(a);

        // Modify own props
        b.firstName = 'James'; b.lastName = 'Bond';
        // Modify prop in deeply nested child
        b.children[0].prop3.inprop = 'abc X';
        // Replace last child
        b.children.splice(2, 1, { firstName: 'Child 4', lastName: 'Child 4 Last Name', prop3: { inprop: 'abc 4' } });


        var diff = jsonpatch.compare(a, b);
        // var diff = jiff.diff(a, b);  // unnoetig viele 'test' operationen
        // var diff = ooPatch.diff(a, b);  // Ersetzt ganzes Array durch neues!!!
        // var diff = jsondiffpatch.diff(a, b);  // buggy!!!!
        // var diff = patcher.computePatch(a, b);

        // return JSON.stringify(diff);
        return diff;
    }
};

require('make-runnable');
