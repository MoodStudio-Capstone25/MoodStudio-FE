import { apiClient } from "../apiClient";

// 타입 주석용 참고용 구조
// Element {
//   id: number,
//   category: string,
//   shape: string,
//   color: string,
//   angle: { x: number, y: number, z: number },
//   position: { x: number, y: number, z: number },
//   size: number,
//   angle_x: number,
//   angle_y: number,
//   angle_z: number,
//   position_x: number,
//   position_y: number,
//   position_z: number,
// }

// 요소 목록 조회
export const fetchRecordElements = async () => {
  const res = await apiClient.get("/records/elements/");
  // console.log("fetchRecordElements api >>>", res);
  return res.data;
};

// 요소 생성
export const createElement = async (body) => {
  const res = await apiClient.post("/records/elements/", body);
  // console.log("createElement api >>>", res);
  return res.data;
};

// 단일 요소 조회
export const fetchElement = async (id) => {
  const res = await apiClient.get(`/records/elements/${id}/`);
  return res.data;
};

// 요소 수정
export const updateElement = async (id, body) => {
  const res = await apiClient.patch(`/records/elements/${id}/`, body);
  return res.data;
};

// 요소 삭제
export const deleteElement = async (id) => {
  const res = await apiClient.delete(`/records/elements/${id}/`);
  return res.status;
};
