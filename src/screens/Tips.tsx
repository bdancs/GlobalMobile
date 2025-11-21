import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function Tips() {
  const tips = [
    "Use autenticação em duas etapas para proteger suas contas.",
    "Nunca compartilhe suas senhas — nem mesmo com pessoas próximas.",
    "Evite usar redes públicas sem proteção (VPN é recomendada).",
    "Mantenha seu sistema operacional e aplicativos sempre atualizados.",
    "Use senhas fortes e diferentes para cada serviço.",
    "Ative alertas de login e atividades suspeitas quando possível.",
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Boas Práticas de Segurança</Text>

      <ScrollView style={{ marginTop: 10 }}>
        {tips.map((tip, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.circle} />
            <Text style={styles.cardText}>{tip}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1a1a1a",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  circle: {
    width: 14,
    height: 14,
    backgroundColor: "#05b0b6",
    borderRadius: 20,
    marginTop: 5,
  },

  cardText: {
    fontSize: 16,
    color: "#ccc",
    lineHeight: 22,
    flex: 1,
  },
});
