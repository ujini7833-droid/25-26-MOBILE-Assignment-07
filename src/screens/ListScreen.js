import { MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View,} from "react-native";
import { useUser } from "../context/UserContext";

function TodoItem({ item, onToggle, onRemove }) {
  return (
    <View style={styles.itemRow}>
      <Pressable onPress={() => onToggle(item.id)} style={styles.left}>
        <MaterialIcons
          name={item.done ? "check-box" : "check-box-outline-blank"}
          size={24}
        />
        <Text style={[styles.title, item.done && styles.done]}>
          {item.title}
        </Text>
      </Pressable>
      <Pressable onPress={() => onRemove(item.id)} hitSlop={10}>
        <MaterialIcons name="delete" size={22} />
      </Pressable>
    </View>
  );
}

const MemoTodoItem = React.memo(TodoItem);

export default function ListScreen({ navigation }) {
  const { user } = useUser();
  const [todos, setTodos] = useState([
  ]);

  const toggleAll = () => {
    const allDone = todos.every((t) => t.done);
    setTodos((prev) => prev.map((t) => ({ ...t, done: !allDone })));
  };

  const removeAll = () => {
  };

  useEffect(() => {
    navigation.setOptions({
      title: user ? `${user.name}의 할 일` : "리스트 화면",
      headerRight: () => (
        <View style={{ flexDirection: "row", gap: 16 }}>
          <Pressable onPress={toggleAll}>
            <MaterialIcons name="done-all" size={24} color="blue" />
          </Pressable>
          <Pressable onPress={removeAll}>
            <MaterialIcons name="delete" size={24} color="red" />
          </Pressable>
        </View>
      ),
    });
  }, [user, todos]);

  const onToggle = useCallback((id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))); }, []);

  const onRemove = useCallback((id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id)); }, []);

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  const renderItem = useCallback(
    ({ item }) => (
      <MemoTodoItem item={item} onToggle={onToggle} onRemove={onRemove} /> ),
    [onToggle, onRemove] );

  const ListEmptyComponent = useMemo(
    () => (
      <View style={styles.emptyWrap}>
        <Text style={styles.emptyText}>할 일을 추가해주세요</Text>
      </View> ), [] );

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
        contentContainerStyle={
          todos.length === 0 && { flex: 1, justifyContent: "center" } }
        windowSize={5} />
    </View> );}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  left: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { fontSize: 16 },
  done: { textDecorationLine: "line-through", color: "gray" },
  seperator: { height: 1, backgroundColor: "#eee" },
  emptyWrap: { alignItems: "center", gap: 8 },
  emptyText: { fontSize: 16, color: "skyblue" },
});
