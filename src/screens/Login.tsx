import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { CommonActions } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
};

export default function Login({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password.trim();

      await signInWithEmailAndPassword(auth, cleanEmail, cleanPassword);

      setLoading(false);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Drawer" }],
        })
      );
    } catch (error: any) {
      setLoading(false);

      let errorMessage = "Email ou senha inválidos";

      if (error.code) {
        switch (error.code) {
          case "auth/network-request-failed":
            errorMessage = "Erro de conexão. Verifique sua internet.";
            break;
          case "auth/invalid-email":
            errorMessage = "Email inválido.";
            break;
          case "auth/user-disabled":
            errorMessage = "Esta conta foi desabilitada.";
            break;
          case "auth/user-not-found":
            errorMessage = "Usuário não encontrado.";
            break;
          case "auth/wrong-password":
            errorMessage = "Senha incorreta.";
            break;
          case "auth/too-many-requests":
            errorMessage = "Muitas tentativas. Tente mais tarde.";
            break;
        }
      }

      Alert.alert("Erro no Login", errorMessage);
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>SecurityState</Text>
        <Text style={styles.subtitle}>Proteção Digital para Todos</Text>

        <View style={styles.iconBox}>
          <MaterialCommunityIcons name="shield-lock" size={180} color="#05b0b6" />
        </View>
      </View>

      <View style={styles.form}>
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
          placeholder="Senha"
          placeholderTextColor="#777"
          style={styles.input}
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color="#000" size="small" />
              <Text style={styles.loadingText}>Entrando...</Text>
            </View>
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Não tem conta? Criar conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  header: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 10,
    backgroundColor: "#000",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
  },

  iconBox: {
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#0d0d0d",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },

  form: {
    flex: 1,
    padding: 20,
    marginTop: -20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#333",
    padding: 15,
    marginVertical: 8,
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
    marginTop: 20,
  },

  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },

  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#05b0b6",
    fontSize: 16,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
