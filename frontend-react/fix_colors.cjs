const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/sushb/OneDrive/Pictures/ドキュメント/AI-Campus-Placement-Copilot/frontend-react/src/components';
const files = ['Dashboard.jsx', 'SkillChips.jsx', 'ResumeOptimizer.jsx', 'MockInterview.jsx'];

const replacements = [
  { from: /#f8fafc/g, to: '#0f172a' },
  { from: /#00f0ff/g, to: '#7c3aed' },
  { from: /rgba\(255,\s*255,\s*255,\s*0\.6\)/g, to: 'rgba(15, 23, 42, 0.6)' },
  { from: /rgba\(255,255,255,0\.9\)/g, to: 'rgba(15, 23, 42, 0.9)' },
  { from: /rgba\(255,255,255,0\.1\)/g, to: 'rgba(15, 23, 42, 0.1)' },
  { from: /rgba\(255,255,255,0\.2\)/g, to: 'rgba(15, 23, 42, 0.2)' },
  { from: /rgba\(0,\s*212,\s*255,\s*0\.2\)/g, to: 'rgba(124, 58, 237, 0.2)' },
  { from: /rgba\(0,\s*212,\s*255,\s*0\.3\)/g, to: 'rgba(124, 58, 237, 0.3)' },
  { from: /rgba\(0,\s*212,\s*255,\s*0\.08\)/g, to: 'rgba(124, 58, 237, 0.08)' },
  { from: /rgba\(0,\s*212,\s*255,\s*0\.1\)/g, to: 'rgba(124, 58, 237, 0.1)' },
  { from: /rgba\(0,\s*240,\s*255,\s*0\.03\)/g, to: 'rgba(124, 58, 237, 0.03)' },
  { from: /#f1f5f9/g, to: '#1e293b' },
  { from: /#e2e8f0/g, to: '#334155' },
  { from: /rgba\(3,\s*7,\s*18,\s*0\.6\)/g, to: 'rgba(241, 245, 249, 0.6)' },
  { from: /rgba\(3,\s*7,\s*18,\s*0\.7\)/g, to: 'rgba(241, 245, 249, 0.7)' },
  { from: /rgba\(11,\s*19,\s*38,\s*0\.7\)/g, to: 'rgba(248, 250, 252, 0.7)' },
  { from: /#00d2ff/g, to: '#7c3aed' },
  { from: /#030712/g, to: '#ffffff' }
];

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  for (const { from, to } of replacements) {
    content = content.replace(from, to);
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
}
