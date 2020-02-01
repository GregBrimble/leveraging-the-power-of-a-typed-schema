import { getterToAccessedObject } from "./getterToAccessedObject";

describe("functionToObject", () => {
  const data = { x: { y: 5 } };
  const getter = (data: any) => data.x.y && data.nonExistent;

  it("returns all accessed data", () => {
    expect(getterToAccessedObject(getter)).toEqual({
      x: { y: {} },
      nonExistent: {}
    });
  });

  it("skips undefined data if data is provided", () => {
    expect(getterToAccessedObject(getter, data)).toEqual({
      x: { y: 5 }
    });
  });
});
