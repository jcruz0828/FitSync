import { View, TextInput, Image, TouchableOpacity } from 'react-native';
import React from 'react';

interface QueryInputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  onSearch: () => void; // Callback for the search button
  customStyle:string;
}

const QueryInput: React.FC<QueryInputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  onSearch,
  customStyle
}) => (
  <View className="w-[365px] mb-4">
    <View className="relative flex-row items-center bg-gray-800 rounded-md">
      {/* Text Input */}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#B0B0B0"
        value={value}
        onChangeText={onChangeText}
        className="flex-1 text-white pl-4 pr-12 py-3 rounded-md"
      />

      {/* Search Button */}
      <TouchableOpacity
        onPress={onSearch}
        className="absolute right-3 w-8 h-8 justify-center items-center"
      >
        <Image
          source={require('../assets/icons/search.png')}
          className="w-6 h-6"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  </View>
);

export default QueryInput;
