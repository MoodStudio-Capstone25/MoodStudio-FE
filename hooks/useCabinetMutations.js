import { useMutation } from "@tanstack/react-query";
import { createCabinet, updateCabinet } from "../apis/cabinet/cabinetApis";

export const useCreateCabinetMutation = () => {
  return useMutation({
    mutationFn: (body) => createCabinet(body),
  });
};

export const useUpdateCabinetMutation = () => {
  return useMutation({
    mutationFn: ({ pk, body }) => updateCabinet(pk, body),
  });
};
