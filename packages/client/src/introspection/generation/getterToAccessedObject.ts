const nestedHandler = {
  get: function<T>(obj: T, prop: keyof T) {
    if (!(prop in obj))
      Object.defineProperty(obj, prop, {
        value: new Proxy({}, nestedHandler),
        writable: true,
        enumerable: true
      });
    return obj[prop];
  }
};

const cleanProxy = (data: any) => {
  const cleanedData: any = {};
  if (data === undefined) return;
  for (const [prop, value] of Object.entries(data)) {
    if (value instanceof Object) {
      cleanedData[prop] = cleanProxy(value);
    } else {
      if (value !== undefined)
        cleanedData[prop] = JSON.parse(JSON.stringify(value));
    }
  }
  return cleanedData;
};

export const getterToAccessedObject = (
  getter: (data: any) => any,
  data: any = new Proxy({}, nestedHandler)
) => {
  const proxyHandler = {
    get: function<T extends object>(data: T, prop: keyof T): any {
      let value: any = data[prop];
      if (value instanceof Object && !Reflect.has({}, prop)) {
        value = new Proxy(data[prop] || {}, proxyHandler);

        Object.defineProperty(data, prop, {
          value,
          enumerable: true
        });
      }
      return data[prop];
    }
  };
  const proxy = new Proxy(data, proxyHandler);
  getter(proxy);

  return cleanProxy(proxy);
};
