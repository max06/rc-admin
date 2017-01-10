<template>
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <script src="https://unpkg.com/vue/dist/vue.js"></script>
            <script src="/socket.io/socket.io.js"></script>
        </head>
        <body>
            {{{app}}}
            {{{script}}}
            <script>app.$mount('#app')</script>
            <script>
                var socket = io.connect('ws://localhost:3000/');
                socket.emit('info', {});

                socket.on('info', function(data) {
                    console.log("This is a cluster: "+data.cluster_enabled);
                    app.info = data;
                });
            </script>
        </body>
    </html>
</template>

<script>
</script>

<style>
</style>