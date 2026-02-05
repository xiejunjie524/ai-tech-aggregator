const https=require("https"),fs=require("fs");
async function fetchRSS(url){return new Promise(r=>https.get(url,s=>{let d="";s.on("data",c=>d+=c);s.on("end",()=>r(d));}));}
(async()=>{
 const sites=[{u:"https://techcrunch.com/feed/",c:"ai",n:"TechCrunch"},{u:"https://wired.com/feed/rss",c:"ai",n:"Wired"}];
 let n=[],id=1;
 for(const s of sites){
  const d=await fetchRSS(s.u);
  const titles=d.match(/<title><!\[CDATA\[[\s\S]*?\]\]><\/title>/gi)||[];
  for(const t of titles.slice(2,7)){
   const m=t.replace(/<\/?title><!\[CDATA\[|\]\]><\/title>/g,"");
   if(m&&m!==s.n)n.push({id:id++,title:m,category:s.c,icon:"🤖",time:new Date().toLocaleString("zh-CN"),source:s.n,summary:"点击查看...",content:m,url:"#",date:new Date().toISOString().split("T")[0]});
  }
 }
 fs.writeFileSync("news.json",JSON.stringify({lastUpdate:new Date().toISOString(),news:n},null,2));
 console.log("Updated",n.length,"articles");
})();