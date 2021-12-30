import { mount } from "@vue/test-utils";
import Login from "../pages/login/index.vue";

describe("Logo", () => {
  test("sets the value", async () => {
    const wrapper = mount(Login, {
      mocks: {
        $t: msg => msg
      }
    });
    const button = wrapper.find("button");

    expect(button.text()).toBe("login.login");
  });
});
