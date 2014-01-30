var MailParser = require('./lib/mailparser').MailParser;
var fs = require('fs');

var parser = new MailParser({streamAttachments: true});

parser.on('attachment', function (attachment) {
    var ws = fs.createWriteStream(attachment.generatedFileName);
    attachment.stream.pipe(ws);
});

parser.on('end', function (meta) {
    console.log(meta);
});

var rs = fs.createReadStream('bob');
var ws = fs.createWriteStream('nothing');

rs.pipe(parser).pipe(ws);

