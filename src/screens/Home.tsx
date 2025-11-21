import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Home() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text style={styles.title}>SecurityState</Text>

      <View style={styles.iconBox}>
        <MaterialCommunityIcons name="shield-lock" size={120} color="#05b0b6" />
      </View>

      <Text style={styles.subtitle}>Segurança Digital para Todos</Text>

      <Text style={styles.section}>O que o app faz?</Text>

      <View style={styles.listBox}>
        <Text style={styles.listItem}>• Ensina como evitar golpes digitais</Text>
        <Text style={styles.listItem}>• Explica boas práticas de proteção de dados</Text>
        <Text style={styles.listItem}>• Ajuda você a usar seus dispositivos com mais segurança</Text>
        <Text style={styles.listItem}>• Aumenta sua consciência sobre riscos online</Text>
      </View>

      <Text style={[styles.section, { marginTop: 25 }]}>Por que isso importa?</Text>

      <View style={styles.listBox}>
        <Text style={styles.listItem}>• Protege suas informações pessoais</Text>
        <Text style={styles.listItem}>• Evita perdas financeiras e golpes</Text>
        <Text style={styles.listItem}>• Mantém suas contas e dispositivos seguros</Text>
        <Text style={styles.listItem}>• Fortalece sua presença digital no trabalho</Text>
      </View>

      <Text style={[styles.section, { marginTop: 25 }]}>Conexão com ODS</Text>

      <View style={styles.listBox}>
        <Text style={styles.listItem}>• ODS 4 — Educação de Qualidade</Text>
        <Text style={styles.listItem}>• ODS 8 — Trabalho Decente</Text>
        <Text style={styles.listItem}>• ODS 9 — Inovação e Infraestrutura</Text>
        <Text style={styles.listItem}>• ODS 12 — Consumo e Produção Responsáveis</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#000",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#fff",
  },

  circle: {
    width: 140,
    height: 140,
    backgroundColor: "#05b0b6",
    borderRadius: 200,
    alignSelf: "center",
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
    color: "#e5e5e5",
  },

  section: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#fff",
  },

  listBox: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 14,
    marginBottom: 18,
  },

  listItem: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 10,
    lineHeight: 22,
  },
  iconBox: {
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
    width: 200,
    elevation: 4,
    backgroundColor: "#0d0d0d",
  },
});
