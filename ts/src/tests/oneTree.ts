import RAxMLTask = require("../index");
import jmClient = require("ms-jobmanager");

import streams = require('stream');

import fs = require("fs");
import util =require("util");


let myOptions = {
	'logLevel': 'debug',
    //'modules' : ['ncbi-blast/2.2.26','blastXMLtoJSON'],
    'exportVar' : { /*'dbPath' : 'nr70',
                    'eValue' : '0.1',
                    'nbIter' : '1',
                    'maxSeq' : '50'*/}
};


let jobManager = jmClient.start({"TCPip": "localhost", "port": "2899"});

jobManager.on("ready", () => {
    let a = new RAxMLTask.RAxMLTask({ "jobManager" : jmClient, "jobProfile" : "default" }, myOptions);
    a.on("processed", (a)=>{
        console.log(`OOOOO\n${util.inspect(a, {showHidden: false, depth: null})}`);
        
    });
    //a.pipe(process.stdout)
    fs.readFile("../data/gene16.aln", function (err, data) {
        if (err) throw err;
       // console.log(data.toString());
        let container = {"inputF" : data.toString()};
        let fastaStream = new streams.Readable();
        fastaStream.push( JSON.stringify(container));
        fastaStream.push(null);
        fastaStream.pipe(a.inputF);
    });
});
