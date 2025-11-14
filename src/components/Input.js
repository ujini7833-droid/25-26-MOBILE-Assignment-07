import PropTypes from "prop-types";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TextInput, View } from "react-native";

export const KeyboardTypes = {
  DEFAULT: "default",
  EMAIL: "email-address",
};

export default function Input({
  title, placeholder, keyboardType = KeyboardTypes.DEFAULT, iconName, onChangeText,
}) {
  const isPassword = title === "비밀번호";

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputContainer}>
        {iconName && (
          <MaterialIcons name={iconName} size={20} color="#5b8df9" />
        )}
        <TextInput
          style={styles.input}
          placeholder={placeholder ?? title}
          placeholderTextColor="#aaa"
          keyboardType={keyboardType}
          secureTextEntry={isPassword}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
}

Input.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
  iconName: PropTypes.string,
  onChangeText: PropTypes.func,
};

const styles = StyleSheet.create({
  wrapper: { width: "100%", marginBottom: 15 },
  title: { fontSize: 14, marginBottom: 5, color: "#333" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  input: { flex: 1, height: 42, fontSize: 14, paddingLeft: 8 },
});
