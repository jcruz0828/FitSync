import { Link, router } from 'expo-router';
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
import { createUser } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/globalProvider';
// Form Data and Errors Types (for TypeScript users)
type FormData = {
  name: string;
  email: string;
  password: string;
  username:string;
};

type FormErrors = Partial<FormData>;

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    username:'',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [passwordVisible, setPasswordVisible] = useState(false); // Password visibility toggle
  const {setUser,setLoggedIn}:any = useGlobalContext()

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  // Validate form inputs
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }
    if (!formData.email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'A valid email is required.';
    }
    if (!formData.password.trim() || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      Alert.alert('Success', 'Your account has been created!');
      try {
        const user  = await createUser(formData);
        if(!user) return Error('User could not be created, try again later or contact support');
        setUser(user);
        setLoggedIn(true);
        router.replace('/home')
        } catch (error:any) {
          throw Error(error);
      }
    }
  };

  // Reusable Input Component
  

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center items-center px-5">
          {/* Title */}
          <Text className="text-3xl font-bold text-white mb-4">Create Account</Text>
          <Text className="text-lg text-gray-200 text-center mb-8">
            Sign up to start your fitness journey today!
          </Text>

          {/* Form Fields */}
          <InputField
            placeholder="Full Name"
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
            error={errors.name}
          />
           <InputField
            placeholder="User Name"
            value={formData.username}
            onChangeText={(value) => handleInputChange('username', value)}
            error={errors.username}
          />
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
            secureTextEntry={!passwordVisible}
            toggleVisibility={() => setPasswordVisible(!passwordVisible)}
            error={errors.password}
          />

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-electricBlue py-3 px-6 rounded-full shadow-md w-full"
          >
            <Text className="text-lg font-bold text-white text-center">Sign Up</Text>
          </TouchableOpacity>

          {/* Sign In Link */}
          <View className="mt-6 items-center">
            <Text className="text-white mb-2">Already have an account?</Text>
            <Link href="/sign-in" className="text-electricBlue text-center">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
