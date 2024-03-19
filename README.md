![image](https://github.com/billettg/npmhome/assets/3407237/b260331a-7023-4003-8ca8-b3d4f841c979)

## Info

Automagically create a home page for your NPM proxy hosts!

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
git clone https://github.com/billettg/npmhome.git
cd npmhome
npx http-server -p <your port>
```

## Disclaimer

This project is provided free and open source.

No warranty is supplied and I cannot guarantee support.

There may be bugs and other issues, as I have not tested the code extensively, if you come accross anything please log an issue [here](https://github.com/billettg/npmhome/issues).

## Support

<a href="https://www.buymeacoffee.com/billettg" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-violet.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
