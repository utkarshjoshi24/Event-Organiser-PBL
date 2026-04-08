const fs = require('fs');
const path = require('path');

const dirs = [
  'add_club_or_event',
  'club_dashboard',
  'home_club_overview'
];

const basePath = path.join(__dirname, 'stitch');
const outPath = path.join(__dirname, 'src', 'pages');

if (!fs.existsSync(outPath)) {
  fs.mkdirSync(outPath, { recursive: true });
}

dirs.forEach(dir => {
  const htmlPath = path.join(basePath, dir, 'code.html');
  if (fs.existsSync(htmlPath)) {
    let content = fs.readFileSync(htmlPath, 'utf8');
    
    // Extract the body content
    const match = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    let bodyContent = match ? match[1] : content;
    
    // Simple HTML to JSX conversions
    bodyContent = bodyContent.replace(/class="/g, 'className="');
    bodyContent = bodyContent.replace(/for="/g, 'htmlFor="');
    
    // Convert style="font-variation-settings: 'FILL' 1;" to style={{ fontVariationSettings: "'FILL' 1" }}
    bodyContent = bodyContent.replace(/style="([^"]+)"/g, (match, styles) => {
      const parts = styles.split(';').filter(Boolean);
      const styleObj = {};
      parts.forEach(p => {
        const [k, v] = p.split(':').map(s => s.trim());
        if (!k || !v) return;
        const camelCase = k.replace(/-([a-z])/g, g => g[1].toUpperCase());
        styleObj[camelCase] = v.replace(/'/g, '"');
      });
      if (Object.keys(styleObj).length === 0) return '';
      return `style={{ ${Object.entries(styleObj).map(([k,v]) => `${k}: '${v.replace(/"/g, '')}'`).join(', ')} }}`;
    });

    // Make sure all tags are closed nicely (<img>, <input>, <br>, <hr>)
    bodyContent = bodyContent.replace(/<img([^>]+[^\/])>/g, '<img$1 />');
    bodyContent = bodyContent.replace(/<input([^>]+[^\/])>/g, '<input$1 />');
    bodyContent = bodyContent.replace(/<br>/g, '<br />');
    bodyContent = bodyContent.replace(/<hr>/g, '<hr />');

    // Replace HTML comments
    bodyContent = bodyContent.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');

    // Convert links mapped to proper routers
    bodyContent = bodyContent.replace(/<a([^>]*)href="#"([^>]*)>([\s\S]*?)<\/a>/gi, (match, prefix, suffix, inner) => {
      let to = '#';
      const lowercaseInner = inner.toLowerCase();
      if (lowercaseInner.includes('dashboard') || lowercaseInner.includes('clubs') || lowercaseInner.includes('reports') || lowercaseInner.includes('analytics')) {
        to = '/dashboard';
      } else if (lowercaseInner.includes('home')) {
        to = '/';
      } else if (lowercaseInner.includes('events') || lowercaseInner.includes('schedule') || lowercaseInner.includes('attendees') || lowercaseInner.includes('forms')) {
        to = '/add';
      } else if (lowercaseInner.includes('logout')) {
        to = '/login';
      }
      return `<Link${prefix}to="${to}"${suffix}>${inner}</Link>`;
    });

    // Convert specific actionable buttons to React Router Links
    // Wait, some "buttons" are not matched if they have type=submit
    bodyContent = bodyContent.replace(/<button([^>]*)>([\s\S]*?)<\/button>/gi, (match, btnAttrs, inner) => {
      const lowercaseInner = inner.toLowerCase();
      let to = null;
      if (lowercaseInner.includes('add') || lowercaseInner.includes('new club') || lowercaseInner.includes('create new event') || lowercaseInner.includes('launch a new club') || lowercaseInner.includes('launch experience')) {
        to = '/add';
      } else if (lowercaseInner.includes('view analytics')) {
        to = '/dashboard';
      } else if (lowercaseInner.includes('logout')) {
        to = '/login';
      }
      
      if (to) {
        // change <button className="...">... to <Link to="..." className="...">...
        let newAttrs = btnAttrs.replace(/class=/g, 'className=');
        return `<Link to="${to}"${newAttrs}>${inner}</Link>`;
      }
      return match;
    });

    const compName = dir.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    
    let jsxObj = `import React from 'react';\nimport { Link } from 'react-router-dom';\n\nconst ${compName} = () => {\n  return (\n    <div className="bg-surface font-body text-on-surface min-h-screen">\n${bodyContent}\n    </div>\n  );\n};\n\nexport default ${compName};\n`;
    
    fs.writeFileSync(path.join(outPath, `${compName}.jsx`), jsxObj);
    console.log(`Created ${compName}.jsx`);
  }
});
