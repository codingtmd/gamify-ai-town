export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const formatAddress = (address) => {
  if (!address) return "-";
  const length = address.length;
  return (
    address.substring(0, 8) + "..." + address.substring(length - 4, length)
  );
};

export const jsonParse = (val) => {
  try {
    return JSON.parse(val) || {};
  } catch (e) {
    console.log(e);
    return {};
  }
};

export const toLocaleString = (date) => {
  try {
    return new Date(date).toLocaleString("zh", {
      hour12: false,
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch (e) {
    console.log(e);
    return date;
  }
};

export const isBotim = () => {
  if (typeof window !== "undefined") {
    var u = window.navigator.userAgent;
    return !!u.match(/BOTIM/);
  }
};

export const isIOS = () => {
  if (typeof window !== "undefined") {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  }
};

export const getUseSize = () => {
  let size = 0;
  if (typeof window !== "undefined") {
    const localStorage = window.localStorage;
    for (const key in window.localStorage) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        size += localStorage.getItem(key).length;
      }
    }
  }
  console.log("use: " + (size / 1024).toFixed(2) + "KB");
};

export const getUniqueKey = (randomLength) => {
  return Number(
    Math.random().toString().substring(3, randomLength) + Date.now()
  ).toString(36);
};

export const utf8ToBase64 = (str) => {
  // 使用 TextEncoder 将字符串编码为 UTF-8
  const encoder = new TextEncoder();
  const utf8Array = encoder.encode(str);

  // 将 Uint8Array 转换为普通字符串
  let binary = "";
  utf8Array.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  // 使用 btoa 将普通字符串转换为 Base64 编码字符串
  return window.btoa(binary);
};
