#!/usr/bin/env node

/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const parseArgs = rawArgs => {
    const args = {};

    for (let i = 0; i < rawArgs.length; i += 1) {
        const token = rawArgs[i];
        if (!token.startsWith('--')) continue;

        const key = token.slice(2);
        const value = rawArgs[i + 1];
        if (value == null || value.startsWith('--')) {
            args[key] = 'true';
        } else {
            args[key] = value;
            i += 1;
        }
    }

    return args;
};

const parseGithubRepo = repositoryUrl => {
    const match = repositoryUrl.match(
        /github\.com[:/](?<owner>[^/]+)\/(?<repo>[^/.]+)(?:\.git)?$/,
    );

    if (!match?.groups?.owner || !match?.groups?.repo) {
        throw new Error(
            `Unable to parse owner/repo from repository URL: ${repositoryUrl}`,
        );
    }

    return match.groups;
};

const sha1OfFile = filePath =>
    crypto
        .createHash('sha1')
        .update(fs.readFileSync(filePath))
        .digest('hex');

const args = parseArgs(process.argv.slice(2));
const packageJsonPath = path.resolve('package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const repositoryUrl =
    typeof packageJson.repository === 'string'
        ? packageJson.repository
        : packageJson.repository?.url;

if (!repositoryUrl) {
    throw new Error('package.json must include `repository.url`.');
}

const parsedRepo = parseGithubRepo(repositoryUrl);
const owner = args.owner ?? parsedRepo.owner;
const repo = args.repo ?? parsedRepo.repo;
const branch = args.branch ?? 'main';
const appName = packageJson.name;
const version = packageJson.version;
const tag = args.tag ?? `v${version}`;
const tarballName = args.tarball ?? `${appName}-${version}.tgz`;
const tarballPath = path.resolve(tarballName);
const outDir = path.resolve(args.outDir ?? 'release');
const appInfoFileName = `${appName}.json`;

if (!fs.existsSync(tarballPath)) {
    throw new Error(
        `Tarball not found: ${tarballPath}. Run \`npm pack\` first or pass --tarball.`,
    );
}

const shasum = sha1OfFile(tarballPath);
const githubBase = `https://github.com/${owner}/${repo}`;
const rawBase = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}`;

const appInfo = {
    name: appName,
    displayName: packageJson.displayName ?? appName,
    description: packageJson.description ?? appName,
    homepage: packageJson.homepage ?? githubBase,
    iconUrl: `${rawBase}/resources/icon.svg`,
    releaseNotesUrl: `${rawBase}/Changelog.md`,
    latestVersion: version,
    versions: {
        [version]: {
            tarballUrl: `${githubBase}/releases/download/${tag}/${tarballName}`,
            publishTimestamp: new Date().toISOString(),
            shasum,
        },
    },
};

const sourceJson = {
    name: 'official',
    description: `GNSS app source for ${owner}`,
    apps: [`${githubBase}/releases/latest/download/${appInfoFileName}`],
};

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
    path.join(outDir, appInfoFileName),
    JSON.stringify(appInfo, null, 2),
);
fs.writeFileSync(path.join(outDir, 'source.json'), JSON.stringify(sourceJson, null, 2));

console.log(`Generated ${path.join(outDir, appInfoFileName)}`);
console.log(`Generated ${path.join(outDir, 'source.json')}`);
console.log(`Expected source URL for launcher: ${githubBase}/releases/latest/download/source.json`);
