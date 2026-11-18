import { Stack } from "expo-router";

export default function Subscription() {
  return (
    <Stack screenOptions={{ headerShown: false }}> 
      <Stack.Screen name="subscriptions"/> 
      <Stack.Screen name="subscription-details"/>
      <Stack.Screen name="new-payment"/>  
    </Stack>
  );
}