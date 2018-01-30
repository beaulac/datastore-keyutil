# datastore-keyutil

A utility to make dealing with `@google-cloud/datastore` keys little more pleasant.

## Usage

```javascript
var Datastore = require('@google-cloud/datastore');
var ds = new Datastore(/* init options */);

var KeyUtil = require('datastore-keyutil').KeyUtil;

var options = {
    // boolean (default: false) - exposes instance as ds.keyUtil,
    embed: true, 
    
    // function (default: throws BadKeyError with message) - function to call on invalid data.    
    errorFn: function(message, data) {
        console.error(message, data);
        throw new Error(message);
    }
}

var ku = new KeyUtil(ds, options);

ds.query('kind')
  .select('__key__')
  .run()
  .then(function (data) {
      var entities = data[0];

      var keysArray = ku.mapToKeys(entities);

      var uidsArray = ku.mapToBase64UIDs(entities);
  });
```

See [here](docs/README.md) for an exhaustive list of KeyUtil functions.

## Running the tests

To run the tests, you'll need to run a local Datastore emulator, from the [Google Cloud SDK](https://cloud.google.com/sdk/downloads).

Then, run `npm test`

## Versioning

This library is still in **beta**, breaking changes may occur until v1.0.0 is reached. We use [SemVer](http://semver.org/) for versioning.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

This wouldn't be of any use without the [NodeJS Google Cloud Datastore library](https://github.com/googleapis/nodejs-datastore).
