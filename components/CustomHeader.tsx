import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

type HeaderType = {
  title: string;
  subTitle: string;
  customStyle?: string; // Tailwind classes for additional customization
  user?:string;
};

const CustomHeader = ({ title, subTitle, customStyle,user }: HeaderType) => {
  return (
    <View className={`px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-700 ${customStyle} rounded-b-xl shadow-lg`}>
      <Text className="font-bold text-white text-3xl tracking-tight mb-1">
        {title}
      </Text>
      <Text className="font-medium text-indigo-200 text-lg">
        {subTitle}
        <Text className='text-electricBlue'>
          {user} !
        </Text>
      </Text>
    </View>
  );
};

export default CustomHeader;


