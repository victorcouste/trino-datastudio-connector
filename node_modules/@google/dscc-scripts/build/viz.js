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
const args_1 = require("./args");
const util_1 = require("./util");
const build_1 = require("./viz/build");
const message_1 = require("./viz/message");
const util = require("./viz/util");
const start = async () => {
    await execa('webpack-dev-server', ['--open'], util_1.pipeStdIO);
};
const deploy = async (args) => {
    const buildValues = util.validateBuildValues(args);
    await execa('gsutil', ['cp', '-a', 'public-read', 'build/*', buildValues.gcsBucket], util_1.pipeStdIO);
    console.log(`Viz deployed to: ${buildValues.gcsBucket}`);
};
const validate = async (args) => {
    if (!args.configPath && !args.manifestPath) {
        throw new Error('At least one of --configPath or --manifestPath is required');
    }
    if (args.configPath) {
        util.validateConfigFile(args.configPath);
        console.log(`File: ${args.configPath} is a valid config.`);
    }
    if (args.manifestPath) {
        util.validateManifestFile(args.manifestPath);
        console.log(`File: ${args.manifestPath} is a valid manifest.`);
    }
};
exports.main = async (args) => {
    switch (args.script) {
        case args_1.VizScripts.START:
            return start();
        case args_1.VizScripts.BUILD:
            return build_1.build(args);
        case args_1.VizScripts.PUSH:
            return deploy(args);
        case args_1.VizScripts.UPDATE_MESSAGE: {
            await message_1.buildMessage(args);
            return deploy(args);
        }
        case args_1.VizScripts.VALIDATE:
            return validate(args);
        default:
            return util_1.assertNever(args.script);
    }
};
