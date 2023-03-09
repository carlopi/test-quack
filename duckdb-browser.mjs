var Y=Object.create;var N=Object.defineProperty;var H=Object.getOwnPropertyDescriptor;var j=Object.getOwnPropertyNames;var K=Object.getPrototypeOf,V=Object.prototype.hasOwnProperty;var z=(s,e)=>()=>(e||s((e={exports:{}}).exports,e),e.exports);var J=(s,e,r,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of j(e))!V.call(s,o)&&o!==r&&N(s,o,{get:()=>e[o],enumerable:!(t=H(e,o))||t.enumerable});return s};var $=(s,e,r)=>(r=s!=null?Y(K(s)):{},J(e||!s||!s.__esModule?N(r,"default",{value:s,enumerable:!0}):r,s));var x=z((Be,G)=>{G.exports=Worker});var Z=(c=>(c[c.NONE=0]="NONE",c[c.DEBUG=1]="DEBUG",c[c.INFO=2]="INFO",c[c.WARNING=3]="WARNING",c[c.ERROR=4]="ERROR",c))(Z||{}),X=(n=>(n[n.NONE=0]="NONE",n[n.CONNECT=1]="CONNECT",n[n.DISCONNECT=2]="DISCONNECT",n[n.OPEN=3]="OPEN",n[n.QUERY=4]="QUERY",n[n.INSTANTIATE=5]="INSTANTIATE",n))(X||{}),ee=(n=>(n[n.NONE=0]="NONE",n[n.OK=1]="OK",n[n.ERROR=2]="ERROR",n[n.START=3]="START",n[n.RUN=4]="RUN",n[n.CAPTURE=5]="CAPTURE",n))(ee||{}),re=(c=>(c[c.NONE=0]="NONE",c[c.WEB_WORKER=1]="WEB_WORKER",c[c.NODE_WORKER=2]="NODE_WORKER",c[c.BINDINGS=3]="BINDINGS",c[c.ASYNC_DUCKDB=4]="ASYNC_DUCKDB",c))(re||{}),A=class{log(e){}},L=class{constructor(e=2){this.level=e}log(e){e.level>=this.level&&console.log(e)}};function ce(s){switch(s){case 0:return"NONE";case 1:return"DEBUG";case 2:return"INFO";case 3:return"WARNING";case 4:return"ERROR";default:return"?"}}function ue(s){switch(s){case 0:return"NONE";case 1:return"OK";case 2:return"ERROR";case 3:return"START";case 4:return"RUN";case 5:return"CAPTURE";default:return"?"}}function le(s){switch(s){case 1:return"CONNECT";case 2:return"DISCONNECT";case 5:return"INSTANTIATE";case 3:return"OPEN";case 4:return"QUERY";default:return"?"}}function Ee(s){switch(s){case 0:return"NONE";case 1:return"WEB WORKER";case 2:return"NODE WORKER";case 3:return"DUCKDB BINDINGS";case 4:return"DUCKDB";default:return"?"}}var te=(e=>(e[e.SUCCESS=0]="SUCCESS",e))(te||{});var p=class{constructor(e,r){this._bindings=e,this._conn=r}get bindings(){return this._bindings}async close(){return this._bindings.disconnect(this._conn)}useUnsafe(e){return e(this._bindings,this._conn)}async query(e){this._bindings.logger.log({timestamp:new Date,level:2,origin:4,topic:4,event:4,value:e});let r=await this._bindings.runQuery(this._conn,e),t=l.RecordBatchReader.from(r);return console.assert(t.isSync(),"Reader is not sync"),console.assert(t.isFile(),"Reader is not file"),new l.Table(t)}async send(e){this._bindings.logger.log({timestamp:new Date,level:2,origin:4,topic:4,event:4,value:e});let r=await this._bindings.startPendingQuery(this._conn,e);for(;r==null;)r=await this._bindings.pollPendingQuery(this._conn);let t=new _(this._bindings,this._conn,r),o=await l.RecordBatchReader.from(t);return console.assert(o.isAsync()),console.assert(o.isStream()),o}async cancelSent(){return await this._bindings.cancelPendingQuery(this._conn)}async getTableNames(e){return await this._bindings.getTableNames(this._conn,e)}async prepare(e){let r=await this._bindings.createPrepared(this._conn,e);return new k(this._bindings,this._conn,r)}async insertArrowTable(e,r){let t=l.tableToIPC(e,"stream");await this.insertArrowFromIPCStream(t,r)}async insertArrowFromIPCStream(e,r){await this._bindings.insertArrowFromIPCStream(this._conn,e,r)}async insertCSVFromPath(e,r){await this._bindings.insertCSVFromPath(this._conn,e,r)}async insertJSONFromPath(e,r){await this._bindings.insertJSONFromPath(this._conn,e,r)}},_=class{constructor(e,r,t){this.db=e;this.conn=r;this.header=t;this._first=!0,this._depleted=!1,this._inFlight=null}async next(){if(this._first)return this._first=!1,{done:!1,value:this.header};if(this._depleted)return{done:!0,value:null};let e;return this._inFlight!=null?(e=await this._inFlight,this._inFlight=null):e=await this.db.fetchQueryResults(this.conn),this._depleted=e.length==0,this._depleted||(this._inFlight=this.db.fetchQueryResults(this.conn)),{done:this._depleted,value:e}}[Symbol.asyncIterator](){return this}},k=class{constructor(e,r,t){this.bindings=e,this.connectionId=r,this.statementId=t}async close(){await this.bindings.closePrepared(this.connectionId,this.statementId)}async query(...e){let r=await this.bindings.runPrepared(this.connectionId,this.statementId,e),t=l.RecordBatchReader.from(r);return console.assert(t.isSync()),console.assert(t.isFile()),new l.Table(t)}async send(...e){let r=await this.bindings.sendPrepared(this.connectionId,this.statementId,e),t=new _(this.bindings,this.connectionId,r),o=await l.RecordBatchReader.from(t);return console.assert(o.isAsync()),console.assert(o.isStream()),o}};var P=(d=>(d.CANCEL_PENDING_QUERY="CANCEL_PENDING_QUERY",d.CLOSE_PREPARED="CLOSE_PREPARED",d.COLLECT_FILE_STATISTICS="COLLECT_FILE_STATISTICS",d.CONNECT="CONNECT",d.COPY_FILE_TO_BUFFER="COPY_FILE_TO_BUFFER",d.COPY_FILE_TO_PATH="COPY_FILE_TO_PATH",d.CREATE_PREPARED="CREATE_PREPARED",d.DISCONNECT="DISCONNECT",d.DROP_FILE="DROP_FILE",d.DROP_FILES="DROP_FILES",d.EXPORT_FILE_STATISTICS="EXPORT_FILE_STATISTICS",d.FETCH_QUERY_RESULTS="FETCH_QUERY_RESULTS",d.FLUSH_FILES="FLUSH_FILES",d.GET_FEATURE_FLAGS="GET_FEATURE_FLAGS",d.GET_TABLE_NAMES="GET_TABLE_NAMES",d.GET_VERSION="GET_VERSION",d.GLOB_FILE_INFOS="GLOB_FILE_INFOS",d.INSERT_ARROW_FROM_IPC_STREAM="INSERT_ARROW_FROM_IPC_STREAM",d.INSERT_CSV_FROM_PATH="IMPORT_CSV_FROM_PATH",d.INSERT_JSON_FROM_PATH="IMPORT_JSON_FROM_PATH",d.INSTANTIATE="INSTANTIATE",d.OPEN="OPEN",d.PING="PING",d.POLL_PENDING_QUERY="POLL_PENDING_QUERY",d.REGISTER_FILE_BUFFER="REGISTER_FILE_BUFFER",d.REGISTER_FILE_HANDLE="REGISTER_FILE_HANDLE",d.REGISTER_FILE_URL="REGISTER_FILE_URL",d.RESET="RESET",d.RUN_PREPARED="RUN_PREPARED",d.RUN_QUERY="RUN_QUERY",d.SEND_PREPARED="SEND_PREPARED",d.START_PENDING_QUERY="START_PENDING_QUERY",d.TOKENIZE="TOKENIZE",d))(P||{}),w=(u=>(u.CONNECTION_INFO="CONNECTION_INFO",u.ERROR="ERROR",u.FEATURE_FLAGS="FEATURE_FLAGS",u.FILE_BUFFER="FILE_BUFFER",u.FILE_INFOS="FILE_INFOS",u.FILE_SIZE="FILE_SIZE",u.FILE_STATISTICS="FILE_STATISTICS",u.INSTANTIATE_PROGRESS="INSTANTIATE_PROGRESS",u.LOG="LOG",u.OK="OK",u.PREPARED_STATEMENT_ID="PREPARED_STATEMENT_ID",u.QUERY_PLAN="QUERY_PLAN",u.QUERY_RESULT="QUERY_RESULT",u.QUERY_RESULT_CHUNK="QUERY_RESULT_CHUNK",u.QUERY_RESULT_HEADER="QUERY_RESULT_HEADER",u.QUERY_RESULT_HEADER_OR_NULL="QUERY_RESULT_HEADER_OR_NULL",u.REGISTERED_FILE="REGISTERED_FILE",u.SCRIPT_TOKENS="SCRIPT_TOKENS",u.SUCCESS="SUCCESS",u.TABLE_NAMES="TABLE_NAMES",u.VERSION_STRING="VERSION_STRING",u))(w||{}),i=class{constructor(e,r){this.promiseResolver=()=>{};this.promiseRejecter=()=>{};this.type=e,this.data=r,this.promise=new Promise((t,o)=>{this.promiseResolver=t,this.promiseRejecter=o})}};function m(s){switch(s.typeId){case a.Type.Binary:return{sqlType:"binary"};case a.Type.Bool:return{sqlType:"bool"};case a.Type.Date:return{sqlType:"date"};case a.Type.DateDay:return{sqlType:"date32[d]"};case a.Type.DateMillisecond:return{sqlType:"date64[ms]"};case a.Type.Decimal:{let e=s;return{sqlType:"decimal",precision:e.precision,scale:e.scale}}case a.Type.Float:return{sqlType:"float"};case a.Type.Float16:return{sqlType:"float16"};case a.Type.Float32:return{sqlType:"float32"};case a.Type.Float64:return{sqlType:"float64"};case a.Type.Int:return{sqlType:"int32"};case a.Type.Int16:return{sqlType:"int16"};case a.Type.Int32:return{sqlType:"int32"};case a.Type.Int64:return{sqlType:"int64"};case a.Type.Uint16:return{sqlType:"uint16"};case a.Type.Uint32:return{sqlType:"uint32"};case a.Type.Uint64:return{sqlType:"uint64"};case a.Type.Uint8:return{sqlType:"uint8"};case a.Type.IntervalDayTime:return{sqlType:"interval[dt]"};case a.Type.IntervalYearMonth:return{sqlType:"interval[m]"};case a.Type.List:return{sqlType:"list",valueType:m(s.valueType)};case a.Type.FixedSizeBinary:return{sqlType:"fixedsizebinary",byteWidth:s.byteWidth};case a.Type.Null:return{sqlType:"null"};case a.Type.Utf8:return{sqlType:"utf8"};case a.Type.Struct:return{sqlType:"struct",fields:s.children.map(r=>R(r.name,r.type))};case a.Type.Map:{let e=s;return{sqlType:"map",keyType:m(e.keyType),valueType:m(e.valueType)}}case a.Type.Time:return{sqlType:"time[s]"};case a.Type.TimeMicrosecond:return{sqlType:"time[us]"};case a.Type.TimeMillisecond:return{sqlType:"time[ms]"};case a.Type.TimeNanosecond:return{sqlType:"time[ns]"};case a.Type.TimeSecond:return{sqlType:"time[s]"};case a.Type.Timestamp:return{sqlType:"timestamp",timezone:s.timezone||void 0};case a.Type.TimestampSecond:return{sqlType:"timestamp[s]",timezone:s.timezone||void 0};case a.Type.TimestampMicrosecond:return{sqlType:"timestamp[us]",timezone:s.timezone||void 0};case a.Type.TimestampNanosecond:return{sqlType:"timestamp[ns]",timezone:s.timezone||void 0};case a.Type.TimestampMillisecond:return{sqlType:"timestamp[ms]",timezone:s.timezone||void 0}}throw new Error(`unsupported arrow type: ${s.toString()}`)}function R(s,e){let r=m(e);return r.name=s,r}var se=new TextEncoder,D=class{constructor(e,r=null){this._onInstantiationProgress=[];this._worker=null;this._workerShutdownPromise=null;this._workerShutdownResolver=()=>{};this._nextMessageId=0;this._pendingRequests=new Map;this._logger=e,this._onMessageHandler=this.onMessage.bind(this),this._onErrorHandler=this.onError.bind(this),this._onCloseHandler=this.onClose.bind(this),r!=null&&this.attach(r)}get logger(){return this._logger}attach(e){this._worker=e,this._worker.addEventListener("message",this._onMessageHandler),this._worker.addEventListener("error",this._onErrorHandler),this._worker.addEventListener("close",this._onCloseHandler),this._workerShutdownPromise=new Promise((r,t)=>{this._workerShutdownResolver=r})}detach(){!this._worker||(this._worker.removeEventListener("message",this._onMessageHandler),this._worker.removeEventListener("error",this._onErrorHandler),this._worker.removeEventListener("close",this._onCloseHandler),this._worker=null,this._workerShutdownResolver(null),this._workerShutdownPromise=null,this._workerShutdownResolver=()=>{})}async terminate(){!this._worker||(this._worker.terminate(),this._worker=null,this._workerShutdownPromise=null,this._workerShutdownResolver=()=>{})}async postTask(e,r=[]){if(!this._worker){console.error("cannot send a message since the worker is not set!");return}let t=this._nextMessageId++;return this._pendingRequests.set(t,e),this._worker.postMessage({messageId:t,type:e.type,data:e.data},r),await e.promise}onMessage(e){let r=e.data;switch(r.type){case"LOG":{this._logger.log(r.data);return}case"INSTANTIATE_PROGRESS":{for(let o of this._onInstantiationProgress)o(r.data);return}}let t=this._pendingRequests.get(r.requestId);if(!t){console.warn(`unassociated response: [${r.requestId}, ${r.type.toString()}]`);return}if(this._pendingRequests.delete(r.requestId),r.type=="ERROR"){let o=new Error(r.data.message);o.name=r.data.name,o.stack=r.data.stack,t.promiseRejecter(o);return}switch(t.type){case"CLOSE_PREPARED":case"COLLECT_FILE_STATISTICS":case"COPY_FILE_TO_PATH":case"DISCONNECT":case"DROP_FILE":case"DROP_FILES":case"FLUSH_FILES":case"INSERT_ARROW_FROM_IPC_STREAM":case"IMPORT_CSV_FROM_PATH":case"IMPORT_JSON_FROM_PATH":case"OPEN":case"PING":case"REGISTER_FILE_BUFFER":case"REGISTER_FILE_HANDLE":case"REGISTER_FILE_URL":case"RESET":if(r.type=="OK"){t.promiseResolver(r.data);return}break;case"INSTANTIATE":if(this._onInstantiationProgress=[],r.type=="OK"){t.promiseResolver(r.data);return}break;case"GLOB_FILE_INFOS":if(r.type=="FILE_INFOS"){t.promiseResolver(r.data);return}break;case"GET_VERSION":if(r.type=="VERSION_STRING"){t.promiseResolver(r.data);return}break;case"GET_FEATURE_FLAGS":if(r.type=="FEATURE_FLAGS"){t.promiseResolver(r.data);return}break;case"GET_TABLE_NAMES":if(r.type=="TABLE_NAMES"){t.promiseResolver(r.data);return}break;case"TOKENIZE":if(r.type=="SCRIPT_TOKENS"){t.promiseResolver(r.data);return}break;case"COPY_FILE_TO_BUFFER":if(r.type=="FILE_BUFFER"){t.promiseResolver(r.data);return}break;case"EXPORT_FILE_STATISTICS":if(r.type=="FILE_STATISTICS"){t.promiseResolver(r.data);return}break;case"CONNECT":if(r.type=="CONNECTION_INFO"){t.promiseResolver(r.data);return}break;case"RUN_PREPARED":case"RUN_QUERY":if(r.type=="QUERY_RESULT"){t.promiseResolver(r.data);return}break;case"SEND_PREPARED":if(r.type=="QUERY_RESULT_HEADER"){t.promiseResolver(r.data);return}break;case"START_PENDING_QUERY":if(r.type=="QUERY_RESULT_HEADER_OR_NULL"){t.promiseResolver(r.data);return}break;case"POLL_PENDING_QUERY":if(r.type=="QUERY_RESULT_HEADER_OR_NULL"){t.promiseResolver(r.data);return}break;case"CANCEL_PENDING_QUERY":if(this._onInstantiationProgress=[],r.type=="SUCCESS"){t.promiseResolver(r.data);return}break;case"FETCH_QUERY_RESULTS":if(r.type=="QUERY_RESULT_CHUNK"){t.promiseResolver(r.data);return}break;case"CREATE_PREPARED":if(r.type=="PREPARED_STATEMENT_ID"){t.promiseResolver(r.data);return}break}t.promiseRejecter(new Error(`unexpected response type: ${r.type.toString()}`))}onError(e){console.error(e),console.error(`error in duckdb worker: ${e.message}`),this._pendingRequests.clear()}onClose(){if(this._workerShutdownResolver(null),this._pendingRequests.size!=0){console.warn(`worker terminated with ${this._pendingRequests.size} pending requests`);return}this._pendingRequests.clear()}async reset(){let e=new i("RESET",null);return await this.postTask(e)}async ping(){let e=new i("PING",null);await this.postTask(e)}async dropFile(e){let r=new i("DROP_FILE",e);return await this.postTask(r)}async dropFiles(){let e=new i("DROP_FILES",null);return await this.postTask(e)}async flushFiles(){let e=new i("FLUSH_FILES",null);return await this.postTask(e)}async instantiate(e,r=null,t=o=>{}){this._onInstantiationProgress.push(t);let o=new i("INSTANTIATE",[e,r]);return await this.postTask(o)}async getVersion(){let e=new i("GET_VERSION",null);return await this.postTask(e)}async getFeatureFlags(){let e=new i("GET_FEATURE_FLAGS",null);return await this.postTask(e)}async open(e){let r=new i("OPEN",e);await this.postTask(r)}async tokenize(e){let r=new i("TOKENIZE",e);return await this.postTask(r)}async connectInternal(){let e=new i("CONNECT",null);return await this.postTask(e)}async connect(){let e=await this.connectInternal();return new p(this,e)}async disconnect(e){let r=new i("DISCONNECT",e);await this.postTask(r)}async runQuery(e,r){let t=new i("RUN_QUERY",[e,r]);return await this.postTask(t)}async startPendingQuery(e,r){let t=new i("START_PENDING_QUERY",[e,r]);return await this.postTask(t)}async pollPendingQuery(e){let r=new i("POLL_PENDING_QUERY",e);return await this.postTask(r)}async cancelPendingQuery(e){let r=new i("CANCEL_PENDING_QUERY",e);return await this.postTask(r)}async fetchQueryResults(e){let r=new i("FETCH_QUERY_RESULTS",e);return await this.postTask(r)}async getTableNames(e,r){let t=new i("GET_TABLE_NAMES",[e,r]);return await this.postTask(t)}async createPrepared(e,r){let t=new i("CREATE_PREPARED",[e,r]);return await this.postTask(t)}async closePrepared(e,r){let t=new i("CLOSE_PREPARED",[e,r]);await this.postTask(t)}async runPrepared(e,r,t){let o=new i("RUN_PREPARED",[e,r,t]);return await this.postTask(o)}async sendPrepared(e,r,t){let o=new i("SEND_PREPARED",[e,r,t]);return await this.postTask(o)}async globFiles(e){let r=new i("GLOB_FILE_INFOS",e);return await this.postTask(r)}async registerFileText(e,r){let t=se.encode(r);await this.registerFileBuffer(e,t)}async registerFileURL(e,r,t,o){r===void 0&&(r=e);let c=new i("REGISTER_FILE_URL",[e,r,t,o]);await this.postTask(c)}async registerEmptyFileBuffer(e){let r=new i("REGISTER_FILE_BUFFER",[e,new Uint8Array]);await this.postTask(r)}async registerFileBuffer(e,r){let t=new i("REGISTER_FILE_BUFFER",[e,r]);await this.postTask(t,[r.buffer])}async registerFileHandle(e,r,t,o){let c=new i("REGISTER_FILE_HANDLE",[e,r,t,o]);await this.postTask(c,[])}async collectFileStatistics(e,r){let t=new i("COLLECT_FILE_STATISTICS",[e,r]);await this.postTask(t,[])}async exportFileStatistics(e){let r=new i("EXPORT_FILE_STATISTICS",e);return await this.postTask(r,[])}async copyFileToBuffer(e){let r=new i("COPY_FILE_TO_BUFFER",e);return await this.postTask(r)}async copyFileToPath(e,r){let t=new i("COPY_FILE_TO_PATH",[e,r]);await this.postTask(t)}async insertArrowFromIPCStream(e,r,t){if(r.length==0)return;let o=new i("INSERT_ARROW_FROM_IPC_STREAM",[e,r,t]);await this.postTask(o,[r.buffer])}async insertCSVFromPath(e,r,t){if(t.columns!==void 0){let c=[];for(let n in t.columns){let b=t.columns[n];c.push(R(n,b))}t.columnsFlat=c,delete t.columns}let o=new i("IMPORT_CSV_FROM_PATH",[e,r,t]);await this.postTask(o)}async insertJSONFromPath(e,r,t){if(t.columns!==void 0){let c=[];for(let n in t.columns){let b=t.columns[n];c.push(R(n,b))}t.columnsFlat=c,delete t.columns}let o=new i("IMPORT_JSON_FROM_PATH",[e,r,t]);await this.postTask(o)}};var O=class{constructor(){this._bindings=null;this._nextMessageId=0}log(e){this.postMessage({messageId:this._nextMessageId++,requestId:0,type:"LOG",data:e},[])}sendOK(e){this.postMessage({messageId:this._nextMessageId++,requestId:e.messageId,type:"OK",data:null},[])}failWith(e,r){let t={name:r.name,message:r.message,stack:r.stack||void 0};this.postMessage({messageId:this._nextMessageId++,requestId:e.messageId,type:"ERROR",data:t},[])}async onMessage(e){switch(e.type){case"PING":this.sendOK(e);return;case"INSTANTIATE":this._bindings!=null&&this.failWith(e,new Error("duckdb already initialized"));try{this._bindings=await this.instantiate(e.data[0],e.data[1],r=>{this.postMessage({messageId:this._nextMessageId++,requestId:e.messageId,type:"INSTANTIATE_PROGRESS",data:r},[])}),this.sendOK(e)}catch(r){this._bindings=null,this.failWith(e,r)}return;default:break}if(!this._bindings)return this.failWith(e,new Error("duckdb is not initialized"));try{switch(e.type){case"GET_VERSION":this.postMessage({messageId:this._nextMessageId++,requestId:e.messageId,type:"VERSION_STRING",data:this._bindings.getVersion()},[]);break;case"GET_FEATURE_FLAGS":this.postMessage({messageId:this._nextMessageId++,requestId:e.messageId,type:"FEATURE_FLAGS",data:this._bindings.getFeatureFlags()},[]);break;case"RESET":this._bindings.reset(),this.sendOK(e);break;case"OPEN":this._bindings.open(e.data),this.sendOK(e);break;case"DROP_FILE":this._bindings.dropFile(e.data),this.sendOK(e);break;case"DROP_FILES":this._bindings.dropFiles(),this.sendOK(e);break;case"FLUSH_FILES":this._bindings.flushFiles(),this.sendOK(e);break;case"CONNECT":{let r=this._bindings.connect();this.postMessage({messageId:this._nextMessageId++,requestId:e.messageId,type:"CONNECTION_INFO",data:r.useUnsafe((t,o)=>o)},[]);break}case"DISCONNECT":this._bindings.disconnect(e.data),this.sendOK(e);break;case"CREATE_PREPARED":{let r=this._bindings.createPrepared(e.data[0],e.data[1]);this.postMessage({messageId:this._nextMessageId++,requestId:e.messageId,type:"PREPARED_STATEMENT_ID",data:r},[]);break}case"CLOSE_PREPARED":{this._bindings.closePrepared(e.data[0],e.data[1]),this.sendOK(e);break}case"RUN_PREPARED":{let r=this._bindings.runPrepared(e.data[0],e.data[1],e.data[2]);this.postMessage({messageId:this._nextMessageId++,requestId:e.messageId,type:"QUERY_RESULT",data:r},[r.buffer]);break}case"RUN_QUERY":{let r=this._bindings.runQuery(e.data[0],e.data[1]);this.postMessage({messageId:this._nextMessageId++,requestId:e.messageId,type:"QUERY_RESULT",data:r},[r.buffer]);break}case"SEND_PREPARED":{let r=this._bindings.sendPrepared(e.data[0],e.data[1],e.data[2]);this.postMessage({messageId:this._nextMessageId++,requestId:e.messageId,type:"QUERY_RESULT_HEADER",data:r},[r.buffer]);break}case"START_PENDING_QUERY":{let r=this._bindings.startPendingQuery(e.data[0],e.data[1]),t=[];r&&t.push(r.buffer),this.postMessage({messageId:this._nextMessageId++,requestId:e.messageId,type:"QUERY_RESULT_HEADER_OR_NULL",data:r},t);break}case"POLL_PENDING_QUERY":{let r=this._bindings.pollPendingQuery(e.data),t=[];r&&t.push(r.buffer),this.postMessage({messageId:this._nextMessageId++,requestId:e.messageId,type:"QUERY_RESULT_HEADER_OR_NULL",data:r},t);break}case"CANCEL_PENDING_QUERY":{let r=this._bindings.cancelPendingQuery(e.data);this.postMessage({messageId:this._nextMessageId++,requestId:e.messageId,type:"SUCCESS",data:r},[]);break}case"FETCH_QUERY_RESULTS":{let r=this._bindings.fetchQueryResults(e.data);this.postMessage({messageId:this._nextMessageId++,requestId:e.messageId,type:"QUERY_RESULT_CHUNK",data:r},[r.buffer]);break}case"GET_TABLE_NAMES":{let r=this._bindings.getTableNames(e.data[0],e.data[1]);this.postMessage({messageId:this._nextMessageId++,requestId:e.messageId,type:"TABLE_NAMES",data:r},[]);break}case"GLOB_FILE_INFOS":{let r=this._bindings.globFiles(e.data);this.postMessage({messageId:this._nextMessageId++,requestId:e.messageId,type:"FILE_INFOS",data:r},[]);break}case"REGISTER_FILE_URL":this._bindings.registerFileURL(e.data[0],e.data[1],e.data[2],e.data[3]),this.sendOK(e);break;case"REGISTER_FILE_BUFFER":this._bindings.registerFileBuffer(e.data[0],e.data[1]),this.sendOK(e);break;case"REGISTER_FILE_HANDLE":this._bindings.registerFileHandle(e.data[0],e.data[1],e.data[2],e.data[3]),this.sendOK(e);break;case"COPY_FILE_TO_PATH":this._bindings.copyFileToPath(e.data[0],e.data[1]),this.sendOK(e);break;case"COPY_FILE_TO_BUFFER":{let r=this._bindings.copyFileToBuffer(e.data);this.postMessage({messageId:this._nextMessageId++,requestId:e.messageId,type:"FILE_BUFFER",data:r},[]);break}case"COLLECT_FILE_STATISTICS":this._bindings.collectFileStatistics(e.data[0],e.data[1]),this.sendOK(e);break;case"EXPORT_FILE_STATISTICS":{this.postMessage({messageId:this._nextMessageId++,requestId:e.messageId,type:"FILE_STATISTICS",data:this._bindings.exportFileStatistics(e.data)},[]);break}case"INSERT_ARROW_FROM_IPC_STREAM":{this._bindings.insertArrowFromIPCStream(e.data[0],e.data[1],e.data[2]),this.sendOK(e);break}case"IMPORT_CSV_FROM_PATH":{this._bindings.insertCSVFromPath(e.data[0],e.data[1],e.data[2]),this.sendOK(e);break}case"IMPORT_JSON_FROM_PATH":{this._bindings.insertJSONFromPath(e.data[0],e.data[1],e.data[2]),this.sendOK(e);break}case"TOKENIZE":{let r=this._bindings.tokenize(e.data);this.postMessage({messageId:this._nextMessageId++,requestId:e.messageId,type:"SCRIPT_TOKENS",data:r},[]);break}}}catch(r){return this.failWith(e,r)}}};var F=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,3,1,0,1,10,14,1,12,0,65,0,65,0,65,0,252,10,0,0,11])),f=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11]));var U=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11]));var C=()=>(async s=>{try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(s)}catch(e){return!1}})(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]));var T={name:"@duckdb/duckdb-wasm",version:"1.11.0",description:"DuckDB powered by WebAssembly",license:"MIT",repository:{type:"git",url:"https://github.com/duckdb/duckdb-wasm.git"},keywords:["sql","duckdb","relational","database","data","query","wasm","analytics","olap","arrow","parquet","json","csv"],dependencies:{"apache-arrow":"^11.0.0"},devDependencies:{"@types/emscripten":"^1.39.6","@types/jasmine":"^4.3.1","@typescript-eslint/eslint-plugin":"^5.53.0","@typescript-eslint/parser":"^5.49.0",esbuild:"^0.15.12",eslint:"^8.34.0","eslint-plugin-jasmine":"^4.1.3","eslint-plugin-react":"^7.32.2","fast-glob":"^3.2.12",jasmine:"^4.5.0","jasmine-core":"^4.3.0","jasmine-spec-reporter":"^7.0.0","js-sha256":"^0.9.0",karma:"^6.4.1","karma-chrome-launcher":"^3.1.1","karma-coverage":"^2.2.0","karma-firefox-launcher":"^2.1.2","karma-jasmine":"^5.1.0","karma-jasmine-html-reporter":"^2.0.0","karma-sourcemap-loader":"^0.3.8","karma-spec-reporter":"^0.0.36","make-dir":"^3.1.0",nyc:"^15.1.0",prettier:"^2.8.4",puppeteer:"^19.7.2",rimraf:"^4.1.2",s3rver:"^3.7.1",typedoc:"^0.23.25",typescript:"^4.8.4","wasm-feature-detect":"^1.4.0","web-worker":"^1.2.0"},scripts:{"build:debug":"node bundle.mjs debug && tsc --emitDeclarationOnly","build:release":"node bundle.mjs release && tsc --emitDeclarationOnly",docs:"typedoc",report:"node ./coverage.mjs","test:node":"node --enable-source-maps --experimental-wasm-eh ../../node_modules/jasmine/bin/jasmine ./dist/tests-node.cjs","test:node:debug":"node --inspect-brk --enable-source-maps --experimental-wasm-eh ../../node_modules/jasmine/bin/jasmine ./dist/tests-node.cjs","test:node:coverage":"nyc -r json --report-dir ./coverage/node node --experimental-wasm-eh ../../node_modules/jasmine/bin/jasmine ./dist/tests-node.cjs","test:firefox":"karma start ./karma/tests-firefox.cjs","test:chrome":"karma start ./karma/tests-chrome.cjs","test:chrome:eh":"karma start ./karma/tests-chrome-eh.cjs","test:chrome:coverage":"karma start ./karma/tests-chrome-coverage.cjs","test:browser":"karma start ./karma/tests-all.cjs","test:browser:debug":"karma start ./karma/tests-debug.cjs",test:"npm run test:chrome && npm run test:node","test:coverage":"npm run test:chrome:coverage && npm run test:node:coverage && npm run report",lint:"eslint src test"},files:["dist","!dist/types/test"],main:"dist/duckdb-browser.cjs",module:"dist/duckdb-browser.mjs",types:"dist/duckdb-browser.d.ts",jsdelivr:"dist/duckdb-browser.cjs",unpkg:"dist/duckdb-browser.mjs",sideEffects:!1,browser:{fs:!1,path:!1,perf_hooks:!1,os:!1,worker_threads:!1},exports:{"./dist/duckdb-mvp.wasm":"./dist/duckdb-mvp.wasm","./dist/duckdb-eh.wasm":"./dist/duckdb-eh.wasm","./dist/duckdb-coi.wasm":"./dist/duckdb-coi.wasm","./dist/duckdb-browser":"./dist/duckdb-browser.mjs","./dist/duckdb-browser.cjs":"./dist/duckdb-browser.cjs","./dist/duckdb-browser.mjs":"./dist/duckdb-browser.mjs","./dist/duckdb-browser-blocking":"./dist/duckdb-browser-blocking.mjs","./dist/duckdb-browser-blocking.mjs":"./dist/duckdb-browser-blocking.mjs","./dist/duckdb-browser-blocking.cjs":"./dist/duckdb-browser-blocking.cjs","./dist/duckdb-browser-coi.pthread.worker.js":"./dist/duckdb-browser-coi.pthread.worker.js","./dist/duckdb-browser-coi.worker.js":"./dist/duckdb-browser-coi.worker.js","./dist/duckdb-browser-eh.worker.js":"./dist/duckdb-browser-eh.worker.js","./dist/duckdb-browser-mvp.worker.js":"./dist/duckdb-browser-mvp.worker.js","./dist/duckdb-node":"./dist/duckdb-node.cjs","./dist/duckdb-node.cjs":"./dist/duckdb-node.cjs","./dist/duckdb-node-blocking":"./dist/duckdb-node-blocking.cjs","./dist/duckdb-node-blocking.cjs":"./dist/duckdb-node-blocking.cjs","./dist/duckdb-node-eh.worker.cjs":"./dist/duckdb-node-eh.worker.cjs","./dist/duckdb-node-mvp.worker.cjs":"./dist/duckdb-node-mvp.worker.cjs","./blocking":{browser:{types:"./dist/duckdb-browser-blocking.d.ts",import:"./dist/duckdb-browser-blocking.mjs",require:"./dist/duckdb-browser-blocking.cjs"},node:{types:"./dist/duckdb-node-blocking.d.ts",require:"./dist/duckdb-node-blocking.cjs",import:"./dist/duckdb-node-blocking.cjs"},types:"./dist/duckdb-browser-blocking.d.ts",import:"./dist/duckdb-browser-blocking.mjs",require:"./dist/duckdb-browser-blocking.cjs"},".":{browser:{types:"./dist/duckdb-browser.d.ts",import:"./dist/duckdb-browser.mjs",require:"./dist/duckdb-browser.cjs"},node:{types:"./dist/duckdb-node.d.ts",import:"./dist/duckdb-node.cjs",require:"./dist/duckdb-node.cjs"},types:"./dist/duckdb-browser.d.ts",import:"./dist/duckdb-browser.mjs",require:"./dist/duckdb-browser.cjs"}}};var W=T.name,v=T.version,I=T.version.split("."),we=I[0],De=I[1],Oe=I[2];var M=()=>typeof navigator>"u",B=()=>M()?"node":navigator.userAgent,Ue=()=>B().includes("Firefox"),Ce=()=>/^((?!chrome|android).)*safari/i.test(B());function We(){let s=`https://cdn.jsdelivr.net/npm/${W}@${v}/dist/`;return{mvp:{mainModule:`${s}duckdb-mvp.wasm`,mainWorker:`${s}duckdb-browser-mvp.worker.js`},eh:{mainModule:`${s}duckdb-eh.wasm`,mainWorker:`${s}duckdb-browser-eh.worker.js`},coi:{mainModule:`${s}duckdb-coi.wasm`,mainWorker:`${s}duckdb-browser-coi.worker.js`,pthreadWorker:`${s}duckdb-browser-coi.pthread.worker.js`}}}var y=null,g=null,E=null,S=null,h=null;async function ie(){return y==null&&(y=typeof BigInt64Array<"u"),g==null&&(g=await f()),E==null&&(E=await C(),E=!E),S==null&&(S=await U()),h==null&&(h=await F()),{bigInt64Array:y,crossOriginIsolated:M()||globalThis.crossOriginIsolated||!1,wasmExceptions:g,wasmSIMD:S,wasmThreads:E,wasmBulkMemory:h}}async function ve(s){if((await ie()).wasmExceptions){if(s.coi)return{mainModule:s.coi.mainModule,mainWorker:s.coi.mainWorker,pthreadWorker:s.coi.pthreadWorker};if(s.eh)return{mainModule:s.eh.mainModule,mainWorker:s.eh.mainWorker,pthreadWorker:null}}return{mainModule:s.mvp.mainModule,mainWorker:s.mvp.mainWorker,pthreadWorker:null}}var Q=$(x());async function Ge(s){let e=new Request(s),r=await fetch(e),t=URL.createObjectURL(await r.blob());return new Q.default(t)}function ae(){let s=new TextDecoder;return e=>(typeof SharedArrayBuffer<"u"&&e.buffer instanceof SharedArrayBuffer&&(e=new Uint8Array(e)),s.decode(e))}var Qe=ae();var q=(n=>(n[n.BUFFER=0]="BUFFER",n[n.NODE_FS=1]="NODE_FS",n[n.BROWSER_FILEREADER=2]="BROWSER_FILEREADER",n[n.BROWSER_FSACCESS=3]="BROWSER_FSACCESS",n[n.HTTP=4]="HTTP",n[n.S3=5]="S3",n))(q||{});export{D as AsyncDuckDB,p as AsyncDuckDBConnection,O as AsyncDuckDBDispatcher,k as AsyncPreparedStatement,_ as AsyncResultStreamIterator,L as ConsoleLogger,q as DuckDBDataProtocol,ee as LogEvent,Z as LogLevel,re as LogOrigin,X as LogTopic,W as PACKAGE_NAME,v as PACKAGE_VERSION,we as PACKAGE_VERSION_MAJOR,De as PACKAGE_VERSION_MINOR,Oe as PACKAGE_VERSION_PATCH,te as StatusCode,A as VoidLogger,P as WorkerRequestType,w as WorkerResponseType,i as WorkerTask,Ge as createWorker,We as getJsDelivrBundles,ue as getLogEventLabel,ce as getLogLevelLabel,Ee as getLogOriginLabel,le as getLogTopicLabel,ie as getPlatformFeatures,Ue as isFirefox,M as isNode,Ce as isSafari,ve as selectBundle};
