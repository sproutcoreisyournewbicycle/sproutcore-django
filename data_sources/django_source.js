/*globals Django CoreTasks */
// djangcore URL structure (via Taavi):

/**
  Add this to get things working.
*/
// Django = SC.Object.create() ;

Django.urlPrefix = null;

/**
  GET total number of objects
  /<url_prefix>/<app_label>/<model_name>/length/
*/
Django.getLengthURL = "/%@/%@/%@/length/" ;

/**
  GET a range of objects based on a sort
  Parameters::
    ordering (required, takes: the key of a field)
    start (optional, takes: integer, default: 0)
    length (optional, takes: integer, default: <length of objects>)
  /<url_prefix>/<app_label>/<model_name>/range/?order_by=pk&start=0&length=10
*/
Django.getRangeURL = "/%@/%@/%@/range/?start=%@&length=%@" ;
Django.getAllURL = "/%@/%@/%@/range/" ;

/**
  GET, DELETE one or more objects by their pks
  Parameters::
    NOTE: we need to be able to use non integer PKs. Is it safe to assume that PKs won't have commas?
    pk (required, takes: comma-separated list of integers) Integers? does this mean that it is bad to have uuid pk's?
  Notes:
    - GET will always return a list, even if it only contains one object
    - DELETE will return a response with a proper http status code
  /<url_prefix>/<app_label>/<model_name>/?pks=1,2,3
*/
Django.getURL = "/%@/%@/%@/?pk=%@" ;
Django.deleteURL = "/%@/%@/%@/?pk=%@" ;

/**
  POST, PUT one or more updated objects
  Notes:
    - Requests should pass a list of attribute hashes in the body of the request.
    - PUT requests should also include a pk value in each attribute hash.
  /<url_prefix>/<app_label>/<model_name>/
*/
Django.putURL = "/%@/%@/%@/?pk=%@" ;
Django.postURL = "/%@/%@/%@/" ;


