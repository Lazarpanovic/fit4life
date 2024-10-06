import { Icon } from "@chakra-ui/react";

export interface IconProps {
  color: string;
  height: number;
  width: number;
  opacity?: number;
  borderRadius?: number;
}

export const ShapeIcon = (props: IconProps) => {
  return (
    <Icon
      color={props.color}
      w={props.width}
      h={props.height}
      opacity={props.opacity}
      borderRadius={props.borderRadius}
    >
      <rect width={props.width} height={props.height} fill="currentColor" />
    </Icon>
  );
};
