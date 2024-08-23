const fs = require('fs');
const download = require('download');

const CommonURLPart =
	'71e575e7b6aae844d6367cf27271863358a6bec4/MAS/All-In-One-Version/MAS_AIO-CRC32_E6A92062.cmd';

let url =
	'https://raw.githubusercontent.com/massgravel/Microsoft-Activation-Scripts/' + CommonURLPart;
(async () => {
	let data = await download(url);
	await fs.promises.writeFile('docs/public/mas.cmd', data);
})();