/** @class
  This code is mean to work in concert with the djangocore Django 
  application and the auto-generated SproutCore frameworks produced 
  by the django-sproutcore library (which includes the djangocore
  application).

  @extends SC.DataSource
  @author Erich Ocean
*/
Django.DataSource = SC.DataSource.extend({

  createRecord: function(store, storeKey, params) {
    console.log("createRecord");
    var recordType      = SC.Store.recordTypeFor(storeKey),
        dataHash        = store.readDataHash(storeKey),
        recordTypePath  = recordType.modelClass.split("."),
        appName         = recordTypePath[0],
        modelName       = recordTypePath[1];
    var url = Django.postURL.fmt('api', appName, modelName);

    SC.Request.postUrl(url).set('isJSON', YES)
      .notify(this, this._didCreateRecord, {
        store: store,
        storeKey: storeKey
      }).send(dataHash);

    return YES ;
  },

  _didCreateRecord: function(request, params) {
    console.log("_didCreateRecord");
    var store     = params.store,
        storeKey  = params.storeKey,
        response  = request.get('response'),
        record;
    if (SC.$ok(response)) {
      record = response.fields;
      record.pk = response.pk;
      store.dataSourceDidComplete(storeKey, record, record.pk);
    }else{
      store.dataSourceDidError(storeKey, record);
    }
  },

  retrieveRecord: function(store, storeKey, id) {
    console.log("retrieveRecord");
    var recordType      = SC.Store.recordTypeFor(storeKey),
        recordId        = id ? id : store.idFor(storeKey),
        recordTypePath  = recordType.modelClass.split("."),
        appName         = recordTypePath[0],
        modelName       = recordTypePath[1];
    var url = Django.getURL.fmt('api', appName, modelName, id);

    SC.Request.getUrl(url).set('isJSON', YES)
      .notify(this, this._didRetrieveRecord, {
        store: store,
        storeKey: storeKey
      }).send();
    return YES;
  },

  _didRetrieveRecord: function(request, params) {
    console.log("_didRetrieveRecord");
    var store     = params.store,
        storeKey  = params.storeKey,
        response  = request.get('response'),
        record;
    // normal: load into store...response == dataHash
    if (SC.$ok(response)) {
      record = response.fields;
      record.pk = response.pk;

      console.log('dataSourceDidComplete');
      store.dataSourceDidComplete(storeKey, record);

    // error: indicate as such...response == error
    } else store.dataSourceDidError(storeKey, record);
  },

  updateRecord: function(store, storeKey, params) {
    console.log("updateRecord");
    var recordType      = SC.Store.recordTypeFor(storeKey),
        recordId        = store.idFor(storeKey),
        dataHash        = store.readDataHash(storeKey),
        recordTypePath  = recordType.modelClass.split("."),
        appName         = recordTypePath[0],
        modelName       = recordTypePath[1];
    var url = Django.putURL.fmt('api', appName, modelName, recordId);

    SC.Request.putUrl(url).set('isJSON', YES)
      .notify(this, this._didCreateRecord, {
        store: store,
        storeKey: storeKey
      }).send(dataHash);

    return YES ;
  },

  _didUpdateRecord: function(request, params) {
    console.log("_didUpdateRecord");
    var store     = params.store,
        storeKey  = params.storeKey,
        response  = request.get('response'),
        record;
    if (SC.$ok(response)) {
      record = response.fields;
      record.pk = response.pk;
      store.dataSourceDidComplete(storeKey, record, record.pk);
    }else{
      store.dataSourceDidError(storeKey, record);
    }
  },

  destroyRecord: function(store, storeKey, params) {
    console.log("destroyRecord");
    var recordType = SC.Store.recordTypeFor(storeKey),
        recordId   = store.idFor(storeKey),
        recordTypePath = recordType.modelClass.split("."),
        appName = recordTypePath[0],
        modelName = recordTypePath[1];
    var url = Django.deleteURL.fmt('api', appName, modelName, recordId);

    SC.Request.deleteUrl(url).set('isJSON', YES)
      .notify(this, this._didDestroyRecord, {
        store: store,
        storeKey: storeKey
      }).send();
    return YES;
  },

  _didDestroyRecord: function(request, params) {
    console.log("_didDestroyRecord");
    var store = params.store,
        storeKey = params.storeKey,
        response = request.get('response'),
        record;

    if (SC.$ok(response)) {
      record = response.fields;
      record.pk = response.pk;

      console.log('dataSourceDidDestroy');
      store.dataSourceDidDestroy(storeKey);

    // error: indicate as such...response == error
    } else store.dataSourceDidError(storeKey, record);
  },

  fetch: function(store, query) {
    console.log("fetch");
    if (true || query._autogenerated) {
      var recordType = query.recordType,
          recordTypePath = recordType.modelClass.split("."),
          appName = recordTypePath[0],
          modelName = recordTypePath[1];

      var url = Django.getAllURL.fmt('api', appName, modelName) ;
      SC.Request.getUrl(url).set('isJSON', YES)
        .notify(this, this._didFetchRecords, { 
           query: query, store: store
         }).send();
      return YES ;
    } else return NO ;
  },

  _didFetchRecords: function(request, params) {
    console.log("_didFetchRecords");
    var query       = params.query,
        qParams      = query.parameters,
        store       = params.store,
        response    = request.get('response');

    if (SC.$ok(response)) {
      var records = [];

      response.forEach(function(obj) {
        var new_record = obj.fields;
        new_record.pk = obj.pk;
        records.push(new_record);
      });

      store.loadRecords(query.recordType, records);
      store.dataSourceDidFetchQuery(query);
      if (qParams && qParams.successCallback) {
        CoreTasks.invokeCallback(qParams.successCallback);
      }
    } else {
      store.dataSourceDidErrorQuery(query, records) ;
      if (qParams && qParams.failureCallback) {
        CoreTasks.invokeCallback(qParams.failureCallback);
      }
    }
  }

});
