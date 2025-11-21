import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function Threats() {
  const threats = [
    {
      title: "Phishing",
      description: "E-mails ou mensagens falsificadas tentando roubar dados pessoais."
    },
    {
      title: "Senha fraca",
      description: "Senhas simples, repetidas ou fáceis de adivinhar."
    },
    {
      title: "Wi-Fi público",
      description: "Risco de interceptação de dados ao usar redes abertas."
    },
    {
      title: "Malware",
      description: "Arquivos maliciosos que podem roubar ou corromper informações."
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ameaças Digitais Comuns</Text>

      <ScrollView style={{ marginTop: 10 }}>
        {threats.map((item, index) => (
          <View key={index} style={styles.card}>
            {/* bolinha ciano */}
            <View style={styles.circle} />

            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
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
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1a1a1a",
  },

  circle: {
    width: 16,
    height: 16,
    backgroundColor: "#05b0b6",
    borderRadius: 20,
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },

  cardDescription: {
    fontSize: 15,
    color: "#ccc",
    lineHeight: 22,
  },
});
