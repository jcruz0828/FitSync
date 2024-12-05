import React, { useState } from "react";
import Comment from '../components/Comment'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { useGlobalContext } from "@/context/globalProvider";

interface CommentModalProps {
  visible: boolean;
  onClose: () => void;
}

interface Comment {
  
}
const CommentModal: React.FC<CommentModalProps> = ({ visible, onClose }) => {
  const [comments, setComments] = useState<string[]>([]);
  const [commentText, setCommentText] = useState("");

  const handleAddComment = () => {
    if (commentText.trim()) {
      setComments((prev) => [...prev, commentText.trim()]);
      setCommentText("");
    }
  };
  const {user}:any = useGlobalContext()
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent // Ensures the modal overlays the current screen
    >
      {/* Modal Background */}
      <View className="flex-1 bg-black bg-opacity-50 justify-end">
        {/* Comment Box */}
        <View className="bg-white rounded-t-2xl p-4">
          {/* Header */}
          <View className="flex flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-gray-800">Comments</Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-electricBlue font-semibold">Close</Text>
            </TouchableOpacity>
          </View>

          {/* Comments List */}
          <FlatList
            data={comments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Comment
                username="jose"
                avatar= {user.avatar}
                text = {item}
              />
            )}
            className="mb-4 max-h-40"
          />

          {/* Comment Input */}
          <View className="flex flex-row items-center">
            <TextInput
              value={commentText}
              onChangeText={setCommentText}
              placeholder="Add a comment..."
              placeholderTextColor="#B0B0B0"
              className="flex-1 border border-gray-300 rounded-md p-2 text-gray-800 bg-white"
            />
            <TouchableOpacity
              onPress={handleAddComment}
              className="ml-2 bg-electricBlue px-4 py-2 rounded-md"
            >
              <Text className="text-white font-semibold">Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CommentModal;
