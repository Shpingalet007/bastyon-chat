const fs = require('fs');

const packageData = require('./package.json');

async function changePrefix(requiredPrefix) {
    if (requiredPrefix === 'reset') {
        requiredPrefix = '';
    }

    const versionRegex = /^(?<version>\d+\.\d+\.\d+)-?(?<prefixType>[a-z]+)?-?(?<prefixNum>\d+)?/;

    let { version, prefixType, prefixNum } = packageData.version.match(versionRegex).groups;

    prefixNum = Number.parseFloat(prefixNum) || 1;

    let prefix = '';

    if (requiredPrefix && prefixType !== requiredPrefix) {
        prefix += `-${requiredPrefix}-1`;
    } else if (prefixType === requiredPrefix) {
        prefix += `-${requiredPrefix}-${prefixNum + 1}`;
    }

    packageData.version = `${version}${prefix}`;

    const packageString = JSON.stringify(packageData, null, '\t');

    fs.writeFileSync('./package.json', packageString);
}

const requiredPrefixType = process.argv[2]?.slice(2);

changePrefix(requiredPrefixType);
