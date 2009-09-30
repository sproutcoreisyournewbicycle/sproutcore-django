Django = SC.Object.extend() ;

Django.Field = SC.Object.extend() ;

// define the Django field type tags (used in SC.RecordAttribute transforms)...
Django.AutoField = Django.Field.extend() ;
Django.BooleanField = Django.Field.extend() ;
Django.CharField = Django.Field.extend() ;
Django.CommaSeparatedIntegerField = Django.Field.extend() ;
Django.DateField = Django.Field.extend() ;
Django.DateTimeField = Django.Field.extend() ;
Django.DecimalField = Django.Field.extend() ;
Django.EmailField = Django.Field.extend() ;
Django.FileField = Django.Field.extend() ;
Django.FilePathField = Django.Field.extend() ;
Django.FloatField = Django.Field.extend() ;
Django.ImageField = Django.Field.extend() ;
Django.IntegerField = Django.Field.extend() ;
Django.IPAddressField = Django.Field.extend() ;
Django.NullBooleanField = Django.Field.extend() ;
Django.PositiveIntegerField = Django.Field.extend() ;
Django.PositiveSmallIntegerField = Django.Field.extend() ;
Django.SlugField = Django.Field.extend() ;
Django.SmallIntegerField = Django.Field.extend() ;
Django.TextField = Django.Field.extend() ;
Django.TimeField = Django.Field.extend() ;
Django.URLField = Django.Field.extend() ;
Django.XMLField = Django.Field.extend() ;

/** @private Taken from http://www.devarticles.com/c/a/JavaScript/JavaScript-and-XML/2/ */
Django.parseXML = function(text) {
    if (typeof DOMParser != "undefined") {
        // Mozilla, Firefox, and related browsers
        return (new DOMParser()).parseFromString(text, "application/xml");
    }
    else if (typeof ActiveXObject != "undefined") { 
        // Internet Explorer.
        var doc = XML.newDocument( );   // Create an empty document
        doc.loadXML(text);              //  Parse text into it
        return doc;                     // Return it
    }
    else {
        // As a last resort, try loading the document from a data: URL
        // This is supposed to work in Safari. Thanks to Manos Batsis and
        // his Sarissa library (sarissa.sourceforge.net) for this technique.
        var url = "data:text/xml;charset=utf-8," + encodeURIComponent(text);
        var request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send(null);
        return request.responseXML;
    }
};

AppEngine = SC.Object.extend() ;

AppEngine.Field = SC.Object.extend() ;

AppEngine.BooleanProperty        = AppEngine.Field.extend() ;
AppEngine.BlobProperty           = AppEngine.Field.extend() ;
AppEngine.ByteStringProperty     = AppEngine.Field.extend() ;
AppEngine.CategoryProperty       = AppEngine.Field.extend() ;
AppEngine.DateProperty           = AppEngine.Field.extend() ;
AppEngine.DateTimeProperty       = AppEngine.Field.extend() ;
AppEngine.EmailProperty          = AppEngine.Field.extend() ;
AppEngine.FloatProperty          = AppEngine.Field.extend() ;
AppEngine.GeoPtProperty          = AppEngine.Field.extend() ;
AppEngine.IMProperty             = AppEngine.Field.extend() ;
AppEngine.IntegerProperty        = AppEngine.Field.extend() ;
AppEngine.LinkProperty           = AppEngine.Field.extend() ;
AppEngine.ListProperty           = AppEngine.Field.extend() ;
AppEngine.PhoneNumberProperty    = AppEngine.Field.extend() ;
AppEngine.PostalAddressProperty  = AppEngine.Field.extend() ;
AppEngine.RatingProperty         = AppEngine.Field.extend() ;
AppEngine.ReferenceProperty      = AppEngine.Field.extend() ;
AppEngine.SelfReferenceProperty  = AppEngine.Field.extend() ;
AppEngine.StringProperty         = AppEngine.Field.extend() ;
AppEngine.StringListProperty     = AppEngine.Field.extend() ;
AppEngine.TextProperty           = AppEngine.Field.extend() ;
AppEngine.TimeProperty           = AppEngine.Field.extend() ;
AppEngine.UserProperty           = AppEngine.Field.extend() ;