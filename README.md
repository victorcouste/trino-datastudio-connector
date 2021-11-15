# trino-datastudio-connector

*This is not an official Google product*

This [Data Studio] [Community Connector] lets users query the [Trino] SQL engine catalogs.

This Community Connector uses endpoint of [Trino REST API].

## Set up the Community Connector for personal use

To use this Community Connector in Data Studio there is a one-time setup to
deploy your own personal instance of the connector using Apps Script.

## Deploy the connector

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

[Data Studio]: https://datastudio.google.com
[Community Connector]: https://developers.google.com/datastudio/connector
[Trino]: https://trino.io/
[Trino REST API]: https://trino.io/docs/current/develop/client-protocol.html
[Use a Community Connector]: https://developers.google.com/datastudio/connector/use
[revoke access]: https://support.google.com/datastudio/answer/9053467
[connector list]: https://datastudio.google.com/c/datasources/create
[creating a new data source]: https://support.google.com/datastudio/answer/6300774