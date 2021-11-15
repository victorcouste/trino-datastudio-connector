"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const execa = require("execa");
const fs = require("mz/fs");
const open = require("open");
const path = require("path");
const terminal_link_1 = require("terminal-link");
const args_1 = require("./args");
const util_1 = require("./util");
const openDeployment = async (deploymentId, deploymentName) => {
    const deploymentUrl = `https://datastudio.google.com/datasources/create?connectorId=${deploymentId}`;
    const formattedUrl = util_1.format.green(terminal_link_1.default(`${deploymentName} deployment`, deploymentUrl));
    console.log(`Opening: ${formattedUrl}`);
    await open(deploymentUrl);
};
const tryProduction = async () => {
    const prodDeploymentId = process.env.npm_package_dsccConnector_production;
    if (prodDeploymentId === undefined) {
        throw util_1.invalidConnectorConfig('production');
    }
    return openDeployment(prodDeploymentId, 'Production');
};
const tryLatest = async () => {
    const latestDeploymentId = process.env.npm_package_dsccConnector_latest;
    if (latestDeploymentId === undefined) {
        throw util_1.invalidConnectorConfig('latest');
    }
    return openDeployment(latestDeploymentId, 'latest');
};
const updateProduction = async () => {
    const prodDeploymentId = process.env.npm_package_dsccConnector_production;
    if (prodDeploymentId === undefined) {
        throw util_1.invalidConnectorConfig('production');
    }
    await execa('npx', [
        '@google/clasp',
        'deploy',
        '--deploymentId',
        prodDeploymentId,
        '--description',
        'Production',
    ], util_1.pipeStdIO);
};
const pushChanges = async (args) => {
    const baseCommand = ['@google/clasp', 'push'];
    const command = args.forcePushChanges
        ? baseCommand.concat(['--force'])
        : baseCommand;
    await execa('npx', command, util_1.pipeStdIO);
};
const watchChanges = async () => {
    await execa('npx', ['@google/clasp', 'push', '--watch'], util_1.pipeStdIO);
};
const openScript = async () => {
    await execa('npx', ['@google/clasp', 'open'], util_1.pipeStdIO);
};
exports.getAppsScriptManifest = async () => {
    const pwd = process.cwd();
    const manifestPath = path.resolve(pwd, 'src', 'appsscript.json');
    const manifestExists = await fs.exists(manifestPath);
    if (!manifestExists) {
        throw missingAppsScriptManifest();
    }
    const manifestJSON = await fs.readFile(manifestPath, 'utf-8');
    try {
        return JSON.parse(manifestJSON);
    }
    catch (e) {
        console.log(e.message);
        const localManifestPath = util_1.format.green('./src/appsscript.json');
        throw new Error(`${localManifestPath} is not valid JSON.`);
    }
};
const missingAppsScriptManifest = () => {
    const appsScriptManifest = util_1.format.blue.bold('./src/appsscript.json');
    return new Error(`${appsScriptManifest} must exist.`);
};
const invalidAppsScriptManifest = (propertyPath) => {
    const colorizedPath = util_1.format.green(propertyPath.join('.'));
    const appsScriptManifest = util_1.format.blue.bold('./src/appsscript.json');
    const manifest = {
        dataStudio: {
            name: 'filter-pushdown',
            logoUrl: 'logoUrl',
            company: 'manifestCompany',
            companyUrl: 'companyUrl',
            addonUrl: 'addonUrl',
            supportUrl: 'supportUrl',
            description: 'description',
            sources: [''],
            templates: {
                default: 'report-id',
            },
        },
    };
    let manifestString = JSON.stringify(manifest, undefined, '  ');
    manifestString = propertyPath.reduce((acc, property) => {
        return acc.replace(property, util_1.format.green(property));
    }, manifestString);
    return new Error(`${appsScriptManifest} must have a ${colorizedPath} entry:\n${manifestString}`);
};
const openTemplate = async () => {
    const manifest = await exports.getAppsScriptManifest();
    const templatePath = ['dataStudio', 'templates', 'default'];
    const templateId = templatePath.reduce((acc, property) => {
        return acc === undefined ? undefined : acc[property];
    }, manifest);
    if (templateId === undefined) {
        throw invalidAppsScriptManifest(templatePath);
    }
    const templateUrl = `https://datastudio.google.com/c/reporting/${templateId}`;
    const formattedUrl = util_1.format.green(terminal_link_1.default(`open template`, templateUrl));
    console.log(`Opening: ${formattedUrl}`);
    await open(templateUrl);
};
exports.main = async (args) => {
    switch (args.script) {
        case args_1.ConnectorScripts.TRY_PRODUCTION:
            return tryProduction();
        case args_1.ConnectorScripts.TRY_LATEST:
            return tryLatest();
        case args_1.ConnectorScripts.UPDATE_PRODUCTION:
            return updateProduction();
        case args_1.ConnectorScripts.PUSH_CHANGES:
            return pushChanges(args);
        case args_1.ConnectorScripts.WATCH_CHANGES:
            return watchChanges();
        case args_1.ConnectorScripts.OPEN_SCRIPT:
            return openScript();
        case args_1.ConnectorScripts.OPEN_TEMPLATE:
            return openTemplate();
        default:
            return util_1.assertNever(args.script);
    }
};
