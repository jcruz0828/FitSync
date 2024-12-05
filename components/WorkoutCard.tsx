import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";

interface Exercise {
  name: string;
  sets: number;
  reps: number;
}

interface WorkoutCardProps {
  title: string;
  date: string;
  type: string; // e.g., Strength, Cardio
  post: boolean;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  title,
  date,
  type,
  post,
}) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseSets, setExerciseSets] = useState("");
  const [exerciseReps, setExerciseReps] = useState("");

  const addExercise = () => {
    if (exerciseName && exerciseSets && exerciseReps) {
      setExercises((prev) => [
        ...prev,
        {
          name: exerciseName,
          sets: parseInt(exerciseSets),
          reps: parseInt(exerciseReps),
        },
      ]);
      setExerciseName("");
      setExerciseSets("");
      setExerciseReps("");
    }
  };

  return (
    <View className="p-4 bg-gray-200 border border-gray-300 rounded-lg">
      {/* Header */}
      <View className="mb-4">
        <Text className="text-lg font-bold text-gray-800">{title}</Text>
        <Text className="text-sm text-gray-500">{date}</Text>
        <Text className="text-sm text-gray-500 italic">{type}</Text>
      </View>

      {/* Exercise List */}
      <FlatList
        data={exercises}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="flex flex-row justify-between items-center mb-2">
            <Text className="text-gray-800">{item.name}</Text>
            <Text className="text-gray-500">
              {item.sets} sets x {item.reps} reps
            </Text>
          </View>
        )}
        className="mb-4"
      />

      {/* Add Exercise */}
      {post && (
        <View className="border-t border-gray-300 pt-4">
          <Text className="text-lg font-semibold text-gray-800 mb-2">
            Add Exercise
          </Text>
          <View className="flex flex-row items-center mb-2">
            <TextInput
              placeholder="Exercise Name"
              placeholderTextColor="#B0B0B0"
              value={exerciseName}
              onChangeText={setExerciseName}
              className="flex-1 border border-gray-300 rounded-md p-2 text-gray-800 mr-2 bg-gray-100"
            />
          </View>
          <View className="flex flex-row mb-2">
            <TextInput
              placeholder="Sets"
              placeholderTextColor="#B0B0B0"
              value={exerciseSets}
              onChangeText={setExerciseSets}
              keyboardType="numeric"
              className="flex-1 border border-gray-300 rounded-md p-2 text-gray-800 mr-2 bg-gray-100"
            />
            <TextInput
              placeholder="Reps"
              placeholderTextColor="#B0B0B0"
              value={exerciseReps}
              onChangeText={setExerciseReps}
              keyboardType="numeric"
              className="flex-1 border border-gray-300 rounded-md p-2 text-gray-800 bg-gray-100"
            />
          </View>
          <TouchableOpacity
            onPress={addExercise}
            className="bg-blue-500 px-4 py-2 rounded-md items-center"
          >
            <Text className="text-white font-semibold">Add Exercise</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default WorkoutCard;
