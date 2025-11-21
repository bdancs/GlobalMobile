import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Threats from "../screens/Threats";
import Tips from "../screens/Tips";

export type TabParamList = {
  Home: undefined;
  Threats: undefined;
  Tips: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Threats" component={Threats} />
      <Tab.Screen name="Tips" component={Tips} />
    </Tab.Navigator>
  );
}
