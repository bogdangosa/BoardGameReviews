import {
  HubConnectionBuilder,
  HubConnection,
  LogLevel,
} from "@microsoft/signalr";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const serverAdress = config.public.serverAdress;

  console.log("SignalR server address: ", serverAdress + "/boardgameStatsHub");

  const connection: HubConnection = new HubConnectionBuilder()
    .withUrl(`${serverAdress}/boardgameStatsHub`) // replace `/myhub` with your hub endpoint
    .configureLogging(LogLevel.Information) // Set the logging level
    .withAutomaticReconnect()
    .build();

  connection
    .start()
    .then(() => console.log("SignalR Connected"))
    .catch((err) => console.error("SignalR Connection Error: ", err));

  return {
    provide: {
      signalr: connection,
    },
  };
});
