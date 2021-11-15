/**
 * Generate Trino query string from the getData() request
 *
 * Rules:
 * 1. Fields specified in request.fields will be SELECT-ed
 * 3. If `rowLimit` is specified, it will be added in the LIMIT clause
 *
 * @param {Object} Data request parameters
 * @return {string} The generated query string
 */
function generateTrinoQuery(request) {
  const defaultRowLimit = 10000;
  var params = request.configParams || {};

  var rowLimit = parseInt(params.rowLimit || defaultRowLimit);
  var columns = request.fields.map(function(field) {
    return '"' + field.name + '"';
  });
  var object = params.trino_catalog+"."+params.trino_schema+"."+params.trino_object;

  var query = 'SELECT ' + columns.join(', ') + ' FROM ' + object;
  
  if (rowLimit !== -1) {
    query += ' LIMIT ' + rowLimit;
  }

  return query;
}

/**
 * Generate Headers for Trino REST API call.
 *
 * Rule: If password is empty, no Authorization
 *
 * @param {String} Trino user
 * @param {String} Trino password
 * @return {Object} The API Headers
 */
function generateTrinoAPIHeaders(user,password) {

  var headers;

  if (password=="") {
    headers = {"X-Trino-User":user}; 
  }
  else {
    // base64 encoding of trino_user:trino_password
    var credentials = "Basic "+ Utilities.base64Encode(user+':'+password)
    headers = {
      "X-Trino-User":user,
      "Authorization": credentials
      };
  }
  return headers;
}

/**
 * Get columns from Trino table or view
 *
 * @param  {string} Trino server API URL
 * @param  {Object} Trino API Headers
 * @param  {String} Trino Catalog
 * @param  {String} Trino Schema
 * @param  {String} Trino table or view
 * @return {Object} Trino Columns
 */
function getTrinoColumns(url,headers,catalog,schema,object) {

  var columns=[]
  const query="DESC "+catalog+"."+schema+"."+object;
  var url_api=url+'/v1/statement';
  
  const options_post = {
    'method' : 'post',
    'payload' : query,
    'validateHttpsCertificates': false,
    'headers': headers
  };
  const options_get = {
    'method' : 'get',
    'validateHttpsCertificates': false,
    'headers': headers
  };

  var response = UrlFetchApp.fetch(url_api, options_post);
  var response_json = response.getContentText();

  var nextUri = JSON.parse(response_json).nextUri
  var data = JSON.parse(response_json).data;
  if (data != null) columns=columns.concat(data);

  while (nextUri != null) {

    response = UrlFetchApp.fetch(nextUri, options_get);
    response_json = response.getContentText();
    nextUri = JSON.parse(response_json).nextUri
    data = JSON.parse(response_json).data;
    if (data != null) columns=columns.concat(data);

  }

  data = JSON.parse(response_json).data;
  if (data != null) columns=columns.concat(data);

  //Logger.log(columns);

  return columns;
}


/**
 * Get schema data from Trino and return Fields for Data Studio.
 *
 * @param  {Object} request Data/Schema request parameters.
 * @return {Object} Data Studio Fields object.
 */
function getFieldsFromTrino(request) {

  var fields = cc.getFields();
  var types = cc.FieldType;
  var params = request.configParams || {};

  var headers = generateTrinoAPIHeaders(params.trino_user,params.trino_password);

  var trino_columns = getTrinoColumns(
    params.trino_url,
    headers,
    params.trino_catalog,
    params.trino_schema,
    params.trino_object)

  // trino_columns = [[nationkey, bigint, , ], [name, varchar(25), , ], [regionkey, bigint, , ], [comment, varchar(152), , ]]

  trino_columns.forEach(function (column) {

    switch (column[1].substring(0,4)) {
    case "varc":
        field_type=types.TEXT;
        break;
    case "char":
        field_type=types.TEXT;
        break;
    case "doub":
        field_type=types.NUMBER;
        break;
    case "real":
          field_type=types.NUMBER;
          break;
    case "deci":
        field_type=types.NUMBER;
        break;
    case "bigi":
        field_type=types.NUMBER;
        break;
    case "int":
        field_type=types.NUMBER;
        break;
    case "tiny":
          field_type=types.NUMBER;
          break;
    case "bool":
          field_type=types.BOOLEAN;
          break;
    default:
        field_type=types.TEXT;
    }
    // TODO DATE 1998-01-01

    fields.newDimension()
      .setId(column[0])
      .setType(field_type);

    });

  return fields;
}

/**
 * Submit a query to Trino
 *
 * @param  {string} Trino server API URL
 * @param  {Object} Trino API Headers
 * @param  {string} Trino query string
 * @return {Object} Trino Data
 */
function runTrinoQuery(url,headers,query) {

  var data=[]
  var url_api=url+'/v1/statement';
  
  var options_post = {
    'contentType' : 'application/json',
    'method' : 'post',
    'payload' : query,
    'validateHttpsCertificates': false,
    'headers': headers,
    'muteHttpExceptions':false
  };
  var options_get = {
    'contentType' : 'application/json',
    'method' : 'get',
    'validateHttpsCertificates': false,
    'headers': headers,
    'muteHttpExceptions':false
  };

  var response = UrlFetchApp.fetch(url_api, options_post);
  var response_json = response.getContentText();

  var nextUri = JSON.parse(response_json).nextUri
  var datai = JSON.parse(response_json).data;
  if (datai != null) data=data.concat(datai);

  while (nextUri != null) {

    response = UrlFetchApp.fetch(nextUri, options_get);
    response_json = response.getContentText();

    nextUri = JSON.parse(response_json).nextUri
    datai = JSON.parse(response_json).data;
    if (datai != null) data=data.concat(datai);

  }

  datai = JSON.parse(response_json).data;
  if (datai != null) data=data.concat(datai);
  
  return data;
}


/**
 * Submit query to Trino and return results as required by Data Studio.
 *
 * @param  {Object} request Data request parameters.
 * @return {Object} Contains the schema and data for the given request.
 */
function getDataFromTrino(request) {
  var requestedFieldIds = request.fields.map(function(field) {
    return field.name;
  });
  var fields = getFieldsFromTrino(request);
  var requestedFields = fields.forIds(requestedFieldIds);
  var schema = requestedFields.build();

  var params = request.configParams || {};

  var headers = generateTrinoAPIHeaders(params.trino_user,params.trino_password);

  // Generate and submit query

  var query = generateTrinoQuery(request);

  //Logger.log(query);

  var queryResults = runTrinoQuery(params.trino_url,headers,query);
  
  //Logger.log(queryResults);

  var rows = queryResults.map(function(row) {
    return {values: row};
  });

  //Logger.log(schema);
  //Logger.log(rows);

  return {
    schema: schema,
    rows: rows
  };
}