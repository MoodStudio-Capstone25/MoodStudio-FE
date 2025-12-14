import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import {
  useCreateCabinetMutation,
  useUpdateCabinetMutation,
} from "../hooks/useCabinetMutations";

const CabinetTestScreen = () => {
  const [color, setColor] = useState("gray");
  const [positionY, setPositionY] = useState("100");
  const [cabinetId, setCabinetId] = useState(null);

  const {
    mutate: createCabinet,
    data: created,
    isLoading: creating,
    error: createError,
  } = useCreateCabinetMutation();

  const {
    mutate: updateCabinet,
    isLoading: updating,
    error: updateError,
  } = useUpdateCabinetMutation();

  const handleCreate = () => {
    createCabinet(
      { color, position_y: Number(positionY) },
      {
        onSuccess: (cabinet) => {
          setCabinetId(String(cabinet.id));
        },
      }
    );
  };

  const handleUpdate = () => {
    if (!cabinetId) return;
    updateCabinet(
      { pk: Number(cabinetId), body: { color, position_y: Number(positionY) } },
      {
        onSuccess: (cabinet) => {
          console.log("수정 완료 응답 >>>", cabinet);
          // 수정 여부 확인
        },
      }
    );
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>색상</Text>
      <TextInput
        value={color}
        onChangeText={setColor}
        style={{ borderWidth: 1, marginBottom: 8 }}
      />

      <Text>position_y</Text>
      <TextInput
        value={positionY}
        onChangeText={setPositionY}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 16 }}
      />

      <Button
        title={creating ? "생성 중..." : "캐비닛 생성"}
        onPress={handleCreate}
      />

      {created && <Text>생성된 ID: {created.id}</Text>}
      {createError && <Text>생성 에러: {String(createError)}</Text>}

      {cabinetId && (
        <>
          <Text style={{ marginTop: 16 }}>수정할 Cabinet ID: {cabinetId}</Text>
          <Button
            title={updating ? "수정 중..." : "캐비닛 수정"}
            onPress={handleUpdate}
          />
          {updateError && <Text>수정 에러: {String(updateError)}</Text>}
        </>
      )}
    </View>
  );
};

export default CabinetTestScreen;
