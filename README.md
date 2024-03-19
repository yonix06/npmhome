![image](https://github.com/billettg/npmhome/assets/3407237/b260331a-7023-4003-8ca8-b3d4f841c979)

Enumerates all Nginx Proxy Manager proxy hosts using the NPM API, and renders them as clickable links, with optional information on forwarding.

Create a config.json file with the following content:

```
{
    "server": {
        "host" : "192.168.0.254",
        "port" : 81,
        "email" : "admin@example.com", 
        "password" : "password"
    },
    "appearance": {
        "showforwarding": false,
        "showdisabled": false,
        "showheader": true,
        "showfooter": true,
        "darkmode": true
    }
}
```

Run Docker command to create the container:

```docker run -d --name npmhome -v /path/to/your/config.json:/app/config.json -p 1234:1234 npmhome```

Profit.
