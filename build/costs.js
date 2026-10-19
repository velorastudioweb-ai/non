'use strict';
const costs = {
  in: { range:'₹1,80,000 – ₹4,50,000', components:[['Surgeon','₹60k–₹150k',''],['Implants','₹60k–₹140k',''],['Facility','₹40k–₹100k','']], factors:['City','Implant brand','Technique'], faq:[{q:'Does insurance cover?',a:'Cosmetic augmentation is usually not covered.'}] },
  uae: { range:'AED 25,000 – AED 45,000', components:[['Surgeon','AED 10k–18k',''],['Implants','AED 8k–14k','']], factors:['Emirate','Facility'], faq:[{q:'Can visitors have surgery?',a:'Yes, with 7 nights stay plan.'}] },
  uk: { range:'£6,000 – £9,500', components:[['Surgeon','£2.5k–4k',''],['Implants','£1.5k–2.5k','']], factors:['London vs regional','Consultant grade'], faq:[{q:'Is NHS available?',a:'Only in restricted clinical circumstances.'}] }
};
module.exports = { costs };
