![image](https://github.com/billettg/npmhome/assets/3407237/b260331a-7023-4003-8ca8-b3d4f841c979)

## Info

Enumerates all Nginx Proxy Manager proxy hosts using the NPM API, and renders them as clickable links, with optional information on forwarding.

## Instructions

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

## Docker run

Run Docker command to create the container:

```docker run -d --name npmhome -v /path/to/your/config.json:/app/config.json -p 1234:1234 billettg/npmhome```

## Docker compose

Add this to your docker-compose.yml:

```
services:
    npmhome:
        image: billettg/npmhome
        container_name: npmhome
        volumes:
            - /path/to/your/config.json:/app/config.json
        ports:
            - 1234:1234
        restart: unless-stopped
```

Run the container with ```docker-compose up -d```

## Testing

You can also git clone this project and start the http-server for testing:

```
mkdir npmhome
cd npmhome
git clone https://github.com/billettg/npmhome.git
npx http-server -p <your port>
```

This project is open source, feel free to fork it and amend it as you choose.

## Bugs and other info

The project is not thoroughly tested, use it at your own risk.

Note that the dark mode toggle is not yet implemented.

I do plan to add some additional functionality, redundancy, and security improvements in future. Feel free to submit any issues but as I work on these projects in my spare time, I may not respond quickly.
