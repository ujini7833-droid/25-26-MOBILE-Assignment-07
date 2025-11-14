import PropTypes from "prop-types";
import { Pressable, StyleSheet, Text } from "react-native";

export default function Button({ title, onPress, disabled }) {
  return (
    <Pressable onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        disabled ? styles.disabled : styles.active,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  button: { width: "100%",
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10, },

  active: { backgroundColor: "#3c74d4", },
  disabled: { backgroundColor: "lightgray", },
  text: { color: "white",
    fontWeight: "bold", },
});
