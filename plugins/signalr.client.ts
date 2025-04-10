import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();

  const connection: HubConnection = new HubConnectionBuilder()
    .withUrl(`${runtimeConfig.public.apiBase}/myhub`) // replace `/myhub` with your hub endpoint
    .withAutomaticReconnect()
    .build();

  connection.start()
    .then(() => console.log("SignalR Connected"))
    .catch(err => console.error("SignalR Connection Error: ", err));

  return {
    provide: {
      signalr: connection
    }
  };
});
