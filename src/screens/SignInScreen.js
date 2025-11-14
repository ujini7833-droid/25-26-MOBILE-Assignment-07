import { useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { login } from "../api/auth";
import Input, { KeyboardTypes } from "../components/Input";
import Button from "../components/Button";
import { useUser } from "../context/UserContext";

export default function SignInScreen({ navigation }) {
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isDisabled = !(email && password) || isLoading;

  const onSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await login(email, password);
      setUser(response.user);
      navigation.navigate("List");
    } catch (error) {
      Alert.alert("로그인 실패", error.message ?? "오류 발생");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/icon.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Input
        title="아이디"
        placeholder="your@email.com"
        keyboardType={KeyboardTypes.EMAIL}
        onChangeText={setEmail}
        iconName="mail"
      />
      <Input
        title="비밀번호"
        placeholder="비밀번호"
        onChangeText={setPassword}
        iconName="lock"
      />
      <Button
        title={isLoading ? "ing..." : "로그인"}
        onPress={onSubmit}
        disabled={isDisabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
});
