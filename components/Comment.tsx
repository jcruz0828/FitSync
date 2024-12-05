import React from "react";
import { View, Text, Image } from "react-native";

interface CommentProps {
  avatar: string;
  username: string;
  text: string;
}

const Comment: React.FC<CommentProps> = ({ avatar, username, text }) => {
  return (
    <View className="flex flex-row items-start mb-4">
      {/* Avatar */}
      <Image
        source={{ uri: avatar }}
        className="w-10 h-10 rounded-full mr-4"
        resizeMode="cover"
      />

      {/* Comment Content */}
      <View className="flex-1">
        <Text className="text-sm font-semibold text-gray-800">{username}</Text>
        <Text className="text-sm text-gray-700">{text}</Text>
      </View>
    </View>
  );
};

export default Comment;
