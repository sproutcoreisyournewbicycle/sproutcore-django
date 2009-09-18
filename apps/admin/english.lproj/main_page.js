// ==========================================================================
// Project:   Sproutcore AutoAdmin
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

// This page describes the main user interface for your application.  
SC.AutoAdmin.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'splitView toolbarView'.w(),
    
    labelView: SC.LabelView.design({
      layout: { centerX: 0, centerY: 0, width: 100, height: 18 },
      tagName: "h1", value: "Hello World"
    })
  })

});
