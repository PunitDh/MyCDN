$(document).ready((()=>{const t=$("flex"),e=$("fetch"),c=$("data").toAttributesObject(),a=/{{([^}]+)}}/g,o=$(document.body).html().match(a);if(t.flex().flexDirection(t.getAttribute("direction")).justifyContent(t.getAttribute("justify-content")).alignItems(t.getAttribute("align-items")),e.length){const t=e.getAttribute("src").first(),r=e.html().match(a);$.get(t,{},(function(t){if(t instanceof Array){const e=r.map((t=>t.replace(/{{|}}/g,""))),c=$("fetch [map]");let a="";t.forEach((t=>{const o={};e.forEach((e=>{o[e]=t[e]}));const r=c.outerHTML().map((t=>(o.keys().map((e=>{t=t.replace(`{{${e}}}`,o[e])})),t)));a+=r.join("")})),c.outerHTML(a)}else{const c={};r.forEach((e=>{const a=e.replace(/{{|}}/g,"");c[a]=t[a]})),r.forEach((t=>{e.html(e.html().replace(t,c[t.replace(/{{|}}/g,"")]))}))}})).always((()=>{$("body").replaceHTML(o,c)}))}else $("body").replaceHTML(o,c)}));