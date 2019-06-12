const os   = require('os');   // nodejs.org/api/os.html
const http = require('http'); // nodejs.org/api/http.html
const fs   = require('fs');   // nodejs.org/api/fs.html

function nodeinfo(req) {
    var template;

    const context = {};

    // useful functions from 'os'
    const osFunctions = [ 'cpus', 'freemem', 'hostname', 'loadavg', 'platform', 'release', 'totalmem', 'type', 'uptime' ];
    context.os = {}; // results of executing os functions
    for (const fn of osFunctions) { context.os[fn] = os[fn](); }
    // and some formatting
    context.os.uptime = context.os.uptime*1000, { units: [ 'd', 'h', 'm' ], round: true };
    context.os.loadavg.forEach(function(l, i, loadavg) { loadavg[i] = l.toFixed(2); });
    context.os.loadavg = context.os.loadavg.join(' ');
    context.os.freemempercent = Math.round(context.os.freemem/context.os.totalmem*100);
    context.os.totalmem = context.os.totalmem;
    context.os.freemem = context.os.freemem;
    // bit of magic to generate nice presentation for CPUs info
    const cpus = { model: {}, speed: {} };
    for (let c=0; c<os.cpus().length; c++) {
        cpus.model[os.cpus()[c].model] = (cpus.model[os.cpus()[c].model] || 0) + 1;
        cpus.speed[os.cpus()[c].speed] = (cpus.speed[os.cpus()[c].speed] || 0) + 1;
    }
    context.os.cpus = { model: [], speed: [] };
    for (const p in cpus.model) context.os.cpus.model.push(cpus.model[p]+' × '+p);
    for (const p in cpus.speed) context.os.cpus.speed.push(cpus.speed[p]+' × '+p);
    context.os.cpus.model = context.os.cpus.model.join(', ');
    context.os.cpus.speed = context.os.cpus.speed.join(', ') + ' MHz';

    // everything from process (for process memory and Node versions)
    context.process = process;

    context.process.rss = process.memoryUsage().rss;
    context.process.heapTotal = process.memoryUsage().heapTotal;
    context.process.heapUsed = process.memoryUsage().heapUsed;

    context.intlTimezone = Intl.DateTimeFormat('en').resolvedOptions().timeZone;
    context.dateTzOffset = Date().match(/([A-Z]+[\+-][0-9]{4}.*)/)[1];

    if (req.headers) {
        const protocol = req.socket.encrypted || req.headers['x-forwarded-proto']=='https' ? 'https' : 'http';
        context.request = req;
        context.request.href = protocol + '://' + req.headers.host + req.url;
        // IP address: stackoverflow.com/questions/8107856
        context.request.ip = req.headers['x-forwarded-for']
            || req.connection.remoteAddress
            || req.socket.remoteAddress
            || req.connection.socket.remoteAddress;

	}

	template = `<!doctype html>
	<html>
	<head>
		<title>NodeInfo</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/10up-sanitize.css/4.1.0/sanitize.min.css">
		<style>
			main { color: #333333; font: 80% Verdana, Arial, Helvetica, sans-serif; line-height: 1.6; margin: 0.4em; }
			h1 { font-size: 1.6em; }
			h2 { margin: 1em 0; }
			h3 { margin: 0.4em 0; }
			table { background-color: #f4ede2; border: 1px solid #adadad; font-size: 1.1em; width: 100%; }
			td, th { padding: 0.2em 0.8em; vertical-align: top; border-top: 1px solid #adadad; border-bottom: 1px solid #adadad; }
			table table { border: none; }
			table table td { padding: 0 0.4em 0 0; border: none; font-size: 125%; }
		</style>
	</head>
	<body>
	<main>
	<h1>Node.js ${context.process.version}</h1>
		<table>
			<tr><td colspan="2"><h2>Package</h2></td></tr>

			<tr><td colspan="2"><h2>OS</h2></td></tr>
			<tr><td>hostname</td><td>${context.os.hostname}</td></tr>
			<tr><td>type</td><td>${context.os.type}</td></tr>
			<tr><td>platform</td><td>${context.os.platform}</td></tr>
			<tr><td>release</td><td>${context.os.release}</td></tr>
			<tr><td>cpu models</td><td>${context.os.cpus.model}</td></tr>
			<tr><td>cpu speeds</td><td>${context.os.cpus.speed}</td></tr>
			<tr><td>uptime</td><td>${context.os.uptime}</td></tr>
			<tr><td>load avg</td><td>${context.os.loadavg}</td></tr>
			<tr><td>total memory</td><td>${context.os.totalmem}</td></tr>
			<tr><td>free memory</td><td>${context.os.freemem} (${context.os.freemempercent}%)</td></tr>
			<tr><td colspan="2"><h3>process</h3></td></tr>
			<tr><td>resident set size</td><td>${context.process.rss}</td></tr>
			<tr><td>v8 heap total</td><td>${context.process.heapTotal}</td></tr>
			<tr><td>v8 heap used</td><td>${context.process.heapUsed}</td></tr>
			<tr><td colspan="2"><h3>timezone</h3></td></tr>
			<tr><td>timezone</td><td>${context.intlTimezone}</td></tr>
			<tr><td>offset</td><td>${context.dateTzOffset}</td></tr>
			<tr><td colspan="2"><h2>Node versions : ${context.process.version.replace(/v/, "")}</h2></td></tr>
        		<tr><td colspan="2">&nbsp;</td></tr>
        		<!--<tr><td>NODE_ENV</td><td>{process.env.NODE_ENV}</td></tr>-->
			<tr><td colspan="2"><h2>Request</h2></td></tr>
			<tr><td>method</td><td>${context.request.method}</td></tr>
			<tr><td>href</td><td>${context.request.href}</td></tr>
			<tr><td>ip</td><td>${context.request.ip}</td></tr>
			<tr><td colspan="2"><h3>headers</h3></td></tr>
			<tr><td>original url</td><td>${context.request.originalUrl}</td></tr>
			<tr><td>cookies</td><td>
			</td></tr>
			<tr><td colspan="2"><h2>No request object supplied</h2></td></tr>

		</table>
	</main>
	</body>
	</html>
	`;
	return template;
}

var server = http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'html' });
	var template = nodeinfo(req);
	res.write(template);
	res.end();
});
server.listen('8100');
console.log('server running on port 8100');