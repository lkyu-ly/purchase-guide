const fs = require('fs');
const download = require('download');

const CommonURLPart = 'refs/heads/master/MAS/All-In-One-Version-KL/MAS_AIO.cmd';

let url =
	'https://raw.githubusercontent.com/massgravel/Microsoft-Activation-Scripts/' + CommonURLPart;
(async () => {
	let data = await download(url);
	await fs.promises.writeFile('docs/public/mas.cmd', data);
})();
