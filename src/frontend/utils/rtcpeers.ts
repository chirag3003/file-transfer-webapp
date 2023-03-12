const servers = {
    iceServers: [
        {
            urls: "turn:relay.metered.ca:80",
            username: "0490027236e3e76afa52112c",
            credential: "zvfXe6Y6Tmsl+FZM",
        },
        {
            urls: "turn:relay.metered.ca:443",
            username: "0490027236e3e76afa52112c",
            credential: "zvfXe6Y6Tmsl+FZM",
        },
        {
            urls: "turn:relay.metered.ca:443?transport=tcp",
            username: "0490027236e3e76afa52112c",
            credential: "zvfXe6Y6Tmsl+FZM",
        },

        {
            urls: ["stun:stun1.l.google.com:19302"],
        },
    ],
};

export default servers;
