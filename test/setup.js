'use strict';

import { jsdom } from 'jsdom';

global.document = jsdom('<!doctype html><html><body><main id="app"></main></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;