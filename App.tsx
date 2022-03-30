import { Feather as Icon } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Input, Text } from "react-native-elements";
import useWebSocket from "react-use-websocket";

export default function App() {
  const [data, setData] = useState({});
  const [text, setText] = useState("BTCUSDT");
  const [simbol, setSimbol] = useState("btcusdt");

  const { lastJsonMessage } = useWebSocket(
    `wss://stream.binance.com:9443/ws/${simbol}@ticker`,
    {
      onMessage: () => {
        if (lastJsonMessage) {
          setData(lastJsonMessage);
        }
      },
      onError: (event) => alert(event),
      shouldReconnect: () => true,
      reconnectInterval: 3000,
    }
  );

  const searchButton = (
    <Icon.Button
      name="search"
      size={24}
      color="black"
      backgroundColor="transparent"
      onPress={(e) => setSimbol(text.toLowerCase())}
    />
  );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text h1>CriptoView 1.0.0</Text>
        <Input
          autoCapitalize="characters"
          leftIcon={<Icon name="dollar-sign" size={24} color="black" />}
          rightIcon={searchButton}
          value={text}
          placeholder="Cripto"
          onChangeText={setText}
        />
        <View style={styles.line}>
          <Text style={styles.label}>Preço atual: </Text>
          <Text style={styles.content}>{data.c}</Text>
        </View>
        <View style={styles.line}>
          <Text style={styles.label}>Variação: </Text>
          <Text style={styles.content}>{data.P}%</Text>
        </View>
        <View style={styles.line}>
          <Text style={styles.label}>Volume: </Text>
          <Text style={styles.content}>{data.v}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginTop: 40,
    margin: 20,
    alignContent: "center",
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    fontSize: 24,
  },
  content: {
    fontSize: 24,
  },
  line: {
    flexDirection: "row",
    width: "100%",
  },
});
