import { configure, addDecorator } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { withInfo } from "@storybook/addon-info";
import { setDefaults } from "@storybook/addon-info";
import "../src/styles.css";

setDefaults({
  inline: true,
  header: false
});

// addDecorator((story, context) => withInfo("")(story)(context));
addDecorator(withKnobs);
configure(require.context("../src", true, /\.stories\.tsx$/), module);
