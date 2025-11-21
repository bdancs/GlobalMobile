import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function AI() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  function handleAsk() {
    setAnswer(
      "⚠️ Exemplo de resposta da IA:\nUse senhas fortes com letras, números e símbolos.\nAtive autenticação de 2 fatores."
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assistente de Segurança (IA)</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite sua dúvida aqui..."
        placeholderTextColor="#777"
        value={question}
        onChangeText={setQuestion}
      />

      <TouchableOpacity style={styles.button} onPress={handleAsk}>
        <Text style={styles.buttonText}>Perguntar</Text>
      </TouchableOpacity>

      <ScrollView style={styles.answerBox}>
        <Text style={styles.answerText}>
          {answer || "A resposta aparecerá aqui..."}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#333",
    backgroundColor: "#111",
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
    color: "#fff",
    fontSize: 16,
  },

  button: {
    backgroundColor: "#05b0b6",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },

  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
  },

  answerBox: {
    backgroundColor: "#111",
    padding: 18,
    borderRadius: 12,
    minHeight: 180,
    borderWidth: 1,
    borderColor: "#1a1a1a",
  },

  answerText: {
    color: "#ccc",
    fontSize: 16,
    lineHeight: 22,
  },
});
