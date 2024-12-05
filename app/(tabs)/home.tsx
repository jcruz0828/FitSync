import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { signOut } from '@/lib/appwrite'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomHeader from '@/components/CustomHeader'
import { useGlobalContext } from '@/context/globalProvider'
import InputField from '@/components/InputField'
import QueryInput from '@/components/QueryInput'
import Post from '@/components/Post'

const Home = () => {
  const handleSignOut = async () =>{
    await signOut()
    router.replace('/sign-in')
  }
  const [query, setQuery] = useState<string>('')
  const {user}:any = useGlobalContext();
  console.log(user)
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='flex flex-col'>
        <CustomHeader
        title="Welcome Back"
        subTitle={`Hello, `}
        customStyle="mb-4"
        user = {user.username}
      />
        </View>
        <View className='flex  justify-center items-center'>
          <QueryInput 
            placeholder='Search for people or posts'
            value={query}
            onChangeText={(e: any) => setQuery(e)}
            customStyle='w-[350px]' onSearch={()=>console.log('search')
            }/>
          
        </View>
        <View className='mt-1 px-6 py-4'>
          <Text className='text-white font-pmedium'>
            Trending Posts :
          </Text>
          
        </View>
        <View>
          <Post user={user} description='This is my first post: test post'/>
          <Post user={user} description='This is my first post: test post'/>
          <Post user={user} description='This is my first post: test post'/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home