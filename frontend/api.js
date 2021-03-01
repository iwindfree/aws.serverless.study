export default class APIHandler {
  constructor() {}

  // TODO: 전체 카드 객체 리스트 반환. 없으면 NULL
  async getCards() {
    const request = new APIRequest("GET", "/kanban/card");
    const response = await APIProcessor(request);
    if (response !== "ERROR") {
      console.log(response);
      return response.Items;
    }
    return null;
  }

  // TODO: 카드 객체 생성/추가 후 ID 반환
  async postCard(cardObj) {
    const request = new APIRequest("POST", "/kanban/card", {
      title: cardObj.title,
      category: cardObj.category,
    });
    const response = await APIProcessor(request);
    if (response !== "ERROR") {
      console.log(response);
      return response.id;
    }
    return null;
  }

  // TODO: ID로 카드 검색 후 내용,카테고리 수정
  async putCard(cardObj) {
    const request = new APIRequest("PUT", `/kanban/card/${cardObj.id}`, {
      title: cardObj.title,
      category: cardObj.category,
    });
    const response = await APIProcessor(request);
  }

  // TODO: ID로 카드 검색 후 삭제
  async deleteCard(id) {
    const request = new APIRequest("DELETE", `/kanban/card/${id}`);
    const response = await APIProcessor(request);
  }

  // TODO: API 호출 함수
}

const HOST =
  "https://91exqshy4c.execute-api.ap-northeast-2.amazonaws.com/production";

// TODO: API 요청 컨테이너. Method, Path, Body 속성
class APIRequest {
  constructor(method, path, body = null) {
    this.method = method;
    this.url = HOST + path;
    this.body = body;
  }
}

const APIProcessor = async (request) => {
  try {
    const response = await fetch(request.url, {
      method: request.method, // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-key": "gZTgcry9ri5qutmbkusco2MPpSQeZdve3VDPO2DO",

        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: request.body ? JSON.stringify(request.body) : null, // body data type must match "Content-Type" header
    });
    switch (response.status) {
      case 200:
      case 201:
        return await response.json();
      case 204:
        return null;
      default:
        console.error(await response.json());
    }
  } catch (e) {
    console.error(e);
  }
  return "ERROR";
  // return response.json();
};
