import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../services/firebaseConfig";
import { ref, set } from "firebase/database";
import { NavigationProp, CommonActions } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

export default function Register({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!nome.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres");
      return;
    }

    try {
      setLoading(true);

      const { user } = await createUserWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );

      await auth.authStateReady();

      const userData = {
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        progresso: {},
        trilhasIniciadas: [],
        areasInteresse: [],
        createdAt: new Date().toISOString(),
      };

      await set(ref(db, `users/${user.uid}`), userData);

      await signOut(auth);

      Alert.alert("Sucesso", "Conta criada com sucesso!", [
        {
          text: "OK",
          onPress: () =>
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
            ),
        },
      ]);
    } catch (error: any) {
      let msg = "Erro ao criar conta.";

      if (error.code === "auth/network-request-failed") {
        msg =
          "Falha de conexão com o Firebase. Verifique internet / regras / Cleartext.";
      }

      Alert.alert("Erro", msg);
      console.log("🔥 ERRO:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Comece sua jornada com segurança</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          placeholder="Nome completo"
          placeholderTextColor="#777"
          style={styles.input}
          onChangeText={setNome}
          value={nome}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor="#777"
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Senha (mínimo 6 caracteres)"
          placeholderTextColor="#777"
          style={styles.input}
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.buttonText}>Registrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.linkContainer}
        >
          <Text style={styles.linkText}>Já tem conta? Fazer login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  header: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: "#000",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    color: "#ccc",
    textAlign: "center",
  },

  form: {
    flex: 1,
    padding: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#333",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#111",
    fontSize: 16,
    color: "#fff",
  },

  button: {
    backgroundColor: "#05b0b6",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  linkContainer: {
    marginTop: 20,
    alignItems: "center",
  },

  linkText: {
    color: "#05b0b6",
    fontSize: 16,
    fontWeight: "500",
  },
});
