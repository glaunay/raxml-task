"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RAxMLTask = require("../index");
const jmClient = require("ms-jobmanager");
const streams = require("stream");
const fs = require("fs");
const util = require("util");
let myOptions = {
    'logLevel': 'debug',
    //'modules' : ['ncbi-blast/2.2.26','blastXMLtoJSON'],
    'exportVar': {}
};
let jobManager = jmClient.start({ "TCPip": "localhost", "port": "2899" });
jobManager.on("ready", () => {
    let a = new RAxMLTask.RAxMLTask({ "jobManager": jmClient, "jobProfile": "default" }, myOptions);
    a.on("processed", (a) => {
        console.log(`OOOOO\n${util.inspect(a, { showHidden: false, depth: null })}`);
    });
    //a.pipe(process.stdout)
    fs.readFile("../data/gene16.aln", function (err, data) {
        if (err)
            throw err;
        // console.log(data.toString());
        let container = { "inputF": data.toString() };
        let fastaStream = new streams.Readable();
        fastaStream.push(JSON.stringify(container));
        fastaStream.push(null);
        fastaStream.pipe(a.inputF);
    });
});
