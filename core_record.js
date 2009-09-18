// ==========================================================================
// Project:   Sproutcore AutoAdmin
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licened under MIT license (see license.js)
// ==========================================================================
/*globals Django */

SC.mixin(SC.AutoAdmin, {
  
  registeredModels: [],
  
  registerModel: function(model) {
    this.propertyWillChange('registeredModels');
    this.registeredModels.push(model);
    this.propertyDidChange('registeredModels');
  }
  
});