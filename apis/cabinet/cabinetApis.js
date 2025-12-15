import { apiClient } from "../apiClient";

// 캐비닛 한 개 타입
// {
//   id: number,
//   user: number,
//   color: string,
//   position_y: number,
//   created_at: string,
//   updated_at: string,
// }

// 생성
export const createCabinet = async (body) => {
  const res = await apiClient.post("/cabinet/create/", body);
  return res.data;
};

// 수정
export const updateCabinet = async (pk, body) => {
  const res = await apiClient.patch(`/cabinet/update/${pk}/`, body);
  return res.data;
};
