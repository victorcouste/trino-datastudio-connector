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
export declare const manifestSchema: {
    type: string;
    additionalProperties: boolean;
    required: string[];
    properties: {
        name: {
            type: string;
        };
        organization: {
            type: string;
        };
        description: {
            type: string;
        };
        logoUrl: {
            type: string;
        };
        organizationUrl: {
            type: string;
        };
        supportUrl: {
            type: string;
        };
        privacyPolicyUrl: {
            type: string;
        };
        termsOfServiceUrl: {
            type: string;
        };
        packageUrl: {
            type: string;
        };
        devMode: {
            type: string[];
        };
        components: {
            type: string;
            minItems: number;
            items: {
                $ref: string;
            };
        };
    };
    definitions: {
        component: {
            type: string;
            additionalProperties: boolean;
            required: string[];
            properties: {
                id: {
                    type: string;
                };
                name: {
                    type: string;
                };
                description: {
                    type: string;
                };
                iconUrl: {
                    type: string;
                };
                resource: {
                    $ref: string;
                };
            };
        };
        resources: {
            type: string;
            additionalProperties: boolean;
            required: string[];
            properties: {
                js: {
                    type: string;
                };
                config: {
                    type: string;
                };
                css: {
                    type: string;
                };
            };
        };
    };
};
export declare const configSchema: {
    type: string;
    additionalProperties: boolean;
    properties: {
        data: {
            type: string;
            items: {
                $ref: string;
            };
        };
        style: {
            type: string;
            items: {
                $ref: string;
            };
        };
        interactions: {
            type: string;
            maxItems: number;
            items: {
                $ref: string;
            };
        };
    };
    definitions: {
        dataSection: {
            type: string;
            additionalProperties: boolean;
            required: string[];
            properties: {
                id: {
                    type: string;
                };
                label: {
                    type: string;
                };
                elements: {
                    type: string;
                    items: {
                        anyOf: {
                            $ref: string;
                        }[];
                    };
                };
            };
        };
        metricElement: {
            type: string;
            additionalProperties: boolean;
            required: string[];
            properties: {
                id: {
                    type: string;
                };
                label: {
                    type: string;
                };
                type: {
                    type: string;
                    enum: string[];
                };
                options: {
                    $ref: string;
                };
            };
        };
        dimensionElement: {
            type: string;
            additionalProperties: boolean;
            required: string[];
            properties: {
                id: {
                    type: string;
                };
                label: {
                    type: string;
                };
                type: {
                    type: string;
                    enum: string[];
                };
                options: {
                    $ref: string;
                };
            };
        };
        maxResultsElement: {
            type: string;
            additionalProperties: boolean;
            required: string[];
            properties: {
                id: {
                    type: string;
                };
                label: {
                    type: string;
                };
                type: {
                    type: string;
                    enum: string[];
                };
                options: {
                    $ref: string;
                };
            };
        };
        dataOptions: {
            type: string;
            additionalProperties: boolean;
            properties: {
                min: {
                    type: string;
                };
                max: {
                    type: string;
                };
            };
        };
        dimensionOptions: {
            type: string;
            additionalProperties: boolean;
            properties: {
                min: {
                    type: string;
                };
                max: {
                    type: string;
                };
                supportedTypes: {
                    type: string;
                    items: {
                        type: string;
                        enum: string[];
                    };
                };
            };
        };
        maxResultsOptions: {
            type: string;
            required: string[];
            additionalProperties: boolean;
            properties: {
                max: {
                    type: string;
                };
            };
        };
        styleSection: {
            type: string;
            required: string[];
            additionalProperties: boolean;
            properties: {
                id: {
                    type: string;
                };
                label: {
                    type: string;
                };
                elements: {
                    type: string;
                    items: {
                        anyOf: {
                            $ref: string;
                        }[];
                    };
                };
            };
        };
        fontSize: {
            type: string;
            additionalProperties: boolean;
            required: string[];
            properties: {
                id: {
                    type: string;
                };
                label: {
                    type: string;
                };
                type: {
                    type: string;
                    enum: string[];
                };
                defaultValue: {
                    type: string;
                };
            };
        };
        fontFamily: {
            type: string;
            additionalProperties: boolean;
            required: string[];
            properties: {
                id: {
                    type: string;
                };
                label: {
                    type: string;
                };
                type: {
                    type: string;
                    enum: string[];
                };
                defaultValue: {
                    type: string;
                };
            };
        };
        checkbox: {
            type: string;
            additionalProperties: boolean;
            required: string[];
            properties: {
                id: {
                    type: string;
                };
                label: {
                    type: string;
                };
                type: {
                    type: string;
                    enum: string[];
                };
                defaultValue: {
                    type: string;
                };
            };
        };
        textInput: {
            type: string;
            additionalProperties: boolean;
            required: string[];
            properties: {
                id: {
                    type: string;
                };
                label: {
                    type: string;
                };
                type: {
                    type: string;
                    enum: string[];
                };
                defaultValue: {
                    type: string;
                };
            };
        };
        textArea: {
            type: string;
            additionalProperties: boolean;
            required: string[];
            properties: {
                id: {
                    type: string;
                };
                label: {
                    type: string;
                };
                type: {
                    type: string;
                    enum: string[];
                };
                defaultValue: {
                    type: string;
                };
            };
        };
        opacity: {
            type: string;
            additionalProperties: boolean;
            required: string[];
            properties: {
                id: {
                    type: string;
                };
                label: {
                    type: string;
                };
                type: {
                    type: string;
                    enum: string[];
                };
                defaultValue: {
                    type: string;
                };
            };
        };
        lineWeight: {
            type: string;
            additionalProperties: boolean;
            required: string[];
            properties: {
                id: {
                    type: string;
                };
                label: {
                    type: string;
                };
                type: {
                    type: string;
                    enum: string[];
                };
                defaultValue: {
                    type: string;
                };
            };
        };
        lineStyle: {
            type: string;
            additionalProperties: boolean;
            required: string[];
            properties: {
                id: {
                    type: string;
                };
                label: {
                    type: string;
                };
                type: {
                    type: string;
                    enum: string[];
                };
                defaultValue: {
                    type: string;
                };
            };
        };
        borderRadius: {
            type: string;
            additionalProperties: boolean;
            required: string[];
            properties: {
                id: {
                    type: string;
                };
                label: {
                    type: string;
                };
                type: {
                    type: string;
                    enum: string[];
                };
                defaultValue: {
                    type: string;
                };
            };
        };
        interval: {
            type: string;
            additionalProperties: boolean;
            required: string[];
            properties: {
                id: {
                    type: string;
                };
                label: {
                    type: string;
                };
                type: {
                    type: string;
                    enum: string[];
                };
                defaultValue: {
                    type: string;
                };
            };
        };
        fontColor: {
            type: string;
            additionalProperties: boolean;
            required: string[];
            properties: {
                id: {
                    type: string;
                };
                label: {
                    type: string;
                };
                type: {
                    type: string;
                    enum: string[];
                };
                defaultValue: {
                    type: string;
                    additionalProperties: boolean;
                    required: string[];
                    properties: {
                        color: {
                            type: string;
                        };
                        opacity: {
                            type: string[];
                        };
                    };
                };
            };
        };
        fillColor: {
            type: string;
            additionalProperties: boolean;
            required: string[];
            properties: {
                id: {
                    type: string;
                };
                label: {
                    type: string;
                };
                type: {
                    type: string;
                    enum: string[];
                };
                defaultValue: {
                    type: string;
                    additionalProperties: boolean;
                    required: string[];
                    properties: {
                        color: {
                            type: string;
                        };
                        opacity: {
                            type: string[];
                        };
                    };
                };
            };
        };
        borderColor: {
            type: string;
            additionalProperties: boolean;
            required: string[];
            properties: {
                id: {
                    type: string;
                };
                label: {
                    type: string;
                };
                type: {
                    type: string;
                    enum: string[];
                };
                defaultValue: {
                    type: string;
                    additionalProperties: boolean;
                    required: string[];
                    properties: {
                        color: {
                            type: string;
                        };
                        opacity: {
                            type: string[];
                        };
                    };
                };
            };
        };
        axisColor: {
            type: string;
            additionalProperties: boolean;
            required: string[];
            properties: {
                id: {
                    type: string;
                };
                label: {
                    type: string;
                };
                type: {
                    type: string;
                    enum: string[];
                };
                defaultValue: {
                    type: string;
                    additionalProperties: boolean;
                    required: string[];
                    properties: {
                        color: {
                            type: string;
                        };
                        opacity: {
                            type: string[];
                        };
                    };
                };
            };
        };
        gridColor: {
            type: string;
            additionalProperties: boolean;
            required: string[];
            properties: {
                id: {
                    type: string;
                };
                label: {
                    type: string;
                };
                type: {
                    type: string;
                    enum: string[];
                };
                defaultValue: {
                    type: string;
                    additionalProperties: boolean;
                    required: string[];
                    properties: {
                        color: {
                            type: string;
                        };
                        opacity: {
                            type: string[];
                        };
                    };
                };
            };
        };
        selectSingle: {
            type: string;
            additionalProperties: boolean;
            required: string[];
            properties: {
                id: {
                    type: string;
                };
                label: {
                    type: string;
                };
                type: {
                    type: string;
                    enum: string[];
                };
                options: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                defaultValue: {
                    type: string;
                };
            };
        };
        selectRadio: {
            type: string;
            additionalProperties: boolean;
            required: string[];
            properties: {
                id: {
                    type: string;
                };
                label: {
                    type: string;
                };
                type: {
                    type: string;
                    enum: string[];
                };
                options: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                defaultValue: {
                    type: string;
                };
            };
        };
        styleElementOptions: {
            type: string;
            required: string[];
            properties: {
                label: {
                    type: string;
                };
                value: {
                    type: string;
                };
            };
        };
        interactionElement: {
            type: string;
            additionalProperties: boolean;
            required: string[];
            properties: {
                id: {
                    type: string;
                };
                supportedActions: {
                    type: string;
                    items: {
                        type: string;
                        enum: string[];
                    };
                };
            };
        };
    };
};
