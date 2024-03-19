import config from './config.json' assert { type: 'json'};

const serverHost = config.server.host;
const serverPort = config.server.port;
const identity = config.server.email;
const secret = config.server.password;
var showForwarding = config.appearance.showforwarding;
var showDisabled = config.appearance.showdisabled;
const toggleOnIcon = `<i class="fa-solid fa-toggle-on fa-2xl"></i>`;
const toggleOffIcon = `<i class="fa-solid fa-toggle-off fa-2xl"></i>`;
var data;

if (!config.appearance.showheader) document.getElementById("header").style.display = 'none';
if (!config.appearance.showfooter) document.getElementById("footer").style.display = 'none';

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
            console.log(data);
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
        if (host.enabled == 1 || (host.enabled == 0 && showDisabled)) {
        var fqdn = host.domain_names;
        var forwardHostPort = host.forward_host + ":" + host.forward_port;
        var hostname = fqdn.toString().split('.')[0];
        var domain = fqdn.toString().split(hostname)[1];
        var forwardScheme = host.forward_scheme;
        const div = document.createElement("div");
        div.innerHTML += `<span class="hostname"> ${hostname}</span><span class="domain">${domain}</span>`
        if (showForwarding) div.innerHTML += `<span class="forwardingInfo"> >> ${forwardScheme}://${forwardHostPort}</span></a>`;
        div.className = "host-container";
        if (host.enabled == 0 && showDisabled) div.classList.add("disabled");
        document.getElementById("main").appendChild(div);
        div.addEventListener('click', function(e) {
            window.open(`${forwardScheme}://${fqdn}`);
        })
    }
    });
    document.getElementById("showForwardingContainer").innerHTML = showForwarding ? toggleOnIcon : toggleOffIcon;
    document.getElementById("showDisabledContainer").innerHTML = showDisabled ? toggleOnIcon : toggleOffIcon;
    document.getElementById("serverInfo").innerHTML = `<span id="serverHost">${serverHost}</span>`;
}

document.getElementById("showForwardingContainer").addEventListener('click', function(e) {
    if (showForwarding) { 
        showForwarding = false;
    } else {
        showForwarding = true
    }
    render();
});

document.getElementById("showDisabledContainer").addEventListener('click', function(e) {
    if (showDisabled) { 
        showDisabled = false;
    } else {
        showDisabled = true
    }
    render();
});

getProxyHosts();