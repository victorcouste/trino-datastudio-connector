
// https://developers.google.com/datastudio/connector/reference#isadminuser
/**
 * This checks whether the current user is an admin user of the connector.
 *
 * @returns {boolean} Returns true if the current authenticated user at the time
 * of function execution is an admin user of the connector. If the function is
 * omitted or if it returns false, then the current user will not be considered
 * an admin user of the connector.
 */
function isAdminUser() {
  return true;
}

function logObject(object) { cc.newDebugError() .setText(JSON.stringify(object)) .throwException(); }


// https://developers.google.com/datastudio/connector/reference#getconfig
/**
 * Returns the user configurable options for the connector.
 *
 * @param {Object} request Config request parameters.
 * @returns {Object} Connector configuration to be displayed to the user.
 */
function getConfig(request) {
  var config = cc.getConfig();

  config.newInfo()
  .setId('instructions')
  .setText('Enter Trino server URL, user/password (let password empty if no auth), catalog, schema and table (or view) you want to query');

config.newTextInput()
  .setId('trino_url')
  .setName('Trino Server URL')
  .setHelpText('Enter your Trino server URL (http or https) e.g. http://my_trino_server:8080 or https://my_trino_server')
  .setPlaceholder('http://localhost:8080');

  config.newTextInput()
  .setId('trino_user')
  .setName('Trino User')
  .setHelpText('Enter your Trino user')
  .setPlaceholder('user name');

  config.newTextInput()
  .setId('trino_password')
  .setName('Trino Password')
  .setHelpText('Enter your Trino user password. Let empty if no password required')
  .setPlaceholder('xxxxx');

  config.newTextInput()
  .setId('trino_catalog')
  .setName('Trino Catalog')
  .setHelpText('Enter your Trino Catalog name')
  .setPlaceholder('tpch');

  config.newTextInput()
  .setId('trino_schema')
  .setName('Trino Schema')
  .setHelpText('Enter your Trino Schema name')
  .setPlaceholder('tiny');

  config.newTextInput()
  .setId('trino_object')
  .setName('Trino Table or View')
  .setHelpText('Enter your Trino table or view name you want to query')
  .setPlaceholder('nation');

  config.newTextInput()
  .setId('rowLimit')
  .setName('Row Limit')
  .setHelpText('Maximum number of rows to fetch in each query. Default is 1000. If set to -1, all rows will be fetched.')
  .setPlaceholder('1000');

  return config.build();
}

/**
 * Throws User-facing errors.
 *
 * @param  {string} message Error message.
 */
 function throwUserError(message) {
  DataStudioApp.createCommunityConnector()
    .newUserError()
    .setText(message)
    .throwException();
}

/**
 * Validate config object and throw error if anything wrong.
 *
 * @param  {Object} configParams Config object supplied by user.
 */
 function validateConfig(configParams) {
  configParams = configParams || {};
  if (!configParams.trino_url) {
    throwUserError('Trino Server URL is empty.');
  }
  if (!configParams.trino_user) {
    throwUserError('Trino user is empty.');
  }
  if (!configParams.trino_catalog) {
    throwUserError('Trino Catalog is empty.');
  }
  if (!configParams.trino_catalog) {
    throwUserError('Trino Schema is empty.');
  }
  if (!configParams.trino_object) {
    throwUserError('Trino Table or View is empty.');
  }
  if (configParams.rowLimit) {
    var rowLimit = parseInt(configParams.rowLimit);
    if (isNaN(rowLimit)) {
      throwUserError('Invalid Row Limit.');
    }
  }
}

// https://developers.google.com/datastudio/connector/reference#getschema
/**
 * Returns the schema for the given request.
 *
 * @param {Object} request Schema request parameters.
 * @returns {Object} Schema for the given request.
 */
 function getSchema(request) {
  validateConfig(request.configParams);
  try {
    var fields = getFieldsFromTrino(request).build();
    return {schema: fields};
  } catch (err) {
    throwUserError(err.message);
  }
}


// https://developers.google.com/datastudio/connector/reference#getdata
/**
 * Returns the tabular data for the given request.
 *
 * @param {Object} request Data request parameters.
 * @returns {Object} Contains the schema and data for the given request.
 */
 function getData(request) {
  validateConfig(request.configParams);
  try {
    var data = getDataFromTrino(request);
    return data;
  } catch (err) {
    throwUserError(err.message);
  }
}
