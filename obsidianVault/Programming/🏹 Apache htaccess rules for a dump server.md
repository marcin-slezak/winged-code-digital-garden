Working with static pages generated from NextJs:

```
SecFilterEngine On
SecFilterScanPOST On
ErrorDocument 404 /404.html
<IfModule mod_rewrite.c>
	RewriteEngine On
	RewriteBase /
	RewriteCond %{REQUEST_FILENAME}\.html -f
	RewriteRule ^(.*)$ $1.html
</IfModule>
<IfModule mod_rewrite.c>
	RewriteEngine On
	RewriteCond %{HTTPS} off
	RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI} [R,L]
</IfModule>
```