import ace from 'ace-builds';

// only import the modes and theme we use
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-less';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-dracula';

/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable import/no-unresolved */
import htmlWorkerUrl from 'file-loader!ace-builds/src-noconflict/worker-html';
import javascriptWorkerUrl from 'file-loader!ace-builds/src-noconflict/worker-javascript';

ace.config.setModuleUrl('ace/mode/html_worker', htmlWorkerUrl);
ace.config.setModuleUrl('ace/mode/javascript_worker', javascriptWorkerUrl);
