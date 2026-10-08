const fs = require('fs');
let content = fs.readFileSync('contact.html', 'utf8');

const regex = /\} else \{\s*if \(errorAlert\) \{\s*errorAlert\.classList\.add\('hidden'\);\s*\}\s*if \(successAlert\) \{\s*successAlert\.classList\.remove\('hidden'\);\s*successAlert\.scrollIntoView\(\{ behavior: 'smooth', block: 'nearest' \}\);\s*\}\s*form\.reset\(\);\s*fields\.forEach\(f => \{\s*if \(!f\.isCheckbox\) f\.el\.classList\.remove\('input-invalid'\);\s*if \(f\.errorEl\) f\.errorEl\.classList\.add\('hidden'\);\s*\}\);\s*\}/;

const replacement = `} else {
            window.location.href = '404.html';
          }`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync('contact.html', content, 'utf8');
    console.log('Successfully replaced logic!');
} else {
    console.log('Regex did not match.');
}
