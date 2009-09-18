// ==========================================================================
// Project:   Sproutcore AutoAdmin
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

// This page describes the main user interface for your application.  
SC.AutoAdmin.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'splitView'.w(),
    
    splitView: SC.SplitView.design({
      
      layout: { left: 0, top: 0, right: 0, bottom: 0 },
      
      defaultThickness: 200,
      
      topLeftView: SC.ScrollView.design({
        
        hasHorizontalScroller: NO, // disable horizontal scrolling
        contentView: SC.SourceListView.design({
          contentBinding: "SC.AutoAdmin.modelListController.arrangedObjects",
          selectionBinding: "SC.AutoAdmin.modelListController.selection",
          contentValueKey: "displayName",
          hasContentIcon: NO,
          // contentIconKey:  "targetIcon",
          
          action: 'selectTarget',
          target: 'SC.AutoAdmin'
        })
      }),
      
      bottomRightView: SC.ContainerView.design({
        nowShowingBinding: "SC.AutoAdmin.currentView"
      })
    })
  })

});
