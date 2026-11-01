const fs = require('fs'), vm = require('vm'), assert = require('assert'), cp = require('child_process'), path = require('path');
const launch = fs.readFileSync('g2all/bfr-launch.js','utf8'), ui = fs.readFileSync('g2all/bfr-ui.js','utf8');
new vm.Script(launch); new vm.Script(ui);
function run(ua, status, auto) {
 const ids = {};
 for (const id of ['firmware','offline','start','auto','goldhen','panel','message','msgs','state','detail','settings-button','settings','preference']) ids[id] = {textContent:'',className:'',disabled:false,setAttribute(){},click(){if (!this.disabled) this.onclick();}};
 const scripts = [], redirects = [], callbacks = [];
 const context = {navigator:{userAgent:ua},document:{getElementById:id=>ids[id],createElement:()=>({}),head:{appendChild:s=>scripts.push(s)}},localStorage:{getItem:()=>auto||null,setItem(){}},setInterval:fn=>{callbacks.push(fn);return 1;},clearInterval(){},setTimeout:fn=>fn()};
 context.window = context; context.location={replace:p=>redirects.push(p)};
 if(status !== null) context.applicationCache={status,addEventListener(){}};
 vm.createContext(context);vm.runInContext(launch,context);vm.runInContext(ui,context);
 return {ids,scripts,redirects,callbacks};
}
let t=run('Mozilla/5.0 (PlayStation 4/12.00)',1);
assert.equal(t.scripts.length,0);assert.equal(t.ids.auto.checked,false);
t.ids.start.click();t.ids.start.click();assert.equal(t.scripts.length,1);assert.equal(t.scripts[0].src,'slopkit/chain_lapse.js');assert.equal(t.scripts[0].type,'module');
t.ids.msgs.textContent='GoldHEN v2.4b18.12 Loaded ...';t.callbacks[0]();assert.equal(t.ids.panel.className,'panel success');
t=run('PlayStation 4/12.00',0);t.ids.start.click();assert.deepEqual(t.redirects,['cacheslopkit.html']);
t=run('PlayStation 4/12.00',1,'1');assert.equal(t.scripts.length,1);
t=run('PlayStation 4/12.00',1);t.ids.start.click();t.ids.msgs.textContent='Failed to Load! Restart Your Console ...';t.callbacks[0]();assert.equal(t.ids.panel.className,'panel warning');assert(t.ids.message.textContent.includes('Tarayıcıyı kapatıp yeniden açın'));
for(const args of [['desktop',null],['PlayStation 4/12.00',null],['PlayStation 4/6.72',1]]) {t=run(...args);assert.equal(t.ids.start.disabled,true);assert.equal(t.scripts.length,0);}
let checked=0;
for(const name of ['505','700','900','css','slopkit']) {
 const manifest=fs.readFileSync('g2all/'+name+'.manifest','utf8');
 const entries=manifest.split('CACHE:')[1].split('NETWORK:')[0].split(/\r?\n/).map(x=>x.trim()).filter(x=>x && !x.startsWith('#'));
 for(const entry of entries){assert(fs.existsSync(path.resolve('g2all',entry.split('?')[0])),entry);checked++;}
 for(const asset of ['bfr.css','bfr-ui.js','bfr-launch.js','index.html']) assert(entries.includes(asset));
}
const changed=cp.execFileSync('git',['diff','--name-only','bfr-original-backup'],{encoding:'utf8'}).trim().split(/\r?\n/);
assert(!changed.some(x=> /\.(bin|elf)$/.test(x)||/^g2all\/(slopkit|505|700|900|css)\//.test(x)), 'Protected exploit or payload changed');
console.log('PASS: UI syntax; manual start; 12.00 module route; duplicate click; default auto off; opt-in auto; cache redirect; success/error evidence; desktop/missing AppCache/unsupported guards; '+checked+' manifest paths; protected tracked files unchanged.');
