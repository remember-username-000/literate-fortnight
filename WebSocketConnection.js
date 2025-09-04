/**
 * Class for managing one connection to a WebSocket server.
 * @extends EventTarget
 */
class WebSocketConnection extends EventTarget {
    //extend EventTarget to allow instances to dispatch events

    /**
     * The WebSocket object representing this WebSocket connection.
     * @type {WebSocket}
     * @private
     */
    #webSocket;

    /**
     * Create a WebSocketConnection, attach event listeners, and define events to be dispatched.
     * @param {string} webSocketServerUrl - The ws:// address of the WebSocket server to connect to.
     */
    constructor (webSocketServerUrl) {
        super();
        console.log('hi');
        
        //this.#webSocket = new WebSocket('ws://127.0.0.1:80');
        this.#webSocket = new WebSocket(webSocketServerUrl);
        console.log('WebSocket initiated');

        this.#webSocket.addEventListener(
            'open', 
            (e) => {
                console.log('WebSocket open');
                //this.#webSocket.send('abcdef');
            }
        );
        this.#webSocket.addEventListener('close', () => { console.log('WebSocket closed'); });
        this.#webSocket.addEventListener(
            'message', 
            (ev) => { 
                this.dispatchEvent(
                    new CustomEvent(
                        'wsMessage', 
                        {
                            detail: {
                                data: ev.data,
                            },
                        }
                    )
                ); 
            }
        );
        this.#webSocket.addEventListener('error', (e) => { console.log('uwu i made a fucky wucky: ' + e); });
    }

    /**
     * Send data to the WebSocket server.
     * @param {string} data 
     */
    send(data) {
        this.#webSocket.send(data);
    }

    /**
     * Close this WebSocket connection.
     */
    close() {
        this.#webSocket.close();
    }
}