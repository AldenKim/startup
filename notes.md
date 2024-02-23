## Notes Part 1
This is the link for the [startup README file](https://github.com/AldenKim/startup/blob/main/README.md)

The assignment given today was **extremely** helpful in learning how to push, pull, and commit changes using my development environment and helping me begin thinking about my startup website.

## EC2 Assignment
- Created a webserver (EC2)
- Assigned it an elastic IP
- URL: http://44.221.183.152/
- SSHed into the server
- ssh -i pemkey ubuntu@44.221.183.152

## Domain name, HTTPS, TLS, Certificate
- Created and leased a Domain name through AWS (Renew lease online) using the Route 53 service
- Changed the Caddyfile to use this new domain name and use HTTPS
- New URL is now https://mymovierecommendations.click/

## HTML Structure
- Learned about the basic structural elements of HTML
- Learned about adding hyperlinks <a> </a>
- HTML tables
- HTML lists
- Adding images to HTML

## HTML input
- Learned about different input types
- Learned about how to set up different input types
- Changed and added input types

## HTML media
- Adding images
- Adding Audio
- Adding video
- SVG and Canvas formatting

## HTML startup
- Deployed HTML Simon with my domain's `simon` subdomain (https://simon.mymovierecommendations.click/)
- Added basic structure to index.html page
- Added links to other pages for my startup
- Formatting with HTML (breaks, hr /)
- Inputs with HTML (buttons, checkboxes, radio buttons)
- Links to other websites
- Adding images
- Adding text

## Midterm Notes
- The CSS property padding: Puts space around the content of selected elements
- In HTML what does <div> do: Creates a division element
- What is the order of the CSS box model, starting from outside going in: Margin, Border, padding, content
- Document.queryselector('P').addEventListener('mouseover', console.log); Adds a mouseover event listener to a p element
- HTML tag for an unordered list: <ul>
- Not valid JavaScript function: function f(x) = {}
- Not a valid way to include JavaScript in HTML: <javascript> 1+1 </javascript>
- Valid JavaScript object: { n:1 }
- Valid JSON: {"x":3}
- What does the DOM textContent property do?: Sets the child text for an element
- HTML hyperlink: <a href = 'httpsblah'>x</a>
- Console command makes a script executable: chmod +x deploy.sh
- DNS sub domain: cs260.cs.byu.edu
- To point to another DNS record, you should use the following DNS record type: CNAME
