server {
    listen 80;
    server_name blog.lemontu.com;
    
    access_log /var/log/nginx/blog.lemontu.com.access.log;
    error_log /var/log/nginx/blog.lemontu.com.error.log;
    
    location ~ /(auth|logout|api) {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass http://127.0.0.1:3000/;
        proxy_redirect off;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_redirect off;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache one;
        proxy_cache_key sfs$request_uri$scheme;
    }
    
    location / {
        alias /Users/canice/workspace/blog/web/dist/;
        autoindex off;
    }
}
