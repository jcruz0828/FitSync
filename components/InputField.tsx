import { View, Text, TextInput, TouchableOpacity ,Image} from 'react-native';
import React from 'react';

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  keyboardType?: 'default' | 'email-address';
  toggleVisibility?: () => void; // Function to toggle password visibility
  customStyle?:string;
  image:any;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  keyboardType = 'default',
  toggleVisibility,
  customStyle,
  image
}) => (
  <View className="w-full mb-4 justify-center items-center">
    <View className="relative">
      {/* Text Input */}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#B0B0B0"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        className={`bg-gray-800 text-white px-4 py-3 rounded-md ${customStyle}`}
      />
      
      {/* Toggle Visibility Icon */}
      {toggleVisibility && (
        <TouchableOpacity
          onPress={toggleVisibility}
          className="absolute right-3 top-3"
        >
          <Text className="text-gray-300">{secureTextEntry ? '👁️' : '🙈'}</Text>
        </TouchableOpacity>
      )}
    </View>

    {/* Error Message */}
    {error && <Text className="text-red-500 text-sm">{error}</Text>}
  </View>
);

export default InputField;
