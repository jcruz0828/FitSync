import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { signOut } from '@/lib/appwrite'
import { router } from 'expo-router'

const Home = () => {
  const handleSignOut = async () =>{
    await signOut()
    router.replace('/(auth)/sign-in')
  }
  return (
    <View>
      <TouchableOpacity onPress={()=> handleSignOut()}>
        <Text>
          Hello
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home