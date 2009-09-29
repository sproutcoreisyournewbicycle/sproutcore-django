/*globals AppEngine zp */

/** @private */
SC.RecordAttribute.registerTransform(AppEngine.BooleanProperty, {
  
  /** @private - convert a boolean Property to a boolean */
  to: function(obj) {
    return !!obj ;
  }
  
});

SC.RecordAttribute.registerTransform(AppEngine.BlobProperty, {
  /** @private - 
    convert a Blob Property to a string 
    allow null through as that will be checked separately
  */
  to: function(obj) {
    if (!(typeof obj === SC.T_STRING) && !SC.none(obj) && obj.toString) {
      obj = obj.toString();
    }
    return obj;
  }
});

// TODO: Needs to be constrained to 500 bytes
/** @private */
SC.RecordAttribute.registerTransform(AppEngine.ByteStringProperty, {
  
  /** @private - 
    convert a char Property to a string 
    allow null through as that will be checked separately
  */
  to: function(obj) {
    if (!(typeof obj === SC.T_STRING) && !SC.none(obj) && obj.toString) {
      obj = obj.toString();
    }
    return obj;
  }
  
});

/** @private */
SC.RecordAttribute.registerTransform(AppEngine.CategoryProperty, {
  
  /** @private - 
    convert a Category Property to a string 
    allow null through as that will be checked separately
  */
  to: function(obj) {
    if (!(typeof obj === SC.T_STRING) && !SC.none(obj) && obj.toString) {
      obj = obj.toString();
    }
    return obj;
  }
  
});

// TODO: Check to make sure that this works. I added in some )'s to fix
// a syntax error, I don't know if that'll stop it from working. GeoffreyD
AppEngine.DATE_FIELD_REGEXP = /([0-9]{4})(-([0-9]{2})(-([0-9]{2})))/ ;

/** @private */
SC.RecordAttribute.registerTransform(AppEngine.DateProperty, {

  /** @private - convert a string to a Date */
  to: function(str, attr) {
    var ret ;
    
    var regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})" +
           "(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\\.([0-9]+))?)?" +
           "(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?",
        d      = str.match(new RegExp(regexp)),
        offset = 0,
        date   = new Date(d[1], 0, 1),
        time ;
        
    if (d[3]) { date.setMonth(d[3] - 1); }
    if (d[5]) { date.setDate(d[5]); }
    if (d[7]) { date.setHours(d[7]); }
    if (d[8]) { date.setMinutes(d[8]); }
    if (d[10]) { date.setSeconds(d[10]); }
    if (d[12]) { date.setMilliseconds(Number("0." + d[12]) * 1000); }
    if (d[14]) {
       offset = (Number(d[16]) * 60) + Number(d[17]);
       offset *= ((d[15] == '-') ? 1 : -1);
    }
    
    offset -= date.getTimezoneOffset();
    time = (Number(date) + (offset * 60 * 1000));
    
    ret = new Date();
    ret.setTime(Number(time));
    
    return ret ;
  },
  
  _dates: {},
  
  /** @private - convert a date to a string */
  from: function(date) { 
    var ret = this._dates[date.getTime()];
    if (ret) return ret ; 
    
    this._dates[date.getTime()] = ret = "%@-%@-%@".fmt(
      zp(date.getFullYear()),
      zp(date.getMonth()+1),
      zp(date.getDate())
    ) ;
    
    return ret ;
  }
});

/** @private */
AppEngine.DATE_TIME_FIELD_REGEXP = new RegExp(
  "([0-9]{4})(-([0-9]{2})(-([0-9]{2})" +
  "(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\\.([0-9]+))?)?" +
  "(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?"
);

/** @private */
SC.RecordAttribute.registerTransform(AppEngine.DateTimeProperty, {
  
  /** @private - convert a string to a Date */
  to: function(str, attr) {
    var ret ;
    
    var d      = str.match(AppEngine.DATE_TIME_FIELD_REGEXP),
        offset = 0,
        date   = new Date(d[1], 0, 1),
        time ;
    
    if (d[3]) { date.setMonth(d[3] - 1); }
    if (d[5]) { date.setDate(d[5]); }
    if (d[7]) { date.setHours(d[7]); }
    if (d[8]) { date.setMinutes(d[8]); }
    if (d[10]) { date.setSeconds(d[10]); }
    if (d[12]) { date.setMilliseconds(Number("0." + d[12]) * 1000); }
    if (d[14]) {
       offset = (Number(d[16]) * 60) + Number(d[17]);
       offset *= ((d[15] == '-') ? 1 : -1);
    }
    
    offset -= date.getTimezoneOffset();
    time = (Number(date) + (offset * 60 * 1000));
    
    ret = new Date();
    ret.setTime(Number(time));
    
    return ret ;
  },
  
  _dates: {},
  
  _zeropad: function(num) { 
    return ((num<0) ? '-' : '') + ((num<10) ? '0' : '') + Math.abs(num); 
  },
  
  /** @private - convert a date to a string */
  from: function(date) { 
    var ret = this._dates[date.getTime()];
    if (ret) return ret ; 
    
    // figure timezone
    var zp = this._zeropad,
        tz = 0-date.getTimezoneOffset()/60;
        
    tz = (tz === 0) ? 'Z' : '%@:00'.fmt(zp(tz));
    
    this._dates[date.getTime()] = ret = "%@-%@-%@T%@:%@:%@%@".fmt(
      zp(date.getFullYear()),
      zp(date.getMonth()+1),
      zp(date.getDate()),
      zp(date.getHours()),
      zp(date.getMinutes()),
      zp(date.getSeconds()),
      tz) ;
    
    return ret ;
  }
});

