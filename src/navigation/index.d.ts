import { NavigateFunction } from "react-router";

export interface NavigationProps {
  navigation: NavigateFunction;
  location?: Location<any>;
}