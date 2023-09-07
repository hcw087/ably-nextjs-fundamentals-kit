import { useState, useEffect } from "react";
import * as Ably from "ably/promises";
import { configureAbly } from "@ably-labs/react-hooks";
import Layout from "../components/layout";
import Logger, { LogEntry } from "../components/logger";

type Message = {
  timestamp: number;
  data: {
    text: string;
  };
};

export default function History() {
  const [realtimeLogs, setRealtimeLogs] = useState<Array<LogEntry>>([]);
  const [historicalLogs, setHistoricalLogs] = useState<Array<LogEntry>>([]);

  useEffect(() => {
    const ably: Ably.Types.RealtimePromise = configureAbly({
      authUrl: "/api/authentication/token-auth",
    });

    ably.connection.on((stateChange: Ably.Types.ConnectionStateChange) => {
      console.log(stateChange);
    });

    const channel = ably.channels.get("status-updates");
    channel.subscribe((message: Ably.Types.Message) => {
      setRealtimeLogs((prev) => [
        ...prev,
        new LogEntry(
          `✉️ event name: ${message.name} text: ${message.data.text}`
        ),
      ]);
    });

    const getHistory = async () => {
      let history: Ably.Types.PaginatedResult<Message> =
        await channel.history();
      do {
        history.items.forEach((message) => {
          setHistoricalLogs((prev) => [
            ...prev,
            new LogEntry(
              `"${message.data.text}" sent at ${new Date(
                message.timestamp
              ).toISOString()}`
            ),
          ]);
        });
        history = await history.next();
      } while (history);
    };
    getHistory();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <Layout pageTitle="" metaDescription="">
      <section>
        <h3>History</h3>
        {historicalLogs.length > 0 ? (
          <Logger logEntries={historicalLogs} />
        ) : (
          <p>No historical messages found</p>
        )}
      </section>

      <section>
        <h3>Realtime</h3>
        {realtimeLogs.length > 0 ? (
          <Logger logEntries={realtimeLogs} />
        ) : (
          <p>No realtime messages received yet</p>
        )}
      </section>
    </Layout>
  );
}
