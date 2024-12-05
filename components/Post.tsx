import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import CommentModal from "./CommentModel";
import WorkoutCard from "./WorkoutCard";

type PostsType = {
  user: any;
  description: string;
};

const Post = ({ user, description }: PostsType) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    setLiked(!liked);
  };

  const handleToggleComments = () => {
    setShowComments((prev) => !prev);
  };

  return (
    <View className="p-4 bg-gray-100 rounded-lg shadow-md mb-6">
      {/* User Info */}
      <View className="flex flex-row items-center mb-4">
        <Image
          source={{ uri: user.avatar }}
          resizeMode="cover"
          className="w-10 h-10 rounded-full mr-3 border border-gray-300"
        />
        <Text className="text-lg font-semibold text-gray-800">{user.username}</Text>
      </View>

      {/* Post Description */}
      <View className="mb-4">
        <Text className="text-gray-700">{description}</Text>
      </View>
      <View>
        <WorkoutCard title='My Chest Day' date='11/24/24' type='strength' post={false}/>
      </View>

      {/* Like and Comment Actions */}
      <View className="flex flex-row items-center mb-4">
        {/* Like Button */}
        <TouchableOpacity
          onPress={handleLike}
          className="flex flex-row items-center mr-4"
        >
          <Image
            source={liked ? require("../assets/icons/like.png") : require("../assets/icons/unlike.png")}
            className="w-6 h-6 mr-2"
            resizeMode="contain"
          />
          <Text className="text-gray-700">{likes} Likes</Text>
        </TouchableOpacity>

        {/* Comment Button */}
        <TouchableOpacity
          onPress={handleToggleComments}
          className="flex flex-row items-center"
        >
          <Image
            source={require("../assets/icons/comment.png")}
            className="w-6 h-6 mr-2"
            resizeMode="contain"
          />
          <Text className="text-gray-700">View Comments</Text>
        </TouchableOpacity>
      </View>

      {/* Comment Modal */}
      <CommentModal
        visible={showComments}
        onClose={() => setShowComments(false)}
      />
    </View>
  );
};

export default Post;
