function test_trino() {

  //var url="http://34.107.95.186:8080";
  //var user="starburst_service";
  //var password="";

  var url="https://sbe-official-demo-azure.fieldeng.starburstdata.net";
  var user="sa.victor.coustenobl";
  var password="P@$$w0rd06";
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