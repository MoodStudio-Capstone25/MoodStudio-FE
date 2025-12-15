import { apiClient } from "../apiClient";

export const fetchRecords = async () => {
  const response = await apiClient.get("/records/");
  return response.data;
};

// 글 생성
export const createRecord = async (payload) => {
  const response = await apiClient.post("/records/create/", payload);
  return response.data;
};

// 이미지 업로드
export const uploadRecordImages = async ({ recordId, images }) => {
  const form = new FormData();
  form.append("record", String(recordId));

  images.forEach((img, idx) => {
    const uri = img?.uri ?? img; // img가 {uri} 또는 uri string인 경우 모두 대응

    form.append("images", {
      uri,
      name: `record_${recordId}_${idx}.jpg`,
      type: "image/jpeg",
    });
  });

  const response = await apiClient.post("/records/upload-images/", form, {
    // 환경에 따라 이 헤더는 빼는 게 더 안정적일 때도 있음(문제 생기면 제거)
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

// 상세페이지
export const fetchRecordDetail = async (id) => {
  const res = await apiClient.get(`/records/${id}/`);
  return res.data; // 서버 응답 객체 그대로 반환
};