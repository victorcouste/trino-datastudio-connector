# trino-datastudio-connector

*This is not an official Google product*

This [Data Studio] [Community Connector] lets users query the [Trino] SQL engine catalogs.

This Community Connector uses endpoint of [Trino REST API].

## Set up the Community Connector for personal use

To use this Community Connector in Data Studio there is a one-time setup to
deploy your own personal instance of the connector using Apps Script.

### Deploy the connector

Follow the [deployment guide] to deploy the Community Connector.

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
[deployment guide]: ../deploy.md
[Use a Community Connector]: https://developers.google.com/datastudio/connector/use
[revoke access]: https://support.google.com/datastudio/answer/9053467
[connector list]: https://datastudio.google.com/c/datasources/create
[creating a new data source]: https://support.google.com/datastudio/answer/6300774
[This app isn't verified]: ../verification.md