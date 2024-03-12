import { NavigateFunction } from "react-router";

declare namespace CommonProps {
  interface ComponentProps {
    navigation: NavigateFunction;
  }
};