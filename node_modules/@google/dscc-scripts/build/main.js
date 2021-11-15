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
const parser = require("./args");
const args_1 = require("./args");
const connector_1 = require("./connector");
const util_1 = require("./util");
const viz_1 = require("./viz");
exports.main = async () => {
    const args = parser.getParser().parseArgs();
    const scriptChoice = args.scriptChoice;
    switch (scriptChoice) {
        case args_1.ScriptChoice.CONNECTOR:
            return connector_1.main(args);
        case args_1.ScriptChoice.VIZ:
            return viz_1.main(args);
        default:
            return util_1.assertNever(scriptChoice);
    }
};
