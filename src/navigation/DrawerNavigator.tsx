import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import Threats from "../screens/Threats";
import Tips from "../screens/Tips";
import AI from "../screens/AI";
import Profile from "../screens/Profile";

export type DrawerParamList = {
  Home: undefined;
  Threats: undefined;
  Tips: undefined;
  AI: undefined;
  Profile: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,

        headerStyle: {
          backgroundColor: "#000",
        },
        headerTintColor: "#05b0b6",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        K
        drawerStyle: {
          backgroundColor: "#111",
          width: 260,
        },

        drawerActiveBackgroundColor: "#05b0b6",
        drawerActiveTintColor: "#000",
        drawerInactiveTintColor: "#ccc",
        drawerLabelStyle: {
          fontSize: 16,
          marginLeft: -5,
        },
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Threats" component={Threats} options={{ title: "Ameaças" }} />
      <Drawer.Screen name="Tips" component={Tips} options={{ title: "Boas Práticas" }} />
      <Drawer.Screen name="AI" component={AI} options={{ title: "Assistente IA" }} />
      <Drawer.Screen name="Profile" component={Profile} options={{ title: "Perfil" }} />
    </Drawer.Navigator>
  );
}
