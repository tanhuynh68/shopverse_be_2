export const normalizeShopName = (name: string) => {
  return name
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu
    .replace(/\s+/g, "") // bỏ khoảng trắng
    .replace(/[^a-z0-9]/g, ""); // bỏ ký tự đặc biệt
};