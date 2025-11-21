import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { auth, db } from "../services/firebaseConfig";
import { signOut } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Profile() {
  const navigation = useNavigation<NavigationProp>();
  const [userData, setUserData] = useState<{
    nome?: string;
    email?: string;
    createdAt?: string;
  }>({});

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const userRef = ref(db, "users/" + uid);

    onValue(userRef, (snap) => {
      const data = snap.val();
      setUserData(data || {});
    });
  }, []);

  async function handleLogout() {
    Alert.alert("Sair", "Deseja realmente sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut(auth);
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
            );
          } catch (err) {
            Alert.alert("Erro", "Não foi possível sair.");
          }
        },
      },
    ]);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {userData.nome?.charAt(0).toUpperCase() || "U"}
          </Text>
        </View>

        <Text style={styles.title}>{userData.nome || "Usuário"}</Text>
        <Text style={styles.email}>{userData.email || "email não informado"}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Informações da Conta</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Nome</Text>
          <Text style={styles.infoValue}>{userData.nome || "Não informado"}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{userData.email || "Não informado"}</Text>
        </View>

        {userData.createdAt && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Criado em</Text>
            <Text style={styles.infoValue}>
              {new Date(userData.createdAt).toLocaleDateString("pt-BR")}
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair da Conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  header: {
    alignItems: "center",
    padding: 30,
    backgroundColor: "#111",
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a1a",
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#05b0b6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  avatarText: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#000",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },

  email: {
    fontSize: 16,
    color: "#ccc",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#111",
    margin: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1a1a1a",
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#05b0b6",
    marginBottom: 15,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1f1f1f",
  },

  infoLabel: {
    fontSize: 16,
    color: "#ccc",
  },

  infoValue: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },

  logoutButton: {
    backgroundColor: "#05b0b6",
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  logoutText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});
