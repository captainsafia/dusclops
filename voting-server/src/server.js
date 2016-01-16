import Server from 'socket.io';

export default function startServer(store) {
    const io = new Server().attach(8090);

    store.subscribe(
        // Here we are sending all of the data, in reality we might 
        // want to send a subset or a diff or other data-efficient ways
        () => io.emit('state', store.getState().toJS())
    };

    io.on('connection', (socket) => {
        // Send the state whenever a new client connects
        socket.emit('state', store.getState().toJS());
        // Whenever clients send action events, then send it to Redux store
        // Note that this allows any connection to execute any action on the
        // Redux store, in reality we are going to want to have something in
        // the middle that prevents clients fro doing something bad
        socket.on('action', store.dispatch.bind(store));
    });
}
