import { View, Text, Image } from "react-native";
import React, { useRef, useState } from "react";
import { Tabs } from "expo-router";

const TabIcon = ({ icon, color, name, focused }: any) => {


  return (
    <View className="flex items-center justify-center ">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-5 h-5"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
        numberOfLines={1}
      >
      {name}
      </Text>
      
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#00BFFF",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 84,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={require("../../assets/icons/home.png")}
              color={color}
              name="Home"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={require("../../assets/icons/calendar.png")}
              color={color}
              name="Calendar"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: "Workouts",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={require("../../assets/icons/workouts.png")}
              color={color}
              name="Workouts"
              focused={focused}
            />
          ),
        }}
      />
         <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={require("../../assets/icons/profile.png")}
              color={color}
              name="Profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
