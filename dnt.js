/* 
    Copyright (C) 2021-2022 Ashley 
   
    This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this file,
   - You can obtain one at http://mozilla.org/MPL/2.0/
   */ 
if (typeof glitchdnt === "undefined") {
  var glitchdnt = {};
}
glitchdnt.dntEnabled = function (dnt, ua) {
  "use strict";
  var dntStatus =
    dnt || navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
  var userAgent = ua || navigator.userAgent;
  var anomalousWinVersions = [
    "Windows NT 6.1",
    "Windows NT 6.2",
    "Windows NT 6.3",
  ];
  var fxMatch = userAgent.match(/Firefox\/(\d+)/);
  var ieRegEx = /MSIE|Trident/i;
  var isIE = ieRegEx.test(userAgent);
  var platform = userAgent.match(/Windows.+?(?=;)/g);
  if (isIE && typeof Array.prototype.indexOf !== "function") {
    return false;
  } else if (fxMatch && parseInt(fxMatch[1], 10) < 32) {
    dntStatus = "Unspecified";
  } else if (
    isIE &&
    platform &&
    anomalousWinVersions.indexOf(platform.toString()) !== -1
  ) {
    dntStatus = "Unspecified";
  } else {
    dntStatus = { 0: "Disabled", 1: "Enabled" }[dntStatus] || "Unspecified";
  }
  return dntStatus === "Enabled" ? true : false;
};
// only load analytics if DNT is not enabled
if (glitchdnt && !glitchdnt.dntEnabled()) {
  var analytics = (window.analytics = window.analytics || []);
        if (!analytics.initialize)
          if (analytics.invoked) window.console && console.error && console.error('Segment snippet included twice.');
          else {
            analytics.invoked = !0;
            analytics.methods = [
              'trackSubmit',
              'trackClick',
              'trackLink',
              'trackForm',
              'pageview',
              'identify',
              'reset',
              'group',
              'track',
              'ready',
              'alias',
              'debug',
              'page',
              'once',
              'off',
              'on',
            ];
            analytics.factory = function(t) {
              return function() {
                var e = Array.prototype.slice.call(arguments);
                e.unshift(t);
                analytics.push(e);
                return analytics;
              };
            };
            for (var t = 0; t < analytics.methods.length; t++) {
              var e = analytics.methods[t];
              analytics[e] = analytics.factory(e);
            }
            analytics.load = function(t, e) {
              var n = document.createElement('script');
              n.type = 'text/javascript';
              n.async = !0;
              n.src = 'https://cdn.segment.com/analytics.js/v1/' + t + '/analytics.min.js';
              var a = document.getElementsByTagName('script')[0];
              a.parentNode.insertBefore(n, a);
              analytics._loadOptions = e;
            };
            analytics.SNIPPET_VERSION = '4.1.0';

            //load optimizely 
          
              var o = document.createElement('script');
              o.type = 'text/javascript';
              o.async = !0;
              o.src = 'https://cdn.optimizely.com/datafiles/GZMqH7Aou8QmcPV2hm16wj.json/tag.js';
              var a = document.getElementsByTagName('script')[0];
              a.parentNode.insertBefore(n, a);
 }
