'use strict';
const { site } = require('./config');
function breadcrumbList(items){
  return {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:(items||[]).map((it,i)=>({'@type':'ListItem',position:i+1,name:it.label,item:site.url+(it.href||'')}))};
}
function medicalClinic(){ return {'@context':'https://schema.org','@type':'MedicalClinic',name:site.brand,url:site.url+'/'}; }
function physician(slug){ return {'@context':'https://schema.org','@type':'Physician',name:'Dr. Vikas Singh',medicalSpecialty:'PlasticSurgery',url:site.url+'/surgeons/'+slug+'/'}; }
function medicalWebPage(d){ return {'@context':'https://schema.org','@type':'MedicalWebPage',name:d.title,description:d.description,url:site.url+d.url}; }
function articleSchema(d){ return {'@context':'https://schema.org','@type':'Article',headline:d.title,description:d.description,url:site.url+d.url,author:{'@type':'Organization',name:site.brand},publisher:{'@type':'Organization',name:site.brand}}; }
function faqPage(faqs){ return {'@context':'https://schema.org','@type':'FAQPage',mainEntity:(faqs||[]).map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}}))}; }
function webSite(){ return {'@context':'https://schema.org','@type':'WebSite',name:site.brand,url:site.url+'/'}; }
module.exports = { breadcrumbList, medicalClinic, physician, medicalWebPage, articleSchema, faqPage, webSite };
