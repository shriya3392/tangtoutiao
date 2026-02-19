class TangtoutiaoLiveSDK {
  constructor(options) {
    this.serverUrl = options.serverUrl;
    this.ws = null;
    this.roomId = null;
    this.user = null;
  }

  connect() {
    this.ws = new WebSocket(this.serverUrl);

    this.ws.onopen = () => console.log("[TangLiveSDK] Connected");
    this.ws.onmessage = (e) => console.log("[TangLiveSDK] Message:", e.data);
    this.ws.onclose = () => console.log("[TangLiveSDK] Disconnected");
  }

  joinRoom(roomId, user) {
    this.roomId = roomId;
    this.user = user;
    this.ws.send(JSON.stringify({ type: "join", roomId, user }));
  }

  sendMessage(message) {
    this.ws.send(JSON.stringify({
      type: "chat",
      roomId: this.roomId,
      user: this.user,
      message,
      timestamp: Date.now()
    }));
  }
}

if (typeof module !== "undefined") {
  module.exports = TangtoutiaoLiveSDK;
}
