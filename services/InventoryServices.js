import * as http from "../utils/httpRequest";



export const getAllInventories = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await http.get(`/api/inventory/get-all`, config);
    return res;
  } catch (e) {
    console.log("Error at Get Inventory: ", e);
  }
};

export const getAllInventoryMaterials = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await http.get(`/api/inventory-material/get-all`, config);
    return res;
  } catch (e) {
    console.log("Error at Get Inventory Materials: ", e);
  }
};

export const getAllInventoryProducts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await http.get(`/api/inventory-product/get-all`, config);
    return res;
  } catch (e) {
    console.log("Error at Get Inventory Products: ", e);
  }
};
