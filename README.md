# Trino Community Connector for Data Studio

<img src="https://github.com/victorcouste/trino-datastudio-connector/blob/main/trino_datastudio.png?raw=true" alt="Trino for Data Studio" width="50%" height="50%">

*This is not an official Google product*

This [Google Data Studio] [Community Connector] lets users query the [Trino] SQL engine catalogs, schemas, tables and views.

This Community Connector uses the [Trino REST API].

To install and use this Community Connector in Data Studio you can use this [Direct Link] or follow below steps to do your own deployment.

## Set up the Community Connector for personal use

To use this Community Connector in Data Studio there is a one-time setup to
deploy your own personal instance of the connector using Apps Script.

### Deploy the connector

1.  Visit [Google Apps Script](https://script.google.com/) and create a new
    project.
1.  In the Apps Script development environment, select **View > Show manifest
    file**. Replace the contents of this file with the content of the
    `src/appsscript.json` file from the repository.
1.  For every `.js` file under `src`, you will need to create a file in Apps
    Scripts (**File > New > Script File**), then copy over the content from the
    repository.
1.  To use the Community Connector in Data Studio, follow the
    [guide on Community Connector Developer site](https://developers.google.com/datastudio/connector/use).


## Using the connector in Data Studio

Once you've set up and deployed the connector, follow the
[Use a Community Connector] guide to use the connector in Data Studio.

**Note**: After using the connector in Data Studio, as long as you do not
[revoke access], it will remain listed in the [connector list] for easy access
when [creating a new data source].

### Trino connector configuration

The following configuration parameters are available:

- **`Trino Server URL`** (required)
Your Trino server URL (http or https) e.g. http://my_trino_server:8080 or https://my_trino_server.

- **`Trino User`**  (required)
Your Trino user name.

- **`Trino Password`** (Optional)
Trino user password. You need it if your Trino [Authentication Type] is set to PASSWORD. Let it blank if no password is required to connect.
 
- **`Trino Catalog`** (required)
Trino [Catalog] you want to connect.

- **`Trino Schema`** (required)
Trino [Schema] you want to connect.
  
- **`Trino Table or View`** (required)
Trino [Table or View] you want to connect.

 - **`Row Limit`**  (Optional, default=10000)
Set this limit if you want to limit the number of rows retrieved in Data Studio.

![Trino connector parameters](https://github.com/victorcouste/trino-datastudio-connector/blob/main/trino_connector_parameters.png?raw=true)

![Trino connector fields](https://github.com/victorcouste/trino-datastudio-connector/blob/main/trino_connectorfields.png?raw=true)

![Dataset explorer](https://github.com/victorcouste/trino-datastudio-connector/blob/main/dataset_explorer.png?raw=true)


[Google Data Studio]: https://datastudio.google.com
[Community Connector]: https://developers.google.com/datastudio/connector
[Trino]: https://trino.io/
[Trino REST API]: https://trino.io/docs/current/develop/client-protocol.html
[Use a Community Connector]: https://developers.google.com/datastudio/connector/use
[revoke access]: https://support.google.com/datastudio/answer/9053467
[connector list]: https://datastudio.google.com/c/datasources/create
[creating a new data source]: https://support.google.com/datastudio/answer/6300774
[Table or View]: https://trino.io/docs/current/overview/concepts.html#table
[Schema]: https://trino.io/docs/current/overview/concepts.html#schema
[Catalog]: https://trino.io/docs/current/overview/concepts.html#catalog
[Authentication Type]: https://trino.io/docs/current/security/authentication-types.html
[Direct Link]: https://datastudio.google.com/datasources/create?connectorId=AKfycbyfQ2T-c1badhAjPbcr5qzZ4n55fVXyEPxXlCkSID-P0EIGAhtS6EB6kljypEcYsslkKg