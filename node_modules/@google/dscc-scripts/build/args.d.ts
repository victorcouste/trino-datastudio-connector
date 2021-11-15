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
import * as argparse from 'argparse';
export declare enum ScriptChoice {
    CONNECTOR = "connector",
    VIZ = "viz"
}
export declare enum ConnectorScripts {
    PUSH_CHANGES = "push_changes",
    WATCH_CHANGES = "watch_changes",
    OPEN_SCRIPT = "open_script",
    TRY_PRODUCTION = "try_production",
    TRY_LATEST = "try_latest",
    UPDATE_PRODUCTION = "update_production",
    OPEN_TEMPLATE = "open_template"
}
export interface ConnectorArgs {
    script: ConnectorScripts;
    forcePushChanges?: true;
}
export declare enum VizScripts {
    START = "start",
    BUILD = "build",
    PUSH = "push",
    UPDATE_MESSAGE = "update_message",
    VALIDATE = "validate"
}
export declare enum MessageFormat {
    OBJECT = "object",
    TABLE = "table"
}
export declare enum DeploymentChoices {
    PROD = "prod",
    DEV = "dev"
}
export interface VizArgs {
    script: VizScripts;
    deployment?: DeploymentChoices;
    format?: MessageFormat;
    configPath?: string;
    manifestPath?: string;
}
export declare const getParser: () => argparse.ArgumentParser;
