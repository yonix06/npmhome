import config from './config.json' assert { type: 'json'};

const serverHost = config.settings.serverHost;
const serverPort = config.settings.serverPort;
const identity = config.settings.email;
const secret = config.settings.password;
var toggleDetailEnabled = false;
var data;

async function getToken() {
    try {
        const response = await fetch(`http://${serverHost}:${serverPort}/api/tokens`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identity: identity,
                secret: secret
            })
        });
        const data = await response.json();
        return data.token;
    } catch (error) {
        console.error(error);
        document.getElementById("serverInfo").innerHTML = `Unable to connect to server - check config.json and test communication to ${serverHost}:${serverPort}`;
        throw error;
    }
}

async function getProxyHosts() {
    try {
        const bearerToken = await getToken();
        const response = await fetch(`http://${serverHost}:${serverPort}/api/nginx/proxy-hosts`, {
            headers: {
                'Authorization': `Bearer ${bearerToken}`
            }
        });
        if (response.ok) {
            data = await response.json();
            render();
        } else {
            console.log('Error fetching proxy hosts:', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function render() {
    document.getElementById("main").innerHTML = "";
    data.forEach(host => {
        var fqdn = host.domain_names;
        var forwardHostPort = host.forward_host + ":" + host.forward_port;
        var hostname = fqdn.toString().split('.')[0];
        var domain = fqdn.toString().split(hostname)[1];
        var forwardScheme = host.forward_scheme;
        const div = document.createElement("div");
        div.innerHTML += `<span class="hostname"> ${hostname}</span><span class="domain">${domain}</span>`
        if (toggleDetailEnabled) div.innerHTML += `<span class="forwardHostPort"> >> ${forwardHostPort}</span></a>`;
        div.className = "host-container";
        document.getElementById("main").appendChild(div);
        div.addEventListener('click', function(e) {
            window.open(`${forwardScheme}://${fqdn}`);
        })
    });
    let toggleDetailIcon;
    if (toggleDetailEnabled) { 
        toggleDetailIcon = `<i class="fa-solid fa-toggle-on fa-2xl"></i>`;
    } else {
        toggleDetailIcon = `<i class="fa-solid fa-toggle-off fa-2xl"></i>`;
    }
    document.getElementById("controlIconContainer").innerHTML = toggleDetailIcon;
    document.getElementById("serverInfo").innerHTML = `<span id="serverHost">${serverHost}</span>`;
}

document.getElementById("controlIconContainer").addEventListener('click', function(e) {
    if (toggleDetailEnabled) { 
        toggleDetailEnabled = false;
    } else {
        toggleDetailEnabled = true
    }
    render();
});

getProxyHosts();