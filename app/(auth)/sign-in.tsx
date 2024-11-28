import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import InputField from '@/components/InputField';
// Form Input Types (for TypeScript users)
type FormData = {
  email: string;
  password: string;
};

type FormErrors = Partial<FormData>;

const SignIn = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false); // Password visibility toggle
  const [errors, setErrors] = useState<FormErrors>({});

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  // Validate form inputs
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'A valid email is required.';
    }
    if (!formData.password.trim() || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      Alert.alert('Success', 'You have signed in successfully!');
      // Handle API sign-in logic here
    }
  };

  // Reusable Input Component
  

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center items-center px-5">
          {/* Title */}
          <Text className="text-3xl font-bold text-white mb-4">Welcome Back!</Text>
          <Text className="text-lg text-gray-200 text-center mb-8">
            Sign in to continue tracking your fitness journey.
          </Text>

          {/* Form Fields */}
          <InputField
            placeholder="Email Address"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            error={errors.email}
          />
          <InputField
            placeholder="Password"
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
            secureTextEntry = {!passwordVisible}
            error={errors.password}
            toggleVisibility = {() => setPasswordVisible(!passwordVisible)}
          />

          {/* Sign In Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-electricBlue py-3 px-6 rounded-full shadow-md w-full"
          >
            <Text className="text-lg font-bold text-white text-center">Sign In</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View className="mt-6 items-center">
            <Text className="text-white mb-2">Don't have an account?</Text>
            <Link href="/sign-up" className="text-electricBlue text-center">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
