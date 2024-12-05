import { useGlobalContext } from "@/context/globalProvider";
import { Redirect, router } from "expo-router";
import { ImageBackground, ScrollView, Text, View, TouchableOpacity } from "react-native";

export default function Index() {

  const {isLoading,isLoggedIn}:any = useGlobalContext();
  
   if(!isLoading && isLoggedIn) return <Redirect href = '/home'/>

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }
    }className="bg-primary">
      <ImageBackground
        source= {require('../assets/images/fit-sync-bg.png')}
        className="flex-1 bg-cover"
      >
        {/* Main Container */}
        <View className="flex-1 justify-between px-5 bg-black/50">
          {/* Text Moved to Top */}
          <View className="mt-[145px] gap-y-1 items-center">
            <Text className="text-4xl font-pbold text-white text-center">Fit-Sync</Text>
            <Text className="mt-3 text-lg text-gray-300 text-center font-pregular">
              Take your workouts to the next level with our simple and effective fitness tracking app
            </Text>
          </View>

          {/* Button Positioned Higher */}
          <TouchableOpacity className="bg-electricBlue py-3 px-6 rounded-full shadow-md mb-[125px] self-center"
          onPress={()=>router.push('/sign-up')}
          >
            <Text className="text-lg font-bold text-white">Join Today</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