/** @private */
SC.RecordAttribute.registerTransform(AppEngine.EmailProperty, {
  
  /** @private - 
    convert a Email Property to a string 
    allow null through as that will be checked separately
  */
  to: function(obj) {
    if (!(typeof obj === SC.T_STRING) && !SC.none(obj) && obj.toString) {
      obj = obj.toString();
    }
    return obj;
  }
  
});

/** @private */
SC.RecordAttribute.registerTransform(AppEngine.FloatProperty, {
  
  /** @private - convert a float Property to a Number */
  to: function(obj) {
    return SC.none(obj) ? null : Number(obj) ;
  }
  
});

SC.RecordAttribute.registerTransform(AppEngine.GeoPtProperty, {
  to: function(str, attr) {
    throw("Not Implemented");
  }
});

SC.RecordAttribute.registerTransform(AppEngine.IMProperty, {
  to: function(str, attr) {
    throw("Not Implemented");
  }
});

/** @private */
SC.RecordAttribute.registerTransform(AppEngine.IntegerProperty, {
  
  /** @private - convert an integere Property to a Number */
  to: function(obj) {
    return SC.none(obj) ? null : Number(obj) ;
  }
  
});

/** @private */
SC.RecordAttribute.registerTransform(AppEngine.LinkProperty, {
  
  /** @private - 
    convert a Link Property to a string 
    allow null through as that will be checked separately
  */
  to: function(obj) {
    if (!(typeof obj === SC.T_STRING) && !SC.none(obj) && obj.toString) {
      obj = obj.toString();
    }
    return obj;
  }
  
});

SC.RecordAttribute.registerTransform(AppEngine.ListProperty, {
  to: function(str, attr) {
    throw("Not Implemented");
  }
});

SC.RecordAttribute.registerTransform(AppEngine.PhoneNumberProperty, {
  /** @private - 
    convert a Phone Number Property to a string 
    allow null through as that will be checked separately
  */
  to: function(obj) {
    if (!(typeof obj === SC.T_STRING) && !SC.none(obj) && obj.toString) {
      obj = obj.toString();
    }
    return obj;
  }
});

SC.RecordAttribute.registerTransform(AppEngine.PostalAddressProperty, {
  /** @private - 
    convert an Address Property to a string 
    allow null through as that will be checked separately
  */
  to: function(obj) {
    if (!(typeof obj === SC.T_STRING) && !SC.none(obj) && obj.toString) {
      obj = obj.toString();
    }
    return obj;
  }
});

/** @private */
SC.RecordAttribute.registerTransform(AppEngine.RatingProperty, {
  
  /** @private - convert a Rating Property to a Number */
  to: function(obj) {
    return SC.none(obj) ? null : Number(obj) ;
  }
  
});

SC.RecordAttribute.registerTransform(AppEngine.ReferenceProperty, {
  to: function(str, attr) {
    throw("Not Implemented");
  }
});

SC.RecordAttribute.registerTransform(AppEngine.SelfReferenceProperty, {
  to: function(str, attr) {
    throw("Not Implemented");
  }
});

/** @private */
SC.RecordAttribute.registerTransform(AppEngine.StringProperty, {
  
  /** @private - 
    convert a char Property to a string 
    allow null through as that will be checked separately
  */
  to: function(obj) {
    if (!(typeof obj === SC.T_STRING) && !SC.none(obj) && obj.toString) {
      obj = obj.toString();
    }
    return obj;
  }
  
});

SC.RecordAttribute.registerTransform(AppEngine.StringListProperty, {
  to: function(str, attr) {
    throw("Not Implemented");
  }
});

/** @private */
SC.RecordAttribute.registerTransform(AppEngine.TextProperty, {
  
  /** @private - 
    convert a slug field to a string 
    allow null through as that will be checked separately
  */
  to: function(obj) {
    if (!(typeof obj === SC.T_STRING) && !SC.none(obj) && obj.toString) {
      obj = obj.toString();
    }
    return obj;
  }
  
});

/** @private */
AppEngine.TIME_FIELD_REGEXP = /([0-9]{2}):([0-9]{2}):([0-9]{2})/ ;

/** @private FIXME: How does Django pass times in JSON? */
SC.RecordAttribute.registerTransform(AppEngine.TimeProperty, {

  /** @private - convert a string to a Date */
  to: function(str, attr) {
    var ret ;
    
    var d      = str.match(AppEngine.TIME_FIELD_REGEXP),
        offset = 0,
        date   = new Date(0, 0, 1),
        time ;
    
    date.setHours(d[1]) ;
    date.setMinutes(d[2]) ;
    date.setSeconds(d[3]) ;
    
    return ret ;
  },
  
  _dates: {},
  
  /** @private - convert a date to a string */
  from: function(date) { 
    var ret = this._dates[date.getTime()];
    if (ret) return ret ; 
    
    this._dates[date.getTime()] = ret = "%@:%@:%@".fmt(
      zp(date.getHours()),
      zp(date.getMinutes()),
      zp(date.getSeconds())
    );
    
    return ret ;
  }
  
});

SC.RecordAttribute.registerTransform(AppEngine.UserProperty, {
  to: function(str, attr) {
    throw("Not Implemented");
  }
});