const fs = require('fs'); 
const html = fs.readFileSync('admin_dashboard.html', 'utf8'); 
const views = ['view-overview', 'view-orders', 'view-customers', 'view-inventory', 'view-settings']; 
for (let i = 0; i < views.length; i++) { 
    const start = html.indexOf('id="' + views[i] + '"'); 
    let end = html.length; 
    if (i < views.length - 1) { 
        end = html.indexOf('id="' + views[i+1] + '"'); 
    } else { 
        end = html.indexOf('</main>'); 
    } 
    const slice = html.substring(start, end); 
    const opens = (slice.match(/<div/g) || []).length; 
    const closes = (slice.match(/<\/div>/g) || []).length; 
    console.log(views[i], 'open:', opens, 'close:', closes, 'diff:', opens - closes); 
}
