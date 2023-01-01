import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const [editMode, setEditMode] = useState();
  const [editInput, setEditInput] = useState("");

  const addTodo = () => {
    setTodos((currentTodo) => [
      ...currentTodo,
      { id: Math.random(), text: input },
    ]);
    setInput("");
  };

  const editTodo = (id) => {
    const newTodos = todos.filter((todo) => {
      if (todo.id == id) todo.text = editInput;
      return todo;
    });

    setTodos(newTodos);
    setEditMode(null);
  };

  const deleteTodo = (id) => {
    const newTodo = todos.filter((todo) => todo.id != id);
    setTodos(newTodo);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter your todo..."
          value={input}
          onChangeText={(e) => setInput(e)}
        />
        <Button title="ADD" onPress={addTodo} />
      </View>
      <View style={styles.listContainer}>
        {todos.map((todo) => (
          <View style={styles.listItem} key={todo.id}>
            {editMode == todo.id ? (
              <View>
                <TextInput
                  value={editInput}
                  onChangeText={(e) => setEditInput(e)}
                />
                <Button title="EDIT" onPress={() => editTodo(todo.id)} />
              </View>
            ) : (
              <View>
                <Text style={styles.listItemText}>{todo.text}</Text>
                <View style={styles.listItemButton}>
                  <Button
                    onPress={() => {
                      setEditMode(todo.id);
                      setEditInput(todo.text);
                    }}
                    title="Edit"
                  />
                  <Button onPress={() => deleteTodo(todo.id)} title="Delete" />
                </View>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  inputContainer: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",

    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  listContainer: {
    marginTop: 20,
  },
  listItem: {
    marginVertical: 10,
    padding: 10,

    borderWidth: 2,
    borderRadius: 6,
    borderColor: "#6259ff",
  },
  listItemText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  listItemButton: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 10,
  },
});
