import React from 'react';
import { Button } from 'react-native';

export default function LogoutButton({ onLogout }) {
  return (
    <Button
      title="Logout"
      onPress={onLogout}
    />
  );
}