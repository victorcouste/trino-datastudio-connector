function test_trino() {

  var url="http://trino_url:8080";
  var user="xxxxx";
  var password="";
  var catalog="tpch";
  var schema="tiny";
  var object="nation";

  var query="select * from "+catalog+"."+schema+"."+object;

  var headers = generateTrinoAPIHeaders(user,password);

  const columns = getTrinoColumns(url,headers,catalog,schema,object);
  console.log(columns);

  const data = runTrinoQuery(url,headers,query);
  console.log(data);

}